class ImagesController < ApplicationController
  def show
    @page = Page.find_or_initialize_by(url: params[:url])
    page_is_new = @page.new_record?

    @page.save! if page_is_new
    @page.fetch if page_is_new || @page.expired?

    format = params[:format] || 'full'
    Rails.logger.warning "REFERER: #{request.referer.inspect}"

    redirect_to send("#{format}_ix_url")
  end

private
  def base_ix_params(w: 1200, h: 1200, txtsize: 66)
    ix_params = {
      w: w,
      h: h,
      fit: 'crop',
      crop: 'faces,entropy',
      blend64: b64(txt_url(w: w, h: h, txtsize: txtsize)),
      markalign: params[:logo_alignment],
      markfit: 'max',
      markh: 250,
      markw: 600,
      markpad: params[:logo_padding],
      bm: 'normal'
    }
    ix_params[:mark64] = b64(params[:logo_url]) if params[:logo_url].present?

    return ix_params
  end

  def full_ix_url
    ix_client.path(base_url).to_url(base_ix_params)
  end

  def facebook_ix_url
    ix_params = base_ix_params(h: 630, txtsize: 57)
    ix_params[:markh] = 180
    ix_params[:markw] = 450

    ix_client.path(base_url).to_url(ix_params)
  end
  alias_method :twitter_ix_url, :facebook_ix_url

  def base_url
    image_url = params[:image_url]
    image_url.present? && image_url != 'null' ?
      image_url :
      'http://assets.imgix.net/imgix-blank.png'
  end

  def title
    @page.title || ''
  end

  def color
    params[:color] || @page[:accent_color]
  end

  def text_color
    params[:text_color] || 'fff'
  end

  def font_family
    params[:font_family] || 'Avenir Next Demi,Bold'
  end

  def ix_client
    @ix_client ||= Imgix::Client.new({
      host: ENV['IX_HOST'],
      secure_url_token: ENV['IX_SECURE_URL_TOKEN']
    })
  end

  def ix_assets_client
    @ix_assets_client ||= Imgix::Client.new({
      host: 'assets.imgix.net'
    })
  end

  def txt_url(w:, h:, txtsize:)
    ix_assets_client.path('~text').to_url({
      txtalign64: b64(params[:text_alignment]),
      txtclr: text_color,
      txtsize: txtsize,
      txtpad: 80,
      txtfont64: b64(font_family),
      txt64: b64(title),
      bg: "CC#{color}",
      w: w,
      h: h
    })
  end

  def b64(str)
    Base64.urlsafe_encode64(str).delete('=')
  end
end
