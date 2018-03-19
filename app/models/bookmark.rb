class Bookmark < ApplicationRecord
  belongs_to :site
  before_validation :register_site

  private
  def register_site
    uri = URI(self.url)
    if uri.scheme == nil
      uri = URI("notimportant://" + self.url)
    end

    self.site = Site.find_or_create_by(hostname: uri.host) # TODO: handle race condition?
    # TODO: maybe check if site should be removed (in case validation failed)
  end
end
