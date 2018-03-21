require 'rails_helper'
VALID_SHORTENING = "http://google.com"
BAD_URLS = [
  '/no.protocol.com',
  '//no.protocol.com',
  '://no.protocol.com',
  'h://no.protocol.com',
  'ht://no.protocol.com',
  'http://space .com',
  'yttps://google.com',
  'httpss://google.com',
  'https://slash\.bla',
  ' bla.com',
  'http://dash\.com'
]
describe Bookmark, type: :model do
  it 'should not accept bad URLs' do
    BAD_URLS.each do |url|
      bookmark = Bookmark.new(
        shortening: VALID_SHORTENING,
        title: "title",
        url: url
      )
      bookmark.valid?
      expect(bookmark.errors).to_not be_empty
    end
  end

  it 'should not accept bad URLs for shortenings' do
    BAD_URLS.each do |url|
      bookmark = Bookmark.new(
        title: "title",
        url: "http://gooooogle.com",
        shortening: url
      )
      bookmark.valid?
      expect(bookmark.errors).to_not be_empty
    end
  end

  it 'should not accept empty titles' do
    bookmark = Bookmark.new(shortening: VALID_SHORTENING, title: '', url: 'http://go.com')
    bookmark.valid?
    expect(bookmark.errors).to_not be_empty

    bookmark = Bookmark.new( url: 'http://go.com', shortening: VALID_SHORTENING)
    bookmark.valid?
    expect(bookmark.errors).to_not be_empty
  end
end
