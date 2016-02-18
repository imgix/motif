class PageInfoFetcher
  def initialize(page)
    @page = page
  end

  def fetch
    @doc = Nokogiri::HTML(RestClient.get(@page.url))

    return {
      title: title,
      description: description,
      og_image_url: og_image_url,
      accent_color: accent_color,
    }
  rescue RestClient::Exception => e
    return e
  end

private
  def ix_client
    Imgix::Client.new({
      host: ENV['ix_host'],
      secure_url_token: ENV['ix_secure_url_token']
    })
  end

  def title
    title_text = nil

    og_title_tag = @doc.at_css('meta[property="og:title"]')
    title_tag = @doc.at_css('title')

    if og_title_tag
      title_text = og_title_tag['content']
    elsif title_tag
      title_text = title_tag.content
    end

    return title_text
  end

  def description
    description_tag = @doc.at_css('meta[property="og:description"]')

    if !description_tag
      description_tag = @doc.at_css('meta[name="description"]')
    end

    description_tag ? description_tag['content'] : nil
  end

  def og_image_url
    og_image_tag = @doc.at_css('meta[property="og:image"]')

    og_image_tag ? og_image_tag['content'] : nil
  end

  def accent_color
    return nil unless og_image_url

    og_image_colors_url = ix_client.path(og_image_url).to_url({
      palette: 'json',
      vib: 50,
      px: 60,
      colors: 16
    })
    og_image_colors_response = RestClient.get(og_image_colors_url)
    og_image_color = JSON.parse(og_image_colors_response)['colors'][0].symbolize_keys

    color = Color::RGB.from_fraction(
      og_image_color[:red],
      og_image_color[:green],
      og_image_color[:blue]
    )
    tweaked_color = color.adjust_hue(120).adjust_saturation(20)

    if tweaked_color.brightness > 0.7
      adjustment_value = - (80 * tweaked_color.brightness)
      tweaked_color = tweaked_color.adjust_brightness(adjustment_value)
    end

    return tweaked_color.hex
  end
end
