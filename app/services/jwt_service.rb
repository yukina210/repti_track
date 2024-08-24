class JwtService
  SECRET_KEY = ENV['JWT_SECRET_KEY'] || Rails.application.secrets.secret_key_base
  ALGORITHM = 'HS256'

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    token = JWT.encode(payload, SECRET_KEY, ALGORITHM)
    Rails.logger.debug "JWT encoded: #{token}"
    token
  end

  def self.decode(token)
    begin
      decoded = JWT.decode(token, SECRET_KEY, true, { algorithm: ALGORITHM })[0]
      Rails.logger.debug "JWT decoded: #{decoded}"
      HashWithIndifferentAccess.new decoded
    rescue JWT::DecodeError => e
      Rails.logger.error "JWT decode error: #{e.message}"
      nil
    rescue JWT::ExpiredSignature => e
      Rails.logger.error "JWT expired: #{e.message}"
      nil
    rescue JWT::VerificationError => e
      Rails.logger.error "JWT verification error: #{e.message}"
      nil
    rescue StandardError => e
      Rails.logger.error "JWT unexpected error: #{e.message}"
      nil
    end
  end
end