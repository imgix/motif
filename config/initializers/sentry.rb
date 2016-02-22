if Rails.env.production? || Rails.env.staging?
  Raven.configure do |config|
    config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
    config.dsn = ENV['SENTRY_DSN']
    config.environments = ['staging', 'production']
  end
end
