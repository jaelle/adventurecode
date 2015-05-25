// Generated by CoffeeScript 1.9.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.BlocklyPanel = (function() {
    BlocklyPanel.prototype.blockly_container = null;

    BlocklyPanel.prototype.maze_container = null;

    function BlocklyPanel(blockly_container_id, maze_container_id) {
      this._initBehavior = __bind(this._initBehavior, this);
      this.resize_handler = __bind(this.resize_handler, this);
      console.log("new blockly panel");
      this.blockly_container = blockly_container_id;
      this.maze_container = maze_container_id;
      this.resize_blockly();
    }

    BlocklyPanel.prototype.resize_handler = function(event) {
      this.resize_blockly();
      console.log("resizing");
      return false;
    };

    BlocklyPanel.prototype.resize_blockly = function() {
      console.log(this.blockly_container);
      console.log(this.maze_container);
      return $(this.blockly_container)[0].height = $(this.maze_container + " canvas")[0].height + 2;
    };

    BlocklyPanel.prototype._initBehavior = function() {
      return $(window).resize(this.resize_handler);
    };

    return BlocklyPanel;

  })();

  window.blocklyLoaded = function(blockly) {
    return window.Blockly = blockly;
  };

  window.instructions = [];

  window.run_code = function() {
    var code, e, i, interval, step, _i, _ref, _results;
    window.instructions = [];
    code = window.Blockly.JavaScript.workspaceToCode();
    code += 'the_end();';
    console.log("Code" + code);
    try {
      eval(code);
    } catch (_error) {
      e = _error;
      if (e !== Infinity) {
        console.log(e);
      }
    }
    window.maze.reset('#maze_start', '#maze_end');
    console.log(instructions);
    _results = [];
    for (i = _i = 0, _ref = instructions.length; _i < _ref; i = _i += 1) {
      interval = 1000;
      step = i + 1;
      _results.push(setTimeout('eval(instructions[' + i + '])', interval * step));
    }
    return _results;
  };

  window.reset_code = function() {
    return window.maze.reset("#maze_start", "#maze_end");
  };

  window.move_west = function() {
    return instructions.push("window.maze.move_hero_west()");
  };

  window.move_east = function() {
    return instructions.push("window.maze.move_hero_east()");
  };

  window.move_north = function() {
    return instructions.push("window.maze.move_hero_north()");
  };

  window.move_south = function() {
    return instructions.push("window.maze.move_hero_south()");
  };

  window.the_end = function() {
    return instructions.push("window.maze.the_end()");
  };

}).call(this);
