
'use strict';

goog.provide('Blockly.Blocks.adventurecode');

goog.require('Blockly.Blocks');

Blockly.Blocks['move_west'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("images/arrow-left.png", 20, 20, "Move West"));
    this.setPreviousStatement(true, "direction");
    this.setNextStatement(true, "direction");
    this.setTooltip('');
  }
};

Blockly.Blocks['move_north'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("images/arrow-up.png", 20, 20, "Move North"));
    this.setPreviousStatement(true, "direction");
    this.setNextStatement(true, "direction");
    this.setTooltip('');
  }
};

Blockly.Blocks['move_east'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("images/arrow-right.png", 20, 20, "Move West"));
    this.setPreviousStatement(true, "direction");
    this.setNextStatement(true, "direction");
    this.setTooltip('');
  }
};

Blockly.Blocks['move_south'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("images/arrow-down.png", 20, 20, "Move South"));
    this.setPreviousStatement(true, "direction");
    this.setNextStatement(true, "direction");
    this.setTooltip('');
  }
};

Blockly.Blocks['loop_n_times'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(160);
    this.appendStatementInput("loop")
        .appendField(new Blockly.FieldImage("images/arrow-repeat.png", 35, 20, "*"));
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("2"), "n")
        .appendField("times");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['loop_forever'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(160);
    this.appendStatementInput("loop")
        .appendField(new Blockly.FieldImage("images/arrow-repeat.png", 45, 30, "Loop Forever"));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

