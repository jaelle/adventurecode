// Generated by CoffeeScript 1.9.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Maze = (function() {
    Maze.maze = null;

    Maze.map = null;

    Maze.is_map = false;

    Maze.white = null;

    Maze.black = null;

    Maze.drawing_context = null;

    Maze.setting_image = null;

    Maze.goal_image = null;

    Maze.hero_image = null;

    Maze.hero_row = null;

    Maze.hero_col = null;

    Maze.goal_row = null;

    Maze.goal_col = null;

    function Maze(_at_container_id, _at_num_cols, _at_num_rows, _at_is_map) {
      this.container_id = _at_container_id;
      this.num_cols = _at_num_cols;
      this.num_rows = _at_num_rows;
      this.is_map = _at_is_map;
      this._initBehavior = __bind(this._initBehavior, this);
      this.resize_handler = __bind(this.resize_handler, this);
      this._initBehavior();
      this.maze = $(this.container_id);
      this.cell_size = this.maze.width() / this.num_cols;
      this.white = 0;
      this.black = 1;
      this.map = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.maze;
    }

    Maze.prototype.resize_handler = function(event) {
      this.cell_size = this.maze.width() / this.num_cols;
      this.update();
      return false;
    };

    Maze.prototype._initBehavior = function() {
      return $(window).resize(this.resize_handler);
    };

    Maze.prototype.create = function() {
      this.canvas = $("<canvas>");
      if (this.is_map) {
        this.canvas[0].className = "maze_map";
      } else {
        this.canvas[0].className = "maze";
      }
      this.resize_canvas();
      this.maze.append(this.canvas[0]);
      this.drawing_context = this.canvas[0].getContext('2d');
      this.update_cells();
      return this.canvas;
    };

    Maze.prototype.random_map = function() {
      var i, _i;
      for (i = _i = 0; _i < 25; i = _i += 1) {
        this.map[i] = Math.floor(Math.random() * 2);
      }
      this.update();
      return this.map;
    };

    Maze.prototype.load_map = function(map) {
      this.map = JSON.parse(map);
      this.update();
      return this.map;
    };

    Maze.prototype.resize_canvas = function() {
      this.canvas[0].width = this.cell_size * this.num_cols;
      return this.canvas[0].height = this.cell_size * this.num_rows;
    };

    Maze.prototype.update_cells = function() {
      var col, color, count, current_cell, row, _i, _ref, _results;
      count = 0;
      current_cell = [];
      _results = [];
      for (row = _i = 0, _ref = this.num_rows; _i < _ref; row = _i += 1) {
        current_cell[row] = [];
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (col = _j = 0, _ref1 = this.num_cols; _j < _ref1; col = _j += 1) {
            color = this.map[count];
            if ((this.hero_col != null) && (this.hero_row != null) && (this.hero_col === col && this.hero_row === row)) {
              current_cell[row][col] = this.create_cell(this.hero_col, this.hero_row, this.black, this.hero_image);
              console.log("hero: " + this.hero_row + ":" + row + " - " + this.hero_row + ":" + col);
            } else if ((this.goal_col != null) && (this.goal_row != null) && (this.goal_col === col && this.goal_row === row)) {
              current_cell[row][col] = this.create_cell(this.goal_col, this.goal_row, this.black, this.goal_image);
              console.log("goal: " + this.goal_row + ":" + row + " - " + this.goal_col + ":" + col);
            } else {
              current_cell[row][col] = this.create_cell(col, row, this.map[count], this.setting_image);
            }
            this.draw_cell(current_cell[row][col]);
            _results1.push(count++);
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Maze.prototype.create_cell = function(col, row, color, image) {
      return {
        col: col,
        row: row,
        color: color,
        image: image
      };
    };

    Maze.prototype.place_hero = function(hero_coordinates_id) {
      var hero_coordinates;
      hero_coordinates = jQuery.parseJSON($(hero_coordinates_id).val());
      this.hero_row = hero_coordinates[0];
      return this.hero_col = hero_coordinates[1];
    };

    Maze.prototype.place_goal = function(goal_coordinates_id) {
      var goal_coordinates;
      goal_coordinates = jQuery.parseJSON($(goal_coordinates_id).val());
      this.goal_row = goal_coordinates[0];
      return this.goal_col = goal_coordinates[1];
    };

    Maze.prototype.draw_cell = function(cell) {
      var x, y;
      x = cell.col * this.cell_size;
      y = cell.row * this.cell_size;
      this.drawing_context.strokeStyle = "rgba(0,0,0,1)";
      this.drawing_context.strokeRect(x, y, this.cell_size, this.cell_size);
      if (cell.color === this.white || (cell.image && this.is_map === false)) {
        this.drawing_context.fillStyle = "rgb(255,255,255)";
      } else {
        this.drawing_context.fillStyle = "rgb(0,0,0)";
      }
      this.drawing_context.fillRect(x, y, this.cell_size, this.cell_size);
      if (cell.image && this.is_map === false) {
        if (cell.color === this.black) {
          this.drawing_context.fillStyle = "rgb(255,255,255)";
          this.drawing_context.fillRect(x, y, this.cell_size, this.cell_size);
          return this.drawing_context.drawImage(cell.image, 0, 0, this.cell_size, this.cell_size, x, y, this.cell_size, this.cell_size);
        }
      }
    };

    Maze.prototype.clear_canvas = function() {
      this.drawing_context.fillStyle = "rgb(255,255,255)";
      return this.drawing_context.fillRect(0, 0, this.canvas[0].width, this.canvas[0].height);
    };

    Maze.prototype.update = function() {
      this.resize_canvas();
      this.clear_canvas();
      this.update_cells();
      this.check_for_win();
      return $("#maze_map").val("[" + this.map + "]");
    };

    Maze.prototype.check_for_win = function() {
      if (this.goal_row && this.hero_row) {
        if (this.hero_row === this.goal_row && this.hero_col === this.goal_col) {
          return alert("Congratulations! You reached the goal.");
        }
      }
    };

    Maze.prototype.toggle_cell = function(event) {
      var col, index, rect, row, x, y;
      rect = this.canvas[0].getBoundingClientRect();
      y = event.clientY - rect.top;
      row = Math.floor(y / this.cell_size);
      x = event.clientX - rect.left;
      col = Math.floor(x / this.cell_size);
      index = this.index(row, col);
      if (this.map[index] === this.black) {
        this.map[index] = this.white;
      } else {
        this.map[index] = this.black;
      }
      return this.update();
    };

    Maze.prototype.index = function(row, col) {
      var index;
      return index = row * this.num_cols + col;
    };

    Maze.prototype.setting = function(image) {
      return this.setting_image = image;
    };

    Maze.prototype.hero = function(image) {
      return this.hero_image = image;
    };

    Maze.prototype.goal = function(image) {
      return this.goal_image = image;
    };

    Maze.prototype.reset = function(hero_coordinates_id, goal_coordinates_id) {
      this.place_hero(hero_coordinates_id);
      this.place_goal(goal_coordinates_id);
      return this.update();
    };

    Maze.prototype.move_hero_west = function() {
      var index;
      index = this.index(this.hero_row, this.hero_col);
      if ((this.hero_col - 1) >= 0 && this.map[index] === this.white) {
        this.hero_col--;
        return this.update();
      } else {
        return alert("Can't move west");
      }
    };

    Maze.prototype.move_hero_east = function() {
      var index;
      index = this.index(this.hero_row, this.hero_col);
      if ((this.hero_col + 1) && this.map[index] === this.white) {
        this.hero_col++;
        return this.update();
      } else {
        return alert("Can't move east");
      }
    };

    Maze.prototype.move_hero_north = function() {
      var index;
      index = this.index(this.hero_row, this.hero_col);
      if ((this.hero_row - 1) >= 0 && this.map[index] === this.white) {
        this.hero_row--;
        return this.update();
      } else {
        return alert("Can't move north");
      }
    };

    Maze.prototype.move_hero_south = function() {
      var index;
      index = this.index(this.hero_row, this.hero_col);
      if ((this.hero_row + 1) < this.num_rows && this.map[index] === this.white) {
        this.hero_row++;
        return this.update();
      } else {
        return alert("Can't move south");
      }
    };

    return Maze;

  })();

  window.display_maze = function(page) {
    var goal_image, goal_source, hero_image, hero_source, maze_map, setting_image, setting_source;
    window.maze = new Maze("#mazebuilder", 5, 5, false);
    window.maze_canvas = maze.create();
    if ($("#setting_piece" != null)) {
      setting_source = $("#setting_piece");
      setting_image = new Image();
      setting_image.src = setting_source.attr("src");
      setting_image.width = setting_source.attr("width");
      setting_image.height = setting_source.attr("height");
      window.maze.setting(setting_image);
    }
    if ($("#goal_piece" != null)) {
      goal_source = $("#goal_piece");
      goal_image = new Image();
      goal_image.src = goal_source.attr("src");
      goal_image.width = goal_source.attr("width");
      goal_image.height = goal_source.attr("height");
      window.maze.goal(goal_image);
    }
    if ($("#hero_piece" != null)) {
      hero_source = $("#hero_piece");
      hero_image = new Image();
      hero_image.src = hero_source.attr("src");
      hero_image.width = hero_source.attr("width");
      hero_image.height = hero_source.attr("height");
      window.maze.hero(hero_image);
    }
    if (page !== "/step3") {
      maze_map = $("#maze_map");
      maze_map.val("[" + maze.map + "]");
    }
    maze_canvas.on("click", function(event) {
      maze.toggle_cell(event);
      return maze_map.val("[" + maze.map + "]");
    });
    return maze;
  };

  window.submit_form = function(form_id, path) {
    if (path !== "null") {
      $(form_id).attr("action", path);
      return $(form_id).submit();
    }
  };

  window.reset_game = function(form_id, path) {
    var reset_value;
    if (path !== "null") {
      $(form_id).attr("action", path);
      reset_value = $("<input>");
      reset_value.attr("type", "hidden");
      reset_value.attr("name", "reset");
      reset_value.attr("value", "1");
      $(form_id).append(reset_value);
      return $(form_id).submit();
    }
  };

  window.select = function(container_id, id) {
    var container, image, option_id, save_setting, selected_image, selection;
    $(container_id + " .list-group-item").removeClass("active");
    option_id = container_id + id;
    container = $(option_id);
    container.addClass("active");
    image = container_id + id + " img";
    selected_image = $(image).attr('src');
    switch (container_id) {
      case "#settings":
        selection = $("#chosen_setting");
        save_setting = $("#maze_setting");
        break;
      case "#heroes":
        selection = $("#chosen_hero");
        save_setting = $("#maze_hero");
        break;
      case "#goals":
        selection = $("#chosen_goal");
        save_setting = $("#maze_goal");
    }
    selection.attr('src', selected_image);
    return save_setting.val(id);
  };

  window.save_coordinates = function(event, ui) {
    var col, maze_rect, row, x, y;
    maze_rect = $("#mazebuilder canvas")[0].getBoundingClientRect();
    x = event.clientX - maze_rect.left;
    y = event.clientY - maze_rect.top;
    col = Math.floor(x / 75);
    row = Math.floor(y / 75);
    if (event.toElement.classList.contains("goal")) {
      return $("#maze_end").val("[" + row + "," + col + "]");
    } else {
      return $("#maze_start").val("[" + row + "," + col + "]");
    }
  };

  window.init = function(page) {
    var blockly_panel, map;
    switch (page) {
      case "/step2":
        $(function() {
          $('[data-toggle="tooltip"]').tooltip();
          return $('#hero_piece').tooltip('show');
        });
    }
    switch (page) {
      case "/step2":
      case "/step3":
        window.maze = display_maze(page);
    }
    switch (page) {
      case "/step2":
        window.maze.canvas.droppable({
          accept: ".maze_piece",
          drop: function(event, ui) {
            return window.save_coordinates(event, ui);
          }
        });
        $('#hero_piece').draggable({
          stack: "#mazebuilder",
          revert: "invalid",
          helper: "clone",
          appendTo: "#mazebuilder",
          scroll: true,
          stop: function(event, ui) {
            var clone;
            clone = $(ui.helper).clone()[0];
            $(ui.helper).clone(true).removeClass('hero ui-draggable ui-draggable-dragging').addClass('hero-clone').css('top', clone.style.top).css('left', clone.style.left).appendTo('#mazebuilder').draggable({});
            return $("#goal_piece").tooltip('show');
          }
        });
        $('#goal_piece').draggable({
          stack: "#mazebuilder",
          revert: "invalid",
          helper: "clone",
          appendTo: "#mazebuilder",
          scroll: true,
          stop: function(event, ui) {
            var clone;
            clone = $(ui.helper).clone()[0];
            return $(ui.helper).clone(true).removeClass('goal ui-draggable ui-draggable-dragging').addClass('goal-clone').css('top', clone.style.top).css('left', clone.style.left).appendTo('#mazebuilder').draggable({});
          }
        });
        return display_maze_maps("#mazebuilder_maps");
      case "/step3":
        console.log("/step3");
        map = $("#maze_map").val();
        window.maze.load_map(map);
        window.maze.place_hero('#maze_start');
        window.maze.place_goal('#maze_end');
        window.maze.update();
        return blockly_panel = new BlocklyPanel("#blockly", "#mazebuilder");
    }
  };

}).call(this);
