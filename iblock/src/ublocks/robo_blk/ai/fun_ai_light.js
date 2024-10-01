import Blockly from "blockly";
import 'blockly/python';  

//<<
Blockly.Blocks['fun_ai_traffic_light_det_load_model'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.traffic_light_det.load_model(");
    this.appendValueInput("NAME")
        .setCheck("String");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl(""); 
  }
};

Blockly.Python['fun_ai_traffic_light_det_load_model'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.traffic_light_det.load_model(' + value_name + ')\n';
  var code = strout;
  return code;

};
//>>


//<<
Blockly.Blocks['fun_ai_traffic_light_det_det'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("ai.traffic_light_det.det(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_traffic_light_det_det'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.traffic_light_det.det(' + value_name + ')';
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>



//<<
Blockly.Blocks['fun_ai_traffic_light_det_box_img'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.traffic_light_det.box_img()");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_traffic_light_det_box_img'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.traffic_light_det.box_img()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>

//<<
Blockly.Blocks['fun_ai_traffic_light_det_crop_img'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.traffic_light_det.crop_img( )");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_traffic_light_det_crop_img'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.traffic_light_det.crop_img( )';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>



//<<
Blockly.Blocks['fun_ai_traffic_light_det_crop_size'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.traffic_light_det.crop_size( )");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_traffic_light_det_crop_size'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.traffic_light_det.crop_size( )';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>




//<<
Blockly.Blocks['fun_ai_traffic_light_class_load_model'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.traffic_light_class.load_model(");
    this.appendValueInput("NAME")
        .setCheck("String");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_traffic_light_class_load_model'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.traffic_light_class.load_model(' + value_name + ')\n';
  var code = strout;
  return code;

};
//>>

//<<
Blockly.Blocks['fun_ai_traffic_light_class_det'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("ai.traffic_light_class.det(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_traffic_light_class_det'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.traffic_light_class.det(' + value_name + ')';
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>

