class BookmarksController < ApplicationController
  before_action :set_bookmark_item, only: [:show, :update, :destroy]

  def create
    @bookmark = Bookmark.create!(bookmark_params)
    json_response @bookmark, :created
  end

  def show
    json_response @bookmark
  end

  def search
    query = params[:q] # TODO: check query?
    @bookmarks = Bookmark.where("url LIKE :search OR title LIKE :search OR shortening LIKE :search", search: "%#{query}%")
    json_response @bookmarks
  end

  def update
    @bookmark.update(bookmark_params)
    head :no_content
  end

  def index
    # TODO: pagination?
    json_response Bookmark.all
  end

  def destroy
    @bookmark.destroy
    head :no_content
  end



  private

  def set_bookmark_item
    @bookmark = Bookmark.find_by(id: params[:id])
  end

  def bookmark_params
    params.require(:bookmark).permit(:title, :url, :shortening)
  end

end
