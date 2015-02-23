
window.display_map_defaults = (container_id) ->
  get_mazes('/mazemap_json',container_id)
    
window.get_mazes = (url,container_id) ->
  $.getJSON url, (data) ->
    display_maze_maps container_id,data
    
window.display_maze_maps = ( container_id, data ) ->
  
  container = $ container_id

  # mazes
  maze_map = [] 
  maze_map_container = []
  
  row = $ "<div>"
  row.attr "class", "row"

  for x in [0...data.length] by 1
    maze_map_container = $ "<div>"
    maze_map_container.attr "id", "mazebuilder_map0" + x
    maze_map_container.attr "onclick", "javascript:select_maze('#mazebuilder_map0" + x + "')"
    maze_map_container.attr "class", "col-xs-4"

    if x % 3 == 0
      container.append row

      row = $ "<div>"
      row.attr "class", "row first-row"

    row.append maze_map_container

  container.append row

  for x in [0...data.length] by 1

    maze_map[x] = new Maze "#mazebuilder_map0" + x, 5, 5, true
    maze_map[x].create()
    console.log(data[x].map)
    map = maze_map[x].load_map(data[x].map)

    map_input = $ "<input>"
    map_input.attr "type", "hidden"
    map_input.attr "value", "[" + map + "]"

    $("#mazebuilder_map0" + x).append map_input

  console.log($("#mazebuilder_map00 input").val())
  window.maze.load_map($("#mazebuilder_map00 input").val())

window.select_maze = (map_container_id) ->
  map_array = $(map_container_id + " input").val()
  maze.load_map(map_array)

window.make_draggable = (container_id) ->
  console.log(container_id)
  $(container_id).droppable
      
window.make_droppable = (container_id) ->
  $(container_id + " canvas").droppable
    accept: ".maze_piece"
    drop: (event,ui) ->
      console.log(event)