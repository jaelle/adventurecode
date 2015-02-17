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

  var code = 'setTitle("' + value_title + '");\n';
  code += 'setMainCharacter("' + value_maincharacter + '");\n';
  code += 'setSetting("' + value_setting + '");\n';
  code += 'setGoal("' + value_goal + '");\n';
  return code;
};



Blockly.JavaScript['mazebuilder_title'] = function(block) {
  var text_title = block.getFieldValue('title');
  // TODO: Assemble JavaScript into code variable.
  var code = text_title;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['maincharacter_dog'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'dog';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['setting_cornfield'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'cornfield';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['goal_dogbowl'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'dogbowl';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

function setTitle(title)
{
  $("#maze_title").val(title);
};

function setMainCharacter(maincharacter)
{
  var maincharacter_id;

  switch(maincharacter) {
    case "dog":
      maincharacter_id = 1;
      break;
    default:
      maincharacter_id = 0;
  }

  console.log(maincharacter_id)
  $("#maze_main_character_id").val(maincharacter_id);
};

function setSetting(setting)
{
  var setting_id;

  switch(setting) {
    case "cornfield":
      setting_id = 1;
      break;
    default:
      setting_id = 0;
  }

  $("#maze_setting_id").val(setting_id);
};

function setGoal(goal)
{
  var goal_id;

  switch(goal) {
    case "dogbowl":
      goal_id = 1;
      break;
    default:
      goal_id = 0;
  }

  $("#maze_goal_id").val(goal_id);
};
