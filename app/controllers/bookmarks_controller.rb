MAX_INDEX_LIMIT = 100
class BookmarksController < ApplicationController
  before_action :set_bookmark_item, only: [:show, :update, :destroy]

  def create
    params = bookmark_params
    @bookmark = Bookmark.create!(params)
    json_response @bookmark, :created
  end

  def show
    return head :bad_request if not @bookmark
    json_response @bookmark
  end

  def search
    query = params[:q] # TODO: check query?
    bookmarks = Bookmark
      .includes([:site, :tag])
      .where("url LIKE :search OR title LIKE :search OR shortening LIKE :search", search: "%#{query}%")
      .limit(MAX_INDEX_LIMIT)
      .to_json(:include => [:tag, :site])
    json_response bookmarks
  end

  def update
    return head :bad_request if not @bookmark
    params = bookmark_params
    site = @bookmark.site
    @bookmark.update(params)
    site.destroy if site.bookmark.blank?
    head :no_content
  end

  def index
    # TODO: pagination?
    sites_json = Site
                   .includes(bookmark: :tag)
                   .limit(MAX_INDEX_LIMIT)
                   .to_json(:include =>
                            { bookmark: { :include => :tag}})
    json_response sites_json
  end

  def destroy
    return head :bad_request if not @bookmark
    @bookmark.destroy
    head :no_content
  end



  private

  def set_bookmark_item
    @bookmark = Bookmark.find_by(id: params[:id])
  end

  def bookmark_params
    received_tag_names = request[:bookmark][:tags]
    tag_names = Set.new(
      (received_tag_names or [])
        .reject{|s| s.to_s != s || s.strip.blank?})
    tags = Set.new(tag_names.map{|s| Tag.find_or_create_by!(name: s.strip)}).to_a
    bookmark = params.require(:bookmark).permit(:title, :url, :shortening)
    ans = {tag: tags}.merge(bookmark)
    ans
  end

end
