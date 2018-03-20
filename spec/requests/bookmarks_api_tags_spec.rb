require 'rails_helper'

describe "Bookmarks API - Tags" , type: :request do
  it "saves tags correctly" do
    params = {
      bookmark: {
        url: "http://hello.com/bla?s=param",
        shortening: "http://go.to/1",
        title: "awesome title",
        tags: " hello, world, world"
      }
    }

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
    params = {
      bookmark: {
        url: "http://hello.com/bla?s=param",
        shortening: "http://go.to/1",
        title: "awesome title",
        tags: ",hello, ,    ,,, world,,,,,"
      }
    }

    post "/bookmarks", params: params
    expect(response).to have_http_status(:created)
    id = json["id"]
    get "/bookmarks/#{id}"
    expect(response).to have_http_status(:ok)
    tags = json["tags"]
    expect(tags.length).to eq(2)
    expect((tags - ["world", "hello"]).length).to eq(0)
  end
end
