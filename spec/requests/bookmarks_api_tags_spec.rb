require 'rails_helper'

describe "Bookmarks API - Tags" , type: :request do
  it "saves tags correctly" do
    params = build(:bookmark_request_params)
    params[:bookmark][:tags] = [
      " hello",
      "world",
      "world "
    ]

    post "/bookmarks", params: params
    expect(response).to have_http_status(:created)
    id = json["id"]
    get "/bookmarks/#{id}"
    expect(response).to have_http_status(:ok)
    tags = json["tags"]
    expect(tags.length).to eq(2)
    expect((tags - ["hello", "world"]).length).to eq(0)
  end

  it "ignores invalid tags" do
    params = build(:bookmark_request_params)
    params[:bookmark][:tags] = ",hello, ,    ,,, world,,,,,".split(",")
    post "/bookmarks", params: params
    expect(response).to have_http_status(:created)
    id = json["id"]
    get "/bookmarks/#{id}"
    expect(response).to have_http_status(:ok)
    tags = json["tags"]
    expect(tags.length).to eq(2)
    expect((tags - ["world", "hello"]).length).to eq(0)
  end

  it "updates tags" do
    tag1 = "bla"
    tag2 = "different_tag"

    params = build(:bookmark_request_params)
    params[:bookmark][:tags] = [tag1]
    post "/bookmarks", params: params
    expect(response).to have_http_status(:created)
    id = json["id"]
    get "/bookmarks/#{id}"
    expect(response).to have_http_status(:ok)
    tags = json["tags"]
    expect(tags.length).to eq(1)
    expect(tags[0]).to eq(tag1)

    params[:bookmark][:tags] = [tag2]
    put "/bookmarks/#{id}", params: params
    expect(response).to have_http_status(:no_content)

    get "/bookmarks/#{id}"
    expect(response).to have_http_status(:ok)
    tags = json["tags"]
    expect(tags.length).to eq(1)
    expect(tags[0]).to eq(tag2)
  end
end
