class Page < ApplicationRecord
  PHANTOM_TIMEOUT = 12
  CACHE_DURATION = 1.month

  validates :url, presence: true, url: { no_local: true }

  def expired?
    fetched_at.present? ? fetched_at < CACHE_DURATION.ago : true
  end

  def fetch
    Timeout::timeout(PHANTOM_TIMEOUT) do
      line = Cocaine::CommandLine.new(
        ENV['PHANTOM_JS_PATH'] || 'phantomjs',
        "lib/assets/phantom_runner.js :url"
      )
      line_data = line.run(url: url)
      results = JSON.parse(line_data).symbolize_keys

      update_attributes!({
        title: results[:title],
        description: results[:description],
        og_image_url: results[:ogImageURL],
        accent_color: results[:accentColor],
        logo_url: default_logo_url,
        fetched_at: DateTime.now,
        last_run_errored: false
      })
    end
  rescue Timeout::Error => e
    # Something has gone horribly wrong, and Phantom never returned. In this
    # case, we want to update everything and return a proper response, since
    # servers trying to read from us don't care either way, and users in the
    # GUI can just edit from this state.

    # Raven.capture_exception(e)

    update_attributes!({
      title: '',
      accent_color: '000000',
      logo_url: default_logo_url,
      fetched_at: DateTime.now,
      last_run_errored: true
    })
  end

  def default_logo_url
    "https://logo.clearbit.com/#{URI(url).host}?format=png&size=300"
  rescue URI::InvalidURIError
    nil
  end
end
