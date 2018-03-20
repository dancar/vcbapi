FactoryBot.define do
  factory :bookmark do
    url
    title "bookmark-title"

  end

  factory :bookmark_with_bla_in_title, parent: :bookmark do
      title :title_with_bla
  end

  sequence :url do |n|
    "http://www.google.com/#{n}"
  end

  sequence :title_with_bla do |n|
    "Title with bla #{n}"
  end

  factory :bookmark_request_params, class: Hash do
    url
    title "Nice Title"
    initialize_with { {bookmark: attributes} }
  end
end
