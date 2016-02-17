class PageInfoWorker
  include Sidekiq::Worker

  sidekiq_options retry: 2

  sidekiq_retries_exhausted do |msg|
    page = Page.find(msg['args'][0])
    page.failed_at = DateTime.now
    page.save!
  end

  def perform(page_id)
    page = Page.find(page_id)

    # # phantomify things from `page.url`
    # # when complete, set `page.processing = false` + data pulled back

    line = Cocaine::CommandLine.new(ENV['PHANTOM_JS_PATH'] || 'phantomjs', "lib/assets/phantom-runner.js #{page.url}")
    results = JSON.parse(line.run).symbolize_keys

    page.update_attributes({
      title: results[:title],
      description: results[:description],
      og_image_url: results[:ogImageURL],
      accent_color: results[:accentColor],
      fetched_at: DateTime.now
    })
  end
end
