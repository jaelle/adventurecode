class MazemapsController < ApplicationController
  before_action :set_mazemap, only: [:show, :edit, :update, :destroy]

  # GET /mazemaps
  # GET /mazemaps.json
  def index
    @mazemaps = Mazemap.all
  end

  # GET /mazemaps/1
  # GET /mazemaps/1.json
  def show
  end

  # GET /mazemaps/new
  def new
    @mazemap = Mazemap.new
  end

  # GET /mazemaps/1/edit
  def edit
  end

  # POST /mazemaps
  # POST /mazemaps.json
  def create
    @mazemap = Mazemap.new(mazemap_params)

    respond_to do |format|
      if @mazemap.save
        format.html { redirect_to @mazemap, notice: 'Mazemap was successfully created.' }
        format.json { render :show, status: :created, location: @mazemap }
      else
        format.html { render :new }
        format.json { render json: @mazemap.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /mazemaps/1
  # PATCH/PUT /mazemaps/1.json
  def update
    respond_to do |format|
      if @mazemap.update(mazemap_params)
        format.html { redirect_to @mazemap, notice: 'Mazemap was successfully updated.' }
        format.json { render :show, status: :ok, location: @mazemap }
      else
        format.html { render :edit }
        format.json { render json: @mazemap.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /mazemaps/1
  # DELETE /mazemaps/1.json
  def destroy
    @mazemap.destroy
    respond_to do |format|
      format.html { redirect_to mazemaps_url, notice: 'Mazemap was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mazemap
      @mazemap = Mazemap.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mazemap_params
      params.require(:mazemap).permit(:maze, :layout_id)
    end
end
