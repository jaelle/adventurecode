
class window.Maze

  @maze: null
  @map: null
  @is_map: false

  @white: null
  @black: null

  @drawing_context: null

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

        current_cell[row][col] = @create_cell col,row, @map[count]
        @draw_cell current_cell[row][col]

        count++

  create_cell: (col, row, color) ->
    col: col
    row: row
    color: color

  draw_cell: (cell) ->
    x = cell.col * @cell_size
    y = cell.row * @cell_size

    @drawing_context.strokeStyle = "rgba(0,0,0,1)"
    @drawing_context.strokeRect x, y, @cell_size, @cell_size

    if cell.color == @white
      @drawing_context.fillStyle = "rgb(255,255,255)"
    else
      @drawing_context.fillStyle = "rgb(0,0,0)"

    @drawing_context.fillRect x, y, @cell_size, @cell_size 

  clear_canvas: ->
    @drawing_context.fillStyle = "rgb(255,255,255)"
    @drawing_context.fillRect 0, 0, @canvas[0].width, @canvas[0].height

  update: ->
    @resize_canvas()
    @clear_canvas()
    @update_cells()

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
    
  setting: (image_path) ->
    
    console.log(image_path)
    
  character: (image_path) ->
    
    console.log(image_path)
    
  goal: (image_path) ->
    
    console.log(image_path)

  place_draggable_character: ->

    console.log("Placing draggable character at first available blank space")

  place_draggable_goal: ->

    console.log("Placing draggable goal at last available blank space")

window.display_maze = ->

  window.maze = new Maze "#mazebuilder", 5, 5, false
  window.maze_canvas = maze.create()

  maze_map = $ "#mazebuilder_map"
  maze_map.val("[" + maze.map + "]")

  # touch_tracker = new TouchTracker(maze_canvas, {swipeThreshold: 400})

  maze_canvas.on "click", (event) ->
    maze.toggle_cell(event)
    maze_map.val("[" + maze.map + "]")

  maze

window.load_page = (path) ->
  if path != "null"
    location.href = path

window.init = (page) ->
  
  #setup page specific settings
  switch page
    when "/step2"
      display_map_defaults("#mazebuilder_maps")
      map_array = $("#mazebuilder_map00 input").val()
    when "/step3"
      blockly_panel = new BlocklyPanel("#blockly","#mazebuilder")
      map_array = "[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]"

  # display maze
  switch page
    when "/step2", "/step3"
      maze = display_maze()
      
      # load maze settings
      maze.setting('images/corn.png')
      maze.character('images/dog.png')
      maze.goal('images/dogbowl.png')
      
      maze.load_map(map_array)
      maze.place_draggable_goal()
      maze.place_draggable_character()
    else 
      maze = display_maze()