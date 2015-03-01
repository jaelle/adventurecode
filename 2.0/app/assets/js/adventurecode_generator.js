'use strict';

goog.provide('Blockly.JavaScript.adventurecode');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['move_west'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'move_west();\n';
  return code;
};


Blockly.JavaScript['move_north'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'move_north();\n';
  return code;
};


Blockly.JavaScript['move_east'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'move_east();\n';
  return code;
};


Blockly.JavaScript['move_south'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'move_south();\n';
  return code;
};

Blockly.JavaScript['loop_n_times'] = function(block) {
  var statements_loop = Blockly.JavaScript.statementToCode(block, 'loop');
  var n = block.getFieldValue('n');
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  
  for (var i=0;i<n;i++) {
    code += statements_loop + '\n';
  }

  return code;
};