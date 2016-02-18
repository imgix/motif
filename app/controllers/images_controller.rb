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
      blend: txt_url(page.title, color),
      markalign: 'top,center',
      markfit: 'max',
      markh: 200,
      markw: 500,
      markpad: 80,
      bm: 'normal'
    }
    base_ix_params[:mark] = params[:logo_url] if params[:logo_url].present?

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

  def txt_url(page_title, color)
    "https://#{ENV['ix_text_host']}/~text?txtalign=left,middle&txtclr=fff&txtsize=66&txtpad=80&txt=#{page_title}&bg=CC#{color}&w=1200&h=1200"
  end
end
