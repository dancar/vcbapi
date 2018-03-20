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
    @bookmarks = Bookmark.where("url like ?", "%#{query}%")
    render json: @bookmarks, status: :ok
  end

  def update
    puts('<-DANDEBUG-> bookmarks_controller.rb\\ 20: params.inspect:', params.inspect)
    @bookmark.update(bookmark_params)
    head :no_content
  end

  def index
    render json: Bookmark.all, status: :ok # TODO: pagination?
  end



  private

  def set_bookmark_item
    @bookmark = Bookmark.find_by(id: params[:id])
  end

  def bookmark_params
    params.require(:bookmark).permit(:title, :url, :shortening)
  end

end
