require 'rails_helper'

describe "Bookmarks API" , type: :request do
  it "creates a bookmark correctly" do
    params = {
      format: :json,
      bookmark: {
        url: "hello.com/bla?s=param",
        title: "awesome title",
      }
    }
    post "/bookmarks", params: params
    expect(response).to have_http_status(:created)
    expect(json[:title]).to eq("awesome title")
    expect(json[:bookmark_url]).to eq('hello.com/bla?s=param')
    expect(json[:shortening]).to eq(nil)
  end
end
