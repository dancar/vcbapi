class Bookmark < ApplicationRecord
  has_and_belongs_to_many :tag
  belongs_to :site
  before_validation :register_site
  validates :url, url: true
  validates :shortening, url: {allow_blank: true, allow_nil: true}
  validates :title, {length: {minimum: 1}}
  validates :site, presence: true

  def as_json(opts = {})
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
end
