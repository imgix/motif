module ApplicationHelper
  def embedded_svg(filename, options = {})
    assets = Rails.application.assets
    file = assets.find_asset(filename).source.force_encoding('UTF-8')
    doc = Nokogiri::HTML::DocumentFragment.parse file
    svg = doc.at_css 'svg'

    if options[:class].present?
      svg['class'] = options[:class]
    end

    raw doc
  end
end
