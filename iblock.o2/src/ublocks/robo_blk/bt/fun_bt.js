import Blockly from "blockly";
import 'blockly/python';

export var fun_bt_xml = 
`<category name="BT" colour="%{BKY_VARIABLES_HUE}">
    <block type="fun_bt_import"></block>
    <block type="fun_bt"></block>
    <block type="fun_bt_set_addr"></block>
    <block type="fun_bt_connect"></block>
    <block type="fun_bt_connect_random"></block>
    
    <block type="fun_bt_read_angle"></block>
    <block type="fun_bt_read_speed"></block> 
    <block type="fun_bt_check_event"></block>
    <block type="fun_bt_read_key"></block> 
    <block type="fun_bt_delay"></block>
</category>`


Blockly.Blocks['fun_bt_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('from bt_control.bt import bt_control');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_bt_import'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'from bt_control.bt import bt_control'
  var code = strout + '\n';
  return code;
};


Blockly.Blocks['fun_bt'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("bt = bt_control( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_bt'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'bt = bt_control()'
  var code = strout + '\n';
  return code;
};

//<<<
Blockly.Blocks['fun_bt_connect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("bt.connect( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_bt_connect'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'bt.connect( )'
  var code = strout + '\n';
  return code;
};
//>>>

//<<<
Blockly.Blocks['fun_bt_connect_random'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("bt.connect('random')");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_bt_connect_random'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'bt.connect("random")'
  var code = strout + '\n';
  return code;
};
//>>>


Blockly.Blocks['fun_bt_read_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("bt.read_angle( )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_bt_read_angle'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'bt.read_angle()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Blocks['fun_bt_read_speed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("bt.read_speed( )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_bt_read_speed'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'bt.read_speed()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['fun_bt_check_event'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("bt.check_event(  )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_bt_check_event'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'bt.check_event()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['fun_bt_read_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("bt.read_key(  )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_bt_read_key'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'bt.read_key()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Blocks['fun_bt_delay'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("bt.delay(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_bt_delay'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var strout = 'bt.delay(' + value_name + ')';
  var code =  strout + '\n';
  return code;
};

// <<<
Blockly.Blocks['fun_bt_set_addr'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("bt.set_addr(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_bt_set_addr'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var strout = 'bt.set_addr(' + value_name + ')';
  var code =  strout + '\n';
  return code;
};
// >>>