require 'rails_helper'

describe "Bookmarks API" , type: :request do
  it "can create and retrieve a bookmark" do
    params = {
      bookmark: {
        url: "http://hello.com/bla?s=param",
        shortening: "http://go.to/1",
        title: "awesome title",
      }
    }
    post "/bookmarks", params: params
    expect(response).to have_http_status(:created)
    expect(json["title"]).to eq("awesome title")
    expect(json["url"]).to eq('http://hello.com/bla?s=param')
    expect(json["shortening"]).to eq("http://go.to/1")
    id = json["id"]

    get "/bookmarks/#{id}"
    expect(response).to have_http_status(:ok)
    expect(json["title"]).to eq("awesome title")
    expect(json["url"]).to eq('http://hello.com/bla?s=param')
    expect(json["shortening"]).to eq("http://go.to/1")

    # TODO: misc bad requests test
  end

  it "creates the same Site for similar bookmarks" do
    params1 = {
      bookmark: {
        url: "https://goodbye.com/bla?s=param",
        title: "title",
      }
    }

    params2 = {
      bookmark: {
        url: "https://goodbye.com/wha",
        title: "title",
      }
    }

    params3 = {
      bookmark: {
        url: "https://different.com/wha",
        title: "title",
      }
    }

    post "/bookmarks", params: params1
    expect(response).to have_http_status(:created)
    site_id = json["site_id"]
    expect(site_id).to be_instance_of Integer

    post "/bookmarks", params: params2
    expect(response).to have_http_status(:created)
    expect(json["site_id"]).to eq(site_id)

    post "/bookmarks", params: params3
    expect(response).to have_http_status(:created)
    expect(json["site_id"]).not_to eq(site_id)
  end

  it "searches correctly" do
    # TODO: dry params
    params1 = {
      bookmark: {
        url: "http://goodbye.com/bla?s=param",
        title: "title",
      }
    }

    params2 = {
      bookmark: {
        url: "https://goodbye.com/wha",
        title: "title",
      }
    }

    params3 = {
      bookmark: {
        url: "https://different.com/wha",
        title: "title",
      }
    }

    post "/bookmarks", params: params1
    post "/bookmarks", params: params2
    post "/bookmarks", params: params3

    get "/bookmarks/search?q=wha"
    expect(response).to have_http_status(:ok)
    expect(json).to be_instance_of Array
    expect(json.length).to eq(2)

    get "/bookmarks/search?q=goodbye"
    expect(response).to have_http_status(:ok)
    expect(json).to be_instance_of Array
    expect(json.length).to eq(2)

    get "/bookmarks/search?q=.com"
    expect(response).to have_http_status(:ok)
    expect(json).to be_instance_of Array
    expect(json.length).to eq(3)

    get "/bookmarks/search?q=different"
    expect(response).to have_http_status(:ok)
    expect(json).to be_instance_of Array
    expect(json.length).to eq(1)
    expect(json[0]["url"]).to eq("https://different.com/wha")

    get "/bookmarks/search?q=ohno"
    expect(response).to have_http_status(:ok)
    expect(json).to be_instance_of Array
    expect(json.length).to eq(0)

  end

  it "updates correctly" do
    params = {
      bookmark: {
        url: "http://hello.com/bla?s=param",
        shortening: "http://go.to/1",
        title: "first title",
      }
    }
    post "/bookmarks", params: params
    expect(response).to have_http_status(:created)

    id = json["id"]
    get "/bookmarks/#{id}"
    expect(json["title"]).to eq("first title")

    put "/bookmarks/#{id}", params: {bookmark: {title: "second title"}}
    expect(response).to have_http_status(:no_content)

    get "/bookmarks/#{id}"
    expect(json["title"]).to eq("second title")
  end

  it "deletes correctly" do
    #TODO...
  end

  it "does not create the same URL twice" do
    params1 = {
      bookmark: {
        url: "http://hello.com",
        shortening: "http://go.to/1",
        title: "first title",
      }
    }

    params2 = {
      bookmark: {
        url: "http://hello.com",
        shortening: "http://go.to/1",
        title: "first title",
      }
    }

    post "/bookmarks", params: params1
    expect(response).to have_http_status(:created)

    post "/bookmarks", params: params2
    expect(response).to have_http_status(:conflict)

  end
end
