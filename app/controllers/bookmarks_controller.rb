class BookmarksController < ApplicationController
  def create
    @bookmark = Bookmark.create!(bookmark_params)
    render json: @bookmark, status: :created
  end
  private

  def bookmark_params
    bookmark = params[:bookmark]
    uri = URI(bookmark[:url])
    if uri.scheme == nil
      uri = URI("notimportant://" + bookmark[:url])
    end
    bookmark[:path] = "#{uri.path}?#{uri.query}"
    site = Site.find_or_create_by(hostname: uri.host) # TODO: handle race condition?
    bookmark[:site_id] = site.id
    params.require(:bookmark).permit(:title, :site_id, :path)
    # TODO: maybe check if site should be removed
  end
end
