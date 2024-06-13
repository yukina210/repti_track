class UserMailer < ApplicationMailer
  default from: 'from@example.com'
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.test_email.subject
  #
  def test_email
    mail(to: 'test@example.com', subject: 'Test Email')
  end
end
