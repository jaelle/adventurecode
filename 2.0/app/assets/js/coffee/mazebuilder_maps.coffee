
window.display_maze_maps = ( container_id ) ->
  
  console.log(container_id)
  maze_map_containers = $(container_id).find("li").find("a")
  maze_map_inputs = maze_map_containers.find("input")
  
  maze_map_containers.each (index, element) ->
    maze_map_val = maze_map_inputs[index].value
    maze_id = "#" + element.id
    console.log(maze_id)
    
    maze_map = new Maze maze_id, 5, 5, true
    maze_map_canvas = maze_map.create()
    map = maze_map.load_map(maze_map_inputs[index].value)
    maze_map_canvas.appendTo(element)

  window.maze.load_map(maze_map_inputs[0].value)
  $('#maze_map').val(maze_map_inputs[0].value)
    
  #container = $ container_id
  #maze_map[x] = new Maze "#mazebuilder_map0" + x, 5, 5, true
  #maze_map[x].create()
  #map = maze_map[x].load_map(data[x].map)

  #window.maze.load_map($("#mazebuilder_map00 input").val())

window.select_maze = (map_container_id) ->
  $("#mazebuilder_maps .list-group-item").removeClass("active")
  $(map_container_id).addClass("active")
  map_array = $(map_container_id + " input").val()
  maze.load_map(map_array)