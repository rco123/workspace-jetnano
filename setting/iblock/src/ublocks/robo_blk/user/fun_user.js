import Blockly from "blockly";
import 'blockly/python';

const colorVal = 230

export var fun_user_xml = 
`<category name="USER" colour="${colorVal}">
  <block type="fun_user"> </block>
  <block type="fun_user_input"> </block>
  
  <block type="fun_import_time"> </block>
  <block type="fun_time_time"> </block>

</category>`


Blockly.Blocks['fun_import_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('import time');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_import_time'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'import time'
  var code = strout + '\n';
  return code;
};


Blockly.Blocks['fun_time_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("time.time( )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(colorVal);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_time_time'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'time.time( )';
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Blocks['fun_user'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("user code ")
        .appendField(new Blockly.FieldTextInput("..."), "code");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_user'] = function(block) {
  var text_code = block.getFieldValue('code');
  // TODO: Assemble Python into code variable.
  var strout = text_code;
  var code =  strout + '\n';
  return code;
};


Blockly.Blocks['fun_user_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("user_input")
        .appendField(new Blockly.FieldTextInput("..."), "user_input");
    this.setOutput(true, null);
    this.setColour(colorVal);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_user_input'] = function(block) {
  var text_user_input = block.getFieldValue('user_input');
  // TODO: Assemble Python into code variable.
  let strout = text_user_input;
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};









