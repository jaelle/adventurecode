# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20141005163830) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: true do |t|
    t.string   "username"
    t.string   "password"
    t.string   "birthday"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "goals", force: true do |t|
    t.string   "title"
    t.string   "image"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "layouts", force: true do |t|
    t.string   "layoutstring"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "main_characters", force: true do |t|
    t.string   "title"
    t.string   "image"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "mazelayouts", force: true do |t|
    t.integer  "maze_id"
    t.integer  "layout_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "mazelayouts", ["layout_id"], name: "index_mazelayouts_on_layout_id", using: :btree
  add_index "mazelayouts", ["maze_id"], name: "index_mazelayouts_on_maze_id", using: :btree

  create_table "mazes", force: true do |t|
    t.string   "title"
    t.string   "layout"
    t.string   "start"
    t.string   "end"
    t.integer  "setting_id"
    t.integer  "main_character_id"
    t.integer  "goal_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "layout_id"
  end

  add_index "mazes", ["goal_id"], name: "index_mazes_on_goal_id", using: :btree
  add_index "mazes", ["layout_id"], name: "index_mazes_on_layout_id", using: :btree
  add_index "mazes", ["main_character_id"], name: "index_mazes_on_main_character_id", using: :btree
  add_index "mazes", ["setting_id"], name: "index_mazes_on_setting_id", using: :btree

  create_table "puzzles", force: true do |t|
    t.integer  "account_id"
    t.integer  "maze_id"
    t.string   "unique_link"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "puzzles", ["account_id"], name: "index_puzzles_on_account_id", using: :btree
  add_index "puzzles", ["maze_id"], name: "index_puzzles_on_maze_id", using: :btree

  create_table "settings", force: true do |t|
    t.string   "title"
    t.string   "image"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

end
