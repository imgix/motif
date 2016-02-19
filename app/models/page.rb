class Page < ApplicationRecord
  validates :url, presence: true, url: { no_local: true }

  def fetch!
    line = Cocaine::CommandLine.new(ENV['PHANTOM_JS_PATH'] || 'phantomjs', "lib/assets/phantom_runner.js #{url}")
    results = JSON.parse(line.run).symbolize_keys

    update_attributes!({
      title: results[:title],
      description: results[:description],
      og_image_url: results[:ogImageURL],
      accent_color: results[:accentColor],
      logo_url: "https://logo.clearbit.com/#{URI(url).host}?format=png&size=300",
      fetched_at: DateTime.now
    })
  end
end
