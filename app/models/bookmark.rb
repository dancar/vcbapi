require './lib/url_shortener'

class Bookmark < ApplicationRecord
  has_and_belongs_to_many :tag
  belongs_to :site
  before_validation :add_schemes
  before_validation :register_site
  before_validation :shorten_url
  after_destroy :check_site
  validates :site, presence: true
  validates :url, url: true
  validates :shortening, url: {allow_blank: true, allow_nil: true}
  validates :title, {length: {minimum: 1}}
  DEFAULT_SCHEME = "http://"

  def as_json(opts = {includes: :tag})
    ans = super(opts)
    ans["tags"] = self.tag.map(&:name)
    ans
  end
  private

  def maybe_add_scheme(url)
    ans = url
    uri = URI(self.url)
    ans = DEFAULT_SCHEME + ans if uri.scheme.blank?
    ans
  rescue
    url
  end

  def add_schemes
    self.url = maybe_add_scheme(self.url)
    self.shortening = maybe_add_scheme(self.shortening) unless self.shortening.blank?
  end

  def register_site
    # TODO: maybe check if site should be removed (in case validation failed)
    uri = URI(self.url)
    self.site = Site.find_or_create_by(hostname: uri.host) if uri.host # TODO: also handle race condition?
  rescue URI::InvalidURIError
    self.site_id = nil # Will be handled by validation
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
