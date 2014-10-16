//My added blocks
/*Blockly.JavaScript['logic_xor'] = function(block) {
  var bool1 = Blockly.JavaScript.valueToCode(block, 'bool1', Blockly.JavaScript.ORDER_ATOMIC);
  var bool2 = Blockly.JavaScript.valueToCode(block, 'bool2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '((' + bool1 + ' || ' + bool2 + ') && !(' + bool1 + ' && ' + bool2 + '))';
  return [code, Blockly.JavaScript.ORDER_LOGICAL_AND];
};

Blockly.JavaScript['logic_and'] = function(block) {
  var bool1 = Blockly.JavaScript.valueToCode(block, 'bool1', Blockly.JavaScript.ORDER_ATOMIC);
  var bool2 = Blockly.JavaScript.valueToCode(block, 'bool2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = bool1  + ' && ' + bool2;
  return [code, Blockly.JavaScript.ORDER_LOGICAL_AND];
};

Blockly.JavaScript['logic_or'] = function(block) {
  var bool1 = Blockly.JavaScript.valueToCode(block, 'bool1', Blockly.JavaScript.ORDER_ATOMIC);
  var bool2 = Blockly.JavaScript.valueToCode(block, 'bool2', Blockly.JavaScript.ORDER_ATOMIC);
 
  var code = bool1  + ' || ' + bool2;

  return [code, Blockly.JavaScript.ORDER_LOGICAL_OR];
};*/

//Blockly.JavaScript = Object;

Blockly.JavaScript['mazebuilder_settings'] = function(block) {
  var value_title = Blockly.JavaScript.valueToCode(block, 'title', Blockly.JavaScript.ORDER_ATOMIC);
  var value_maincharacter = Blockly.JavaScript.valueToCode(block, 'maincharacter', Blockly.JavaScript.ORDER_ATOMIC);
  var value_setting = Blockly.JavaScript.valueToCode(block, 'setting', Blockly.JavaScript.ORDER_ATOMIC);
  var value_goal = Blockly.JavaScript.valueToCode(block, 'goal', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  return code;
};



Blockly.JavaScript['mazebuilder_title'] = function(block) {
  var text_title = block.getFieldValue('title');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['maincharacter_dog'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['setting_cornfield'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['goal_dogbowl'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

