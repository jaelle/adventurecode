class window.BlocklyPanel

  blockly_container: null
  maze_container: null

  constructor: (blockly_container_id, maze_container_id) ->
    console.log("new blockly panel")
    @blockly_container = blockly_container_id
    @maze_container = maze_container_id

    @resize_blockly()

  resize_handler: (event) =>
    @resize_blockly()
    console.log("resizing")

    false

  resize_blockly: ->
    console.log(@blockly_container)
    console.log(@maze_container)
    $(@blockly_container)[0].height = $(@maze_container + " canvas")[0].height + 2

  _initBehavior: =>
    $(window).resize @resize_handler

window.blocklyLoaded = (blockly) ->
  window.Blockly = blockly


window.instructions = []
  
window.run_code = ->
  window.instructions = []
  code = window.Blockly.JavaScript.workspaceToCode()
  code += 'the_end();'
  
  console.log("Code" + code)
  try
    eval(code)
  catch e
    if e != Infinity 
      console.log(e);
  
  window.maze.reset('#maze_start','#maze_end')
  console.log(instructions)

  for i in [0...instructions.length] by 1
    interval = 1000;
    step = i+1;
    setTimeout('eval(instructions[' + i + '])',interval*step)

window.reset_code = ->
  #window.Blockly.mainWorkspace.clear()
  window.maze.reset("#maze_start","#maze_end")
  #window.instructions = []
  
window.move_west = ->
  instructions.push("window.maze.move_hero_west()")
window.move_east = ->
  instructions.push("window.maze.move_hero_east()")
window.move_north = ->
  instructions.push("window.maze.move_hero_north()")
window.move_south = ->
  instructions.push("window.maze.move_hero_south()")
window.the_end = ->
  instructions.push("window.maze.the_end()")