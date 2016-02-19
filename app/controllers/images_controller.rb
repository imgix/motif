class ImagesController < ApplicationController
  def show
    page = Page.find_by!(url: params[:url])

    # page = Page.find_or_create_by(params[:url])
    # If this is a "new" Page (based on the URL), we'll actually want to
    # do a synchronous, minimal bootstrapping process here to grab the `title`.

    color = params[:color] || page[:accent_color]

    base_ix_params = {
      w: 1200,
      h: 1200,
      fit: 'crop',
      crop: 'faces,entropy',
      blend64: b64(txt_url(page.title, color)),
      markalign: 'bottom,right',
      markfit: 'max',
      markh: 250,
      markw: 600,
      markpad: 0,
      bm: 'normal'
    }
    base_ix_params[:mark64] = b64(params[:logo_url]) if params[:logo_url].present?

    base_ix_url = ix_client.path(params[:image_url]).to_url(base_ix_params)

    redirect_to base_ix_url
  end

private
  def ix_client
    @ix_client ||= Imgix::Client.new({
      host: ENV['ix_host'],
      secure_url_token: ENV['ix_secure_url_token']
    })
  end

  def ix_assets_client
    @ix_assets_client ||= Imgix::Client.new({
      host: 'assets.imgix.net'
    })
  end

  def txt_url(title, color)
    ix_assets_client.path('~text').to_url({
      txtalign64: b64('left,middle'),
      txtclr: 'fff',
      txtsize: 66,
      txtpad: 80,
      txtfont64: b64('Avenir Next Demi,Bold'),
      txt64: b64(title),
      bg: "CC#{color}",
      w: 1200,
      h: 1200
    })
  end

  def b64(str)
    Base64.urlsafe_encode64(str).delete('=')
  end
end
