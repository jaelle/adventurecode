
window.display_map_defaults = (container_id) ->
  
  container = $ container_id

  # mazes
  maze_map = [] 
  maze_map_container = []

  row = $ "<div>"
  row.attr "class", "row"

  for x in [0...6] by 1

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

  for x in [0...6] by 1

    maze_map[x] = new Maze "#mazebuilder_map0" + x, 5, 5, true
    maze_map[x].create()

    map = maze_map[x].random_map()

    map_input = $ "<input>"
    map_input.attr "type", "hidden"
    map_input.attr "value", "[" + map + "]"

    $("#mazebuilder_map0" + x).append map_input

window.select_maze = (map_container_id) ->
  map_array = $(map_container_id + " input").val()
  maze.load_map(map_array)
