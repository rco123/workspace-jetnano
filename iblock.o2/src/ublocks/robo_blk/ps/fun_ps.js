import Blockly from "blockly";
import 'blockly/python';

export var fun_ps_xml = 
`<category name="PS" colour="%{BKY_VARIABLES_HUE}">
    <block type="fun_ps_import"></block>
    <block type="fun_ps"></block>
    
    <block type="fun_ps_set_addr"></block>
    <block type="fun_ps_connect"></block>
    
    <block type="fun_ps_read_angle"></block>
    <block type="fun_ps_read_speed"></block> 
    <block type="fun_ps_check_event"></block>
    <block type="fun_ps_read_key"></block> 
    <block type="fun_ps_call_time"></block>
    <block type="fun_ps_check_end_time"></block>
    <block type="fun_ps_reset_end_time"></block>

</category>`


Blockly.Blocks['fun_ps_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('from ps_control.ps import ps_control');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ps_import'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'from ps_control.ps import ps_control'
  var code = strout + '\n';
  return code;
};


Blockly.Blocks['fun_ps'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ps = ps_control( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ps'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'ps = ps_control()'
  var code = strout + '\n';
  return code;
};

//<<<

Blockly.Blocks['fun_ps_connect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ps.connect( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ps_connect'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'ps.connect( )'
  var code = strout + '\n';
  return code;
};
//>>>










Blockly.Blocks['fun_ps_read_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ps.read_angle( )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ps_read_angle'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'ps.read_angle()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Blocks['fun_ps_read_speed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ps.read_speed( )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ps_read_speed'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'ps.read_speed()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['fun_ps_check_event'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ps.check_event(  )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ps_check_event'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'ps.check_event()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['fun_ps_read_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ps.read_key(  )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ps_read_key'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'ps.read_key()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Blocks['fun_ps_delay'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("ps.delay(");
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
Blockly.Python['fun_ps_delay'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var strout = 'ps.delay(' + value_name + ')';
  var code =  strout + '\n';
  return code;
};


//<<<
Blockly.Blocks['fun_ps_set_addr'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("ps.set_addr(");
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
Blockly.Python['fun_ps_set_addr'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var strout = 'ps.set_addr(' + value_name + ')';
  var code =  strout + '\n';
  return code;
};
//>>>


//<<---
Blockly.Blocks['fun_ps_call_time'] = {
  init: function() {
      this.setOutput(true,null)
      this.setInputsInline(true);

      this.appendValueInput("NAME")
          .setCheck("Number")
          .appendField("ps.call_time(");
      this.appendDummyInput()
          .appendField(")");

      
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Python['fun_ps_call_time'] = function(block) {
var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
// TODO: Assemble Python into code variable.
var strout = 'ps.call_time(' + value_name + ')';
var code =  strout;
return [code, Blockly.Python.ORDER_NONE];
};

//-->>

//<<---
Blockly.Blocks['fun_ps_check_end_time'] = {
  init: function() {
      this.setOutput(true,null)
      this.setInputsInline(true);

      this.appendValueInput("NAME")
          .setCheck("Number")
          .appendField("ps.check_end_time(");
      this.appendDummyInput()
          .appendField(")");
      
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Python['fun_ps_check_end_time'] = function(block) {
var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
// TODO: Assemble Python into code variable.
var strout = 'ps.check_end_time(' + value_name + ')';
var code =  strout;
return [code, Blockly.Python.ORDER_NONE];
};
//-->>


//<<---
Blockly.Blocks['fun_ps_reset_end_time'] = {
  init: function() {
      this.setInputsInline(true);

      this.setNextStatement(true,null)
      this.setPreviousStatement(true,null)
          
      this.appendDummyInput()
          .appendField("ps.reset_end_time( )");
      
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Python['fun_ps_reset_end_time'] = function(block) {
var strout = 'ps.reset_end_time( )';
var code =  strout + '\n';
return code;
};
//-->>

