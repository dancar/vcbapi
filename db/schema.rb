# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180320143526) do

  create_table "bookmarks", force: :cascade do |t|
    t.string "url"
    t.integer "site_id"
    t.string "title"
    t.string "shortening"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["site_id"], name: "index_bookmarks_on_site_id"
    t.index ["url"], name: "index_bookmarks_on_url", unique: true
  end

  create_table "bookmarks_tags", id: false, force: :cascade do |t|
    t.integer "bookmark_id", null: false
    t.integer "tag_id", null: false
    t.index ["bookmark_id", "tag_id"], name: "index_bookmarks_tags_on_bookmark_id_and_tag_id"
    t.index ["tag_id", "bookmark_id"], name: "index_bookmarks_tags_on_tag_id_and_bookmark_id"
  end

  create_table "sites", force: :cascade do |t|
    t.string "hostname"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hostname"], name: "index_sites_on_hostname", unique: true
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

end
