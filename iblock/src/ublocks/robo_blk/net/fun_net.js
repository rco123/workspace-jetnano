import Blockly from "blockly";
import 'blockly/python';

export var fun_net_xml = 
`<category name="NET" colour="%{BKY_VARIABLES_HUE}">
    <block type="fun_net_import"></block>
    <block type="fun_net"></block>
    <block type="fun_net_read_angle"></block>
    <block type="fun_net_read_speed"></block> 
    <block type="fun_net_check_event"></block>
    <block type="fun_net_read_key"></block> 
    <block type="fun_net_call_time"></block>

    <block type="fun_net_check_end_time"></block>
    
    <block type="fun_net_reset_end_time"></block>
    
</category>`


Blockly.Blocks['fun_net_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('from net_control.net import net_control');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_net_import'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'from net_control.net import net_control'
  var code = strout + '\n';
  return code;
};

Blockly.Blocks['fun_net'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("net = net_control( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_net'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'net = net_control()'
  var code = strout + '\n';
  return code;
};

Blockly.Blocks['fun_net_read_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("net.read_angle( )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_net_read_angle'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'net.read_angle()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Blocks['fun_net_read_speed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("net.read_speed( )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_net_read_speed'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'net.read_speed()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['fun_net_check_event'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("net.check_event(  )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_net_check_event'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'net.check_event()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['fun_net_read_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("net.read_key(  )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_net_read_key'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'net.read_key()'
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

//<<---
Blockly.Blocks['fun_net_call_time'] = {
    init: function() {
        this.setOutput(true,null)
        this.setInputsInline(true);

        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField("net.call_time(");
        this.appendDummyInput()
            .appendField(")");

        
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['fun_net_call_time'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var strout = 'net.call_time(' + value_name + ')';
  var code =  strout;
  return [code, Blockly.Python.ORDER_NONE];
};

//-->>

//<<---
Blockly.Blocks['fun_net_check_end_time'] = {
    init: function() {
        this.setOutput(true,null)
        this.setInputsInline(true);

        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField("net.check_end_time(");
        this.appendDummyInput()
            .appendField(")");
        
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['fun_net_check_end_time'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var strout = 'net.check_end_time(' + value_name + ')';
  var code =  strout;
  return [code, Blockly.Python.ORDER_NONE];
};
//-->>


//<<---
Blockly.Blocks['fun_net_reset_end_time'] = {
    init: function() {
        this.setInputsInline(true);

        this.setNextStatement(true,null)
        this.setPreviousStatement(true,null)
            
        this.appendDummyInput()
            .appendField("net.reset_end_time( )");
        
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['fun_net_reset_end_time'] = function(block) {
  var strout = 'net.reset_end_time( )';
  var code =  strout + '\n';
  return code;
};
//-->>










