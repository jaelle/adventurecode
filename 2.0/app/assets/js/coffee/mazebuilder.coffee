
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

    if cell.color == @white
      @drawing_context.fillStyle = "rgb(255,255,255)"
    else
      @drawing_context.fillStyle = "rgb(0,0,0)"

    @drawing_context.fillRect x, y, @cell_size, @cell_size 
    
    if cell.image?
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

  place_draggable_character: ->

    console.log("Placing draggable character at first available blank space")

  place_draggable_goal: ->

    console.log("Placing draggable goal at last available blank space")

window.display_maze = ->

  window.maze = new Maze "#mazebuilder", 5, 5, false
  window.maze_canvas = maze.create()

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
    
window.display_settings = (container_id) ->
  get_options('/settings_json',container_id)

window.display_goals = (container_id) ->
  get_options('/goals_json',container_id)

window.display_heroes = (container_id) ->
  get_options('/heroes_json',container_id)
  
window.get_options = (url, container_id) ->
  $.getJSON url, (data) ->
    display_options_list container_id,data
    
window.display_options_list = ( container_id, data ) ->
  console.log("Success")
  console.log(data)
  
  container = $ container_id
  new_height = container.width()
  container.height(new_height + "px") 
  
  row = $ "<tr>"

  for x in [0...data.length] by 1
    cell = $ "<td>"
    cell.attr "class", "options-cell"
    
    link = $ "<a>"
    link.attr "class", "list-group-item "
    link.attr "id", container_id.substring(1,container_id.length) + data[x].id
    link.attr "onclick", "javascript:select('"+ container_id + "'," + data[x].id + ")"
    
    p = $ "<p>"
    p.attr "class", "list-group-item-text"
    
    img = $ "<img>"
    # remove '/assets' from image_path
    image_path = data[x].image_path
    img.attr "src", image_path
    img.attr "width", "50"
    
    p.append img
    link.append p
    
    title = $ "<h5>"
    title.attr "class", "list-group-item-heading"
    title.append data[x].description
    
    # link.append title
    
    cell.append link
    row.append cell
    
    if (x+1) % 3 == 0
      container.append row
      row = $ "<tr>"
  
  container.append row
  
  window.select = (container_id,id) ->
    $(container_id + " .list-group-item").removeClass("active")
    
    option_id = container_id + id
    container = $ option_id
    container.addClass("active")
    
    selected_image = $ "<img>"
    selected_image.attr "src", container.children().children()[0].src
    selected_image.attr "width", "50"
    
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
    
    selection.empty()
    selection.append selected_image
    
    save_setting.val(id)
    console.log(save_setting)

window.set_option_image = (option_id,type,page) ->
  switch type
    when "setting"
      get_image_path('/settings_json',option_id,type,page)
    when "hero"
      get_image_path('/heroes_json',option_id,type,page)
    when "goal"
      get_image_path('/goals_json',option_id,type,page)

window.get_image_path = (url,id,type,page) ->
  $.getJSON url, (data) ->
		
    for x in [0...data.length] by 1
      
      if parseInt(data[x].id) == parseInt(id)
        image_path = data[x].image_path
        option_image = new Image()
        option_image.width = window.maze.cell_size
        option_image.height = window.maze.cell_size
        option_image.src = image_path
        
        option_image.onload = ->
          console.log("loaded" + option_image)
          
          switch type
            when "setting"
              window.maze.setting(option_image)
            when "hero"
              window.maze.hero(option_image)
            when "goal"
              window.maze.goal(option_image)
          
          console.log(page)
          if page == "/step2"
            #mazebuilder_maps contains the maps to choose from
            display_map_defaults("#mazebuilder_maps")
          else 
            # TODO: for some reason #maze_map is empty here. 
            console.log($("#maze_map").val())
            window.maze.load_map($("#maze_map").val())
              
    
window.init = (page) ->
  
  #setup page specific settings
  switch page
    when "/","/step1"
      display_settings("#settings")
      display_heroes("#heroes")
      display_goals("#goals")
    when "/step2"
      $ ->
        $('[data-toggle="tooltip"]').tooltip()
        $('#hero_piece').tooltip('show')

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

      make_droppable('#mazebuilder')
  
  switch page
    when "/step2", "/step3"
      window.maze = display_maze()
      
      setting_id = $("#maze_setting").val()
      set_option_image(setting_id,"setting",page)

  switch page
    when "/step3"
      blockly_panel = new BlocklyPanel("#blockly","#mazebuilder")