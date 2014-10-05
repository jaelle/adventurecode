require 'test_helper'

class MazemapsControllerTest < ActionController::TestCase
  setup do
    @mazemap = mazemaps(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:mazemaps)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create mazemap" do
    assert_difference('Mazemap.count') do
      post :create, mazemap: { layout_id: @mazemap.layout_id, maze: @mazemap.maze }
    end

    assert_redirected_to mazemap_path(assigns(:mazemap))
  end

  test "should show mazemap" do
    get :show, id: @mazemap
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @mazemap
    assert_response :success
  end

  test "should update mazemap" do
    patch :update, id: @mazemap, mazemap: { layout_id: @mazemap.layout_id, maze: @mazemap.maze }
    assert_redirected_to mazemap_path(assigns(:mazemap))
  end

  test "should destroy mazemap" do
    assert_difference('Mazemap.count', -1) do
      delete :destroy, id: @mazemap
    end

    assert_redirected_to mazemaps_path
  end
end
