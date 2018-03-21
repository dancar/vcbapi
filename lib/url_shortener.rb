require 'uri'
require 'net/http'
require 'json'

class URLShortener
  API_ENDPOINT = "https://www.googleapis.com/urlshortener/v1/url"
  HEADERS = {
    "Content-Type" => "application/json"
  }
  def self.shorten(url)
    google_api_key = Rails.application.secrets.google_api_key
    uri = URI.parse(API_ENDPOINT + "?key=#{google_api_key}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req = Net::HTTP::Post.new(uri.request_uri, HEADERS)
    req.body = {"longUrl": url}.to_json
    res = http.request(req)
    JSON.parse(res.body)["id"] if res.is_a?(Net::HTTPSuccess)
  end
end
