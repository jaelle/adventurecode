class MainCharactersController < ApplicationController
  before_action :set_main_character, only: [:show, :edit, :update, :destroy]

  # GET /main_characters
  # GET /main_characters.json
  def index
    @main_characters = MainCharacter.all
  end

  # GET /main_characters/1
  # GET /main_characters/1.json
  def show
  end

  # GET /main_characters/new
  def new
    @main_character = MainCharacter.new
  end

  # GET /main_characters/1/edit
  def edit
  end

  # POST /main_characters
  # POST /main_characters.json
  def create
    @main_character = MainCharacter.new(main_character_params)

    respond_to do |format|
      if @main_character.save
        format.html { redirect_to @main_character, notice: 'Main character was successfully created.' }
        format.json { render :show, status: :created, location: @main_character }
      else
        format.html { render :new }
        format.json { render json: @main_character.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /main_characters/1
  # PATCH/PUT /main_characters/1.json
  def update
    respond_to do |format|
      if @main_character.update(main_character_params)
        format.html { redirect_to @main_character, notice: 'Main character was successfully updated.' }
        format.json { render :show, status: :ok, location: @main_character }
      else
        format.html { render :edit }
        format.json { render json: @main_character.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /main_characters/1
  # DELETE /main_characters/1.json
  def destroy
    @main_character.destroy
    respond_to do |format|
      format.html { redirect_to main_characters_url, notice: 'Main character was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_main_character
      @main_character = MainCharacter.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def main_character_params
      params.require(:main_character).permit(:title, :image)
    end
end
