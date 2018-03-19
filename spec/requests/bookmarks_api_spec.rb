require 'rails_helper'

describe "Bookmarks API" , type: :request do
  it "creates a bookmark correctly" do
    params = {
      format: :json,
      bookmark: {
        url: "hello.com/bla?s=param",
        shortening: "go.to/1",
        title: "awesome title",
      }
    }
    post "/bookmarks", params: params
    puts('<-DANDEBUG-> bookmarks_api_spec.rb\\ 14: json:', json)
    expect(response).to have_http_status(:created)
    expect(json[:title]).to eq("awesome title")
    expect(json[:bookmark_url]).to eq('hello.com/bla?s=param')
    expect(json[:shortening]).to eq("go.to/1")
    id = json[:id]

    get "/bookmarks/#{id}"
    expect(response).to have_http_status(:ok)
    expect(json[:title]).to eq("awesome title")
    expect(json[:bookmark_url]).to eq('hello.com/bla?s=param')
    expect(json[:shortening]).to eq("go.to/1")

    # TODO: misc bad requests tests
  end
end
