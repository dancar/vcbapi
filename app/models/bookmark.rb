require './lib/url_shortener'

class Bookmark < ApplicationRecord
  has_and_belongs_to_many :tag
  belongs_to :site
  before_validation :register_site
  before_validation :shorten_url
  after_destroy :check_site
  validates :url, url: true
  validates :shortening, url: {allow_blank: true, allow_nil: true}
  validates :title, {length: {minimum: 1}}
  validates :site, presence: true

  def as_json(opts = {includes: :tag})
    ans = super(opts)
    ans["tags"] = self.tag.map(&:name)
    ans
  end
  private

  def register_site
    # TODO: maybe check if site should be removed (in case validation failed)
    uri = URI(self.url)
    self.site = Site.find_or_create_by(hostname: uri.host) # TODO: handle race condition?
  rescue URI::InvalidURIError
    self.site_id = nil # Will be handled by validation
    return
  end

  def shorten_url
    if self.shortening.blank?
      self.shortening = URLShortener.shorten(self.url)
      #TODO handle error?
    end
  end

  def check_site
    self.site.destroy if self.site.bookmark.blank?
  end

end
