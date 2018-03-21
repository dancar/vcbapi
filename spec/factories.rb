FactoryBot.define do
  factory :bookmark do
    url
    title "bookmark-title"
    shortening "http://not.to.short.com"
  end

  factory :bookmark_with_bla_in_title, parent: :bookmark do
      title :title_with_bla
  end

  sequence :url do |n|
    "http://www.google.com/#{n}"
  end

  sequence :url2 do |n|
    "http://coca-cola.com/#{n}"
  end

  sequence :title_with_bla do |n|
    "Title with bla #{n}"
  end

  factory :bookmark_request_params, class: Hash do
    url
    title "Nice Title"
    shortening "http://shortening.com"
    initialize_with { {bookmark: attributes} }

  end

  factory :bookmark_params_with_different_site, parent: :bookmark_request_params do
      url { generate :url2 }
  end

  factory :bookmark_params_with_different_title, parent: :bookmark_request_params do
      title "much title"
  end
end
