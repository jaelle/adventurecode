require 'test_helper'

class PuzzlesControllerTest < ActionController::TestCase
  setup do
    @puzzle = puzzles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:puzzles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create puzzle" do
    assert_difference('Puzzle.count') do
      post :create, puzzle: { account_id: @puzzle.account_id, maze_id: @puzzle.maze_id, unique_link: @puzzle.unique_link }
    end

    assert_redirected_to puzzle_path(assigns(:puzzle))
  end

  test "should show puzzle" do
    get :show, id: @puzzle
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @puzzle
    assert_response :success
  end

  test "should update puzzle" do
    patch :update, id: @puzzle, puzzle: { account_id: @puzzle.account_id, maze_id: @puzzle.maze_id, unique_link: @puzzle.unique_link }
    assert_redirected_to puzzle_path(assigns(:puzzle))
  end

  test "should destroy puzzle" do
    assert_difference('Puzzle.count', -1) do
      delete :destroy, id: @puzzle
    end

    assert_redirected_to puzzles_path
  end
end
