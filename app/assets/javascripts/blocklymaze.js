
Blockly.JavaScript['move_west'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'moveWest();\n';
  return code;
};


Blockly.JavaScript['move_north'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'moveNorth();\n';
  return code;
};


Blockly.JavaScript['move_east'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'moveEast();\n';
  return code;
};


Blockly.JavaScript['move_south'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'moveSouth();\n';
  return code;
};

Blockly.JavaScript['loop_forever'] = function(block) {
  var statements_loop = Blockly.JavaScript.statementToCode(block, 'loop');
  // TODO: Assemble JavaScript into code variable.
  var code = 'while {\n' + statements_loop + '\n}';
  return code;
};

Blockly.JavaScript['loop_n_times'] = function(block) {
  var statements_loop = Blockly.JavaScript.statementToCode(block, 'loop');
  var n = block.getFieldValue('n');
  // TODO: Assemble JavaScript into code variable.
  var code = 'for (var i=0;i<' + n + ';i++) {\n';
  code += statements_loop;
  code += '\n}';

  return code;
};

function moveNorth()
{
  setTimeout(function() {
    myMazeLayout.move("north");
  },500);
}
function moveEast()
{
  setTimeout(function() {
    myMazeLayout.move("east");
  },500)

}
function moveSouth()
{
  myMazeLayout.move("south");

}
function moveWest()
{
  myMazeLayout.move("west");

}