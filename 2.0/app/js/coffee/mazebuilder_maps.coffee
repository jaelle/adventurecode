
window.display_maze_defaults = (container_id) ->
  
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


window.display_maze = ->

  window.maze = new Maze "#mazebuilder", 5, 5, false
  window.maze_canvas = maze.create()

  maze_map = $ "#mazebuilder_map"
  maze_map.val("[" + maze.map + "]")

  touch_tracker = new TouchTracker(maze_canvas, {swipeThreshold: 400})

  maze_canvas.on "click", (event) ->
    maze.toggle_cell(event)
    maze_map.val("[" + maze.map + "]")

window.select_maze = (map_container_id) ->
  map = $(map_container_id + " input").val()
  maze.load_map(map)
