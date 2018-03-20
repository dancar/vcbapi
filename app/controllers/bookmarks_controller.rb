class BookmarksController < ApplicationController
  before_action :set_bookmark_item

  def create
    @bookmark = Bookmark.create!(bookmark_params)
    render json: @bookmark, status: :created
  end

  def show
    render json: @bookmark
  end

  def search
    query = params[:q] # TODO: check query?
    @bookmarks = Bookmark.where("url LIKE :search OR title LIKE :search OR shortening LIKE :search", search: "%#{query}%")
    render json: @bookmarks, status: :ok
  end

  def update
    @bookmark.update(bookmark_params)
    head :no_content
  end

  def index
    render json: Bookmark.all, status: :ok # TODO: pagination?
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
