class PagesController < ApplicationController
  def create
    page = Page.find_or_initialize_by(url: params[:url])
    page_is_new = page.new_record?
    last_fetch = page.fetched_at

    if !page_is_new || page.save
      PageInfoWorker.perform_async(page.id) if page_is_new || last_fetch && last_fetch < 1.minute.ago
      render json: page
    else
      render json: page.errors, status: 422
    end
  end

  def show
    page = Page.find(params[:id])

    render json: page
  end
end
