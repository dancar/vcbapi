class Bookmark < ApplicationRecord
  belongs_to :site
  before_validation :register_site
  validates :url, url: { schemes: ['', 'http', 'https'], no_local: false}
  validates :site, presence: true

  private
  def register_site
    begin
      uri = URI(self.url)
    if uri.scheme == nil
      self.url = "http://" + self.url
      uri = URI(self.url)
    end

    self.site = Site.find_or_create_by(hostname: uri.host) # TODO: handle race condition?
    rescue URI::InvalidURIError
      self.site = nil # Will be handled by validation
      return
    end
    # TODO: maybe check if site should be removed (in case validation failed)
  end
end
