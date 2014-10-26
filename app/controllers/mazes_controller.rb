class MazesController < ApplicationController
  before_action :set_maze, only: [:show, :edit, :update, :destroy]

  # GET /mazes
  # GET /mazes.json
  def index
    @mazes = Maze.all
  end

  # GET /mazes/1
  # GET /mazes/1.json
  def show
  end

  # GET /mazes/new
  def new
    session[:maze_params] ||= {}
    @maze = Maze.new(session[:maze_params])
    @maze.current_step = session[:maze_step]
    # @maze = Maze.new
  end

  # GET /mazes/1/edit
  def edit
  end

  # POST /mazes
  # POST /mazes.json
  def create
    session[:maze_params].deep_merge!(params[:maze]) if params[:maze]
    @maze = Maze.new(session[:maze_params])
    @maze.current_step = session[:maze_step]
    if @maze.valid?
      if params['back_button.x']
        @maze.previous_step
      elsif @maze.last_step?
        @maze.save if @maze.all_valid?
      else
        @maze.next_step
      end
      session[:maze_step] = @maze.current_step
    end
    if @maze.new_record?
      render "new"
    else
      session[:maze_step] = session[:maze_step] = nil
      flash[:notice] = "Maze saved!"
      redirect_to @maze
    end
  end

  # PATCH/PUT /mazes/1
  # PATCH/PUT /mazes/1.json
  def update
    respond_to do |format|
      if @maze.update(maze_params)
        format.html { redirect_to @maze, notice: 'Maze was successfully updated.' }
        format.json { render :show, status: :ok, location: @maze }
      else
        format.html { render :edit }
        format.json { render json: @maze.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /mazes/1
  # DELETE /mazes/1.json
  def destroy
    @maze.destroy
    respond_to do |format|
      format.html { redirect_to mazes_url, notice: 'Maze was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def draw

  end

  def setup

  end

  def preview

    @title = "Step 2 - Preview the maze."
  end

  def share

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_maze
      @maze = Maze.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def maze_params
      params.require(:maze).permit(:title, :layout, :start, :end, :setting_id, :main_character_id, :goal_id, :startCoordinates, :endCoordinates)
    end
end
