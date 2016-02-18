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

    meta = PageInfoFetcher.new(page).fetch

    page.update_attributes({
      title: meta[:title],
      description: meta[:description],
      og_image_url: meta[:og_image_url],
      accent_color: meta[:accent_color],
      fetched_at: DateTime.now
    })
  end
end
