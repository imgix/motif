class ApplicationController < ActionController::Base
  force_ssl if: :prod?
  before_action :set_hsts_header, if: :prod?

private
  def prod?
    Rails.env.production?
  end

  def set_hsts_header
    response.headers['Strict-Transport-Security'] = "max-age=31536000"
  end
end
