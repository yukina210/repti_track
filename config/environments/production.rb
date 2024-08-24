require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = false
  config.hosts.clear
  config.eager_load = true
  config.consider_all_requests_local = false
  config.action_controller.perform_caching = true
  config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present? || ENV['RAILS_ENV'] == 'production'
  config.assets.css_compressor = :sass
  config.assets.compile = false
  config.active_storage.service = :local
  config.force_ssl = true
  # config.force_ssl = false #本番環境テストのとき
  config.logger = ActiveSupport::Logger.new(STDOUT)
    .tap  { |logger| logger.formatter = ::Logger::Formatter.new }
    .then { |logger| ActiveSupport::TaggedLogging.new(logger) }
  config.log_tags = [ :request_id ]
  config.log_level = :debug

  config.action_mailer.perform_caching = false
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.default_url_options = { host: 'repti-track.com' } #ガチ本番の時！！
  # config.action_mailer.default_url_options = { host: 'localhost', port: 3000, protocol: 'http' } #本番環境テストのとき
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address: 'smtp.gmail.com',
    port: 587,
    domain: 'gmail.com',
    user_name: ENV['GMAIL_USERNAME'],
    password: ENV['GMAIL_PASSWORD'],
    authentication: 'plain',
    enable_starttls_auto: true
  }

  config.i18n.fallbacks = true
  config.active_support.report_deprecations = false
  config.active_record.dump_schema_after_migration = false
end
