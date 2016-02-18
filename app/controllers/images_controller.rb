class ImagesController < ApplicationController
  def show
    page = Page.find_by!(url: params[:url])

    # page = Page.find_or_create_by(params[:url])
    # If this is a "new" Page (based on the URL), we'll actually want to
    # do a synchronous, minimal bootstrapping process here to grab the `title`.

    full_ix_url = ix_client.path(params[:image_url]).to_url({
      w: 1200,
      h: 1200,
      fit: 'crop',
      crop: 'faces,entropy',
      blend: "99#{params[:color]}",
      bm: 'normal',
      markalign: 'center,middle',
      blur: 60,
      mark: txt_url(page.title)
    })

    redirect_to full_ix_url
  end

private
  def ix_client
    Imgix::Client.new({
      host: ENV['ix_host'],
      secure_url_token: ENV['ix_secure_url_token']
    })
  end

  def txt_client
    Imgix::Client.new({
      host: 'assets.imgix.net'
    })
  end

  def txt_url(page_title)
    "https://assets.imgix.net/~text?txtfont=Avenir Next Demi,Bold&w=1000&txtclr=fff&txtsize=66&txtalign=left&txt=#{page_title}"
  end
end
