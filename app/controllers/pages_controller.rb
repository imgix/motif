class PagesController < ApplicationController
  def create
    page = Page.new(page_params)

    if page.save
      PageInfoWorker.perform_async(page.id)
      render json: page
    else
      render json: page.errors, status: 422
    end
  end

  def show
    page = Page.find(params[:id])

    render json: page
  end

private
  def page_params
    params.require(:page).permit(:url)
  end
end
