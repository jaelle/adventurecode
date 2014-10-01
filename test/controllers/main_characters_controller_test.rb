require 'test_helper'

class MainCharactersControllerTest < ActionController::TestCase
  setup do
    @main_character = main_characters(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:main_characters)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create main_character" do
    assert_difference('MainCharacter.count') do
      post :create, main_character: { image: @main_character.image, maze_id: @main_character.maze_id, title: @main_character.title }
    end

    assert_redirected_to main_character_path(assigns(:main_character))
  end

  test "should show main_character" do
    get :show, id: @main_character
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @main_character
    assert_response :success
  end

  test "should update main_character" do
    patch :update, id: @main_character, main_character: { image: @main_character.image, maze_id: @main_character.maze_id, title: @main_character.title }
    assert_redirected_to main_character_path(assigns(:main_character))
  end

  test "should destroy main_character" do
    assert_difference('MainCharacter.count', -1) do
      delete :destroy, id: @main_character
    end

    assert_redirected_to main_characters_path
  end
end
