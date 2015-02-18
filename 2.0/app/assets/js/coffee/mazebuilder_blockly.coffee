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
    $(@blockly_container)[0].height = $(@maze_container + " canvas")[0].height + 2

  _initBehavior: =>
    $(window).resize @resize_handler

window.blocklyLoaded = (blockly) ->
  window.Blockly = blockly

window.run_code = ->
  code = window.Blockly.JavaScript.workspaceToCode()
  console.log(code)

window.reset_code = ->
  window.Blockly.mainWorkspace.clear()

$ ->
  window.display_maze_defaults("#mazebuilder_maps")
  window.display_maze()

  blockly_panel = new BlocklyPanel("#blockly","#mazebuilder")
