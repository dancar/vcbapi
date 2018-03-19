class Bookmark < ApplicationRecord
  belongs_to :site
  attr_reader :bookmark_url
  def as_json(opts = {})
    super(opts).merge(
      {
        bookmark_url: self.bookmark_url
      }
    )

  end

  def bookmark_url
    self.site.hostname + self.path
  end
end
