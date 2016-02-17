begin
  if ENV['RACK_ENV'] != "production"
    Cocaine::CommandLine.new("which", ENV['PHANTOM_JS_PATH'] || "phantomjs").run
  end
rescue Cocaine::ExitStatusError => e
  raise StandardError.new("This project requires phantomjs to be installed to run. If you're trying to run this locally, you may need to `brew install phantomjs`.")
end
