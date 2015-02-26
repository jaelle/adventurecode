
class window.Maze

  @maze: null
  @map: null
  @is_map: false

  @white: null
  @black: null

  @drawing_context: null
  @setting_image: null
  @goal_image: null
  @hero_image: null

  constructor: (@container_id, @num_cols, @num_rows, @is_map) ->

    @._initBehavior()

    @maze = $(@container_id)
    @cell_size = @maze.width() / @num_cols

    @white = 0
    @black = 1

    @map = [
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0
    ]

    @maze

  resize_handler: (event) =>
    @cell_size = @maze.width() / @num_cols
    @update()

    false

  _initBehavior: =>
    $(window).resize @resize_handler

  create: ->
    @canvas = $ "<canvas>"

    if @is_map
      @canvas[0].className = "maze_map"
    else
      @canvas[0].className = "maze"
    
    @resize_canvas()

    @maze.append @canvas[0]
    @drawing_context = @canvas[0].getContext '2d'

    @update_cells()

    @canvas

  random_map: ->
    for i in [0...25] by 1
      @map[i] = Math.floor(Math.random() * 2)

    @update()
    @map

  load_map: (map) ->
    @map = JSON.parse(map) 
    @update()
    @map

  resize_canvas: -> 
    @canvas[0].width = @cell_size * @num_cols
    @canvas[0].height = @cell_size * @num_rows


  update_cells: ->
    count = 0
    current_cell = []

    for row in [0...@num_rows] by 1
      current_cell[row] = []
      
      for col in [0...@num_cols] by 1
        color = @map[count]

        current_cell[row][col] = @create_cell col,row, @map[count], @setting_image
        @draw_cell current_cell[row][col]

        count++

  create_cell: (col, row, color, image) ->
    col: col
    row: row
    color: color
    image: image

  draw_cell: (cell) ->
    x = cell.col * @cell_size
    y = cell.row * @cell_size

    @drawing_context.strokeStyle = "rgba(0,0,0,1)"
    @drawing_context.strokeRect x, y, @cell_size, @cell_size

    if cell.color == @white || (cell.image && @is_map is false)
      @drawing_context.fillStyle = "rgb(255,255,255)"
    else
      @drawing_context.fillStyle = "rgb(0,0,0)"

    @drawing_context.fillRect x, y, @cell_size, @cell_size 
    
    if cell.image && @is_map is false
      if cell.color == @black
        @drawing_context.drawImage cell.image, 0, 0, @cell_size, @cell_size, x, y, @cell_size, @cell_size

  clear_canvas: ->
    @drawing_context.fillStyle = "rgb(255,255,255)"
    @drawing_context.fillRect 0, 0, @canvas[0].width, @canvas[0].height

  update: ->
    @resize_canvas()
    @clear_canvas()
    @update_cells()
    
    $("#maze_map").val("[" + @map + "]")

  toggle_cell: (event) ->
    rect = @canvas[0].getBoundingClientRect()

    y = event.clientY - rect.top
    row = Math.floor(y / @cell_size)

    x = event.clientX - rect.left
    col = Math.floor(x / @cell_size)

    index = @index(row,col)

    if @map[index] == @black
      @map[index] = @white
    else
      @map[index] = @black

    @update()

  index: (row, col) ->
    index = row * @num_cols + col
    
  setting: (image) ->
    @setting_image = image
    
  hero: (image) ->
    @hero_image = image
    
  goal: (image) ->
    @goal_image = image

window.display_maze = ->

  window.maze = new Maze "#mazebuilder", 5, 5, false
  window.maze_canvas = maze.create()
  
  if $ "#setting_piece"?
    setting_source = $("#setting_piece")
    setting_image = new Image()
    setting_image.src = setting_source.attr "src"
    setting_image.width = setting_source.attr "width"
    setting_image.height = setting_source.attr "height"
    console.log(setting_image)

    window.maze.setting(setting_image)

  maze_map = $ "#maze_map"
  maze_map.val("[" + maze.map + "]")

  # touch_tracker = new TouchTracker(maze_canvas, {swipeThreshold: 400})

  maze_canvas.on "click", (event) ->
    maze.toggle_cell(event)
    maze_map.val("[" + maze.map + "]")

  maze

window.submit_form = (form_id,path) ->
  if path != "null"
    $(form_id).attr "action", path
    $(form_id).submit()
  
window.select = (container_id,id) ->
  $(container_id + " .list-group-item").removeClass("active")
  
  option_id = container_id + id
  container = $ option_id
  container.addClass("active")
  
  image = container_id + id + " img";
  console.log(image)
  selected_image = $(image).attr('src')
  console.log(selected_image)
  
  switch container_id
    when "#settings"
      selection = $ "#chosen_setting"
      save_setting = $ "#maze_setting"
    when "#heroes"
      selection = $ "#chosen_hero"
      save_setting = $ "#maze_hero"
    when "#goals"
      selection = $ "#chosen_goal"
      save_setting = $ "#maze_goal"
  
  console.log(selection)
  selection.attr('src',selected_image)
  console.log(selection.attr('src'))
  
  save_setting.val(id)
  
window.save_coordinates = (event,ui) -> 
  maze_rect = $("#mazebuilder canvas")[0].getBoundingClientRect();
  x = event.clientX - maze_rect.left;
  y = event.clientY - maze_rect.top;

  col = Math.floor(x / 75)
  row = Math.floor(y / 75)
  console.log(col + "," + row)
  console.log(event)
	
  if event.toElement.classList.contains("goal")
    $("#maze_start").val("[" + row + "," + col + "]")
  else
    $("#maze_end").val("[" + row + "," + col + "]")

window.init = (page) ->
  
  #setup page specific settings
  switch page
    when "/step2"
      $ ->
        $('[data-toggle="tooltip"]').tooltip()
        $('#hero_piece').tooltip('show')
  
  switch page
    when "/step2", "/step3"
      window.maze = display_maze()
      
      setting_id = $("#maze_setting").val()

  switch page
    when "/step2"
      window.maze.canvas.droppable
        accept: ".maze_piece"
        drop: (event, ui) ->
          console.log("dropped")
          window.save_coordinates(event, ui)
          
      $('#hero_piece').draggable
        stack: "#mazebuilder"
        revert: "invalid"
        helper: "clone"
        appendTo: "#mazebuilder"
        scroll:true
        stop: (event,ui) ->
          clone = $(ui.helper).clone()[0];
          $(ui.helper).clone(true).removeClass('hero ui-draggable ui-draggable-dragging').addClass('hero-clone').css('top',clone.style.top).css('left',clone.style.left).appendTo('#mazebuilder').draggable({})
          $("#goal_piece").tooltip('show')

      $('#goal_piece').draggable
        stack: "#mazebuilder"
        revert: "invalid"
        helper: "clone"
        appendTo: "#mazebuilder"
        scroll: true
        stop: (event,ui) ->
          clone = $(ui.helper).clone()[0];
          $(ui.helper).clone(true).removeClass('goal ui-draggable ui-draggable-dragging').addClass('goal-clone').css('top',clone.style.top).css('left',clone.style.left).appendTo('#mazebuilder').draggable({})

          
      display_maze_maps("#mazebuilder_maps")
    when "/step3"
      blockly_panel = new BlocklyPanel("#blockly","#mazebuilder")