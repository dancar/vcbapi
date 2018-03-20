require 'rails_helper'

describe "Bookmarks API" , type: :request do
  it "can create and retrieve a bookmark" do
    params = build(:bookmark_request_params)
    attributes = params[:bookmark]
    post "/bookmarks", params: params

    # Check that the 201 also returned the body:
    expect(response).to have_http_status(:created)
    expect(json.symbolize_keys).to include(attributes)
    id = json["id"]
    bookmark = Bookmark.find(id)
    expect(bookmark.title).to eq(attributes[:title])
    expect(bookmark.url).to eq(attributes[:url])
    expect(bookmark.shortening).to eq(attributes[:shortening])

    # Check that the newly created bookmark actually exists:
    id = json["id"]
    get "/bookmarks/#{id}"
    expect(response).to have_http_status(:ok)
    expect(json.symbolize_keys).to include(attributes)

    # TODO: misc bad requests test
  end

  it "creates the same Site for similar bookmarks" do
    params1 = build(:bookmark_request_params)
    params2 = build(:bookmark_request_params)
    params3 = build(:bookmark_params_with_different_site)
    params4 = build(:bookmark_params_with_different_site)

    post "/bookmarks", params: params1
    expect(response).to have_http_status(:created)
    site_id = json["site_id"]
    expect(site_id).to be_instance_of Integer

    post "/bookmarks", params: params2
    expect(response).to have_http_status(:created)
    expect(json["site_id"]).to eq(site_id)

    post "/bookmarks", params: params3
    expect(response).to have_http_status(:created)
    site2_id = json["site_id"]
    expect(site2_id).not_to eq(site_id)

    post "/bookmarks", params: params4
    expect(response).to have_http_status(:created)
    expect(json["site_id"]).to eq(site2_id)
  end

  it "searches correctly" do
    create_list(:bookmark_with_bla_in_title, 10)

    get "/bookmarks/search?q=bla"
    expect(response).to have_http_status(:ok)
    expect(json).to be_instance_of Array
    expect(json.length).to eq(10)

    get "/bookmarks/search?q=doesntexist"
    expect(response).to have_http_status(:ok)
    expect(json).to be_instance_of Array
    expect(json.length).to eq(0)
  end

  it "updates correctly" do
    bookmark = create(:bookmark)
    id = bookmark.id

    alternative_title = "second title"
    put "/bookmarks/#{id}", params: {bookmark: {title: alternative_title}}
    expect(response).to have_http_status(:no_content)

    get "/bookmarks/#{id}"
    expect(json["title"]).to eq(alternative_title)
  end

  it "deletes correctly" do
    bookmark = create(:bookmark)
    delete "/bookmarks/#{bookmark.id}"
    expect(response).to have_http_status(:no_content)
    expect(Bookmark.find_by(id: bookmark.id)).to eq(nil)
  end

  it "rejects bad delete requests" do
    delete "/bookmarks/-1"
    expect(response).to have_http_status(:bad_request)

    delete "/bookmarks/what"
    expect(response).to have_http_status(:bad_request)
  end

  it "does not create the same URL twice" do
    params1 = build(:bookmark_request_params)
    params2 = build(:bookmark_params_with_different_title)
    params2[:bookmark][:url] = params1[:bookmark][:url]

    post "/bookmarks", params: params1
    expect(response).to have_http_status(:created)

    post "/bookmarks", params: params2
    expect(response).to have_http_status(:conflict)

  end
end
