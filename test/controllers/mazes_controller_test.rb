require 'test_helper'

class MazesControllerTest < ActionController::TestCase
  setup do
    @maze = mazes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:mazes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create maze" do
    assert_difference('Maze.count') do
      post :create, maze: { end: @maze.end, goal: @maze.goal, layout: @maze.layout, main_character: @maze.main_character, puzzle_id: @maze.puzzle_id, setting: @maze.setting, start: @maze.start, title: @maze.title }
    end

    assert_redirected_to maze_path(assigns(:maze))
  end

  test "should show maze" do
    get :show, id: @maze
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @maze
    assert_response :success
  end

  test "should update maze" do
    patch :update, id: @maze, maze: { end: @maze.end, goal: @maze.goal, layout: @maze.layout, main_character: @maze.main_character, puzzle_id: @maze.puzzle_id, setting: @maze.setting, start: @maze.start, title: @maze.title }
    assert_redirected_to maze_path(assigns(:maze))
  end

  test "should destroy maze" do
    assert_difference('Maze.count', -1) do
      delete :destroy, id: @maze
    end

    assert_redirected_to mazes_path
  end
end
