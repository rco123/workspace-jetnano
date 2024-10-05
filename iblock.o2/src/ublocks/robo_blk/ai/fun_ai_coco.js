import Blockly from "blockly";
import 'blockly/python';  

//<<
Blockly.Blocks['fun_ai_obj_det_coco_load_model'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.obj_det_coco.load_model(");
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

Blockly.Python['fun_ai_obj_det_coco_load_model'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.obj_det_coco.load_model(' + value_name + ')\n';
  var code = strout;
  return code;

};
//>>


//<<
Blockly.Blocks['fun_ai_obj_det_coco_det'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("ai.obj_det_coco.det(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_det'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.obj_det_coco.det(' + value_name + ')';
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>


//<<
Blockly.Blocks['fun_ai_obj_det_coco_box_img'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.obj_det_coco.box_img()");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_obj_det_coco_box_img'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.obj_det_coco.box_img()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>

//<<
Blockly.Blocks['fun_ai_obj_det_coco_get_class'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.obj_det_coco.get_class()");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_obj_det_coco_get_class'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.obj_det_coco.get_class()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>

//<<
Blockly.Blocks['fun_ai_obj_det_coco_get_confi'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.obj_det_coco.get_confi()");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_obj_det_coco_get_confi'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.obj_det_coco.get_confi()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>



//sgkim
//<<
Blockly.Blocks['fun_ai_obj_det_coco_dis_class_to_label'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ai.obj_det_coco.dis_class_to_label( )");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_dis_class_to_label'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'ai.obj_det_coco.dis_class_to_label( )'
  var code = strout + '\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_ai_obj_det_coco_class_to_label'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("ai.obj_det_coco.class_to_label(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_class_to_label'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.obj_det_coco.class_to_label(' + value_name + ')';
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>

//<<
Blockly.Blocks['fun_ai_obj_det_coco_get_info'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.obj_det_coco.get_info( )");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_get_info'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.obj_det_coco.get_info( )';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>

//<<
Blockly.Blocks['fun_ai_obj_det_coco_get_xy'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.obj_det_coco.get_xy( )");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_get_xy'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.obj_det_coco.get_xy( )';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>

//<<
Blockly.Blocks['fun_ai_obj_det_coco_get_crop_img'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.obj_det_coco.get_crop_img( )");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_get_crop_img'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.obj_det_coco.get_crop_img( )';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>


//<<
Blockly.Blocks['fun_ai_obj_det_coco_train_graph'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ai.obj_det_coco.train_graph( )");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_train_graph'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'ai.obj_det_coco.train_graph( )'
  var code = strout + '\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_ai_obj_det_coco_set_opt'] = {
  init: function() {
    this.appendValueInput("opt")
        .setCheck("Number")
        .appendField("ai.obj_det_coco.set_opt(");
    this.appendDummyInput()
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_set_opt'] = function(block) {
  var value = Blockly.Python.valueToCode(block, 'opt', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.obj_det_coco.set_opt(' + value + ')'
  // TODO: Assemble Python into code variable.
  var code = strout + '\n';
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.Python.ORDER_NONE];
  return code
};
//>>


//<<
Blockly.Blocks['fun_ai_obj_det_coco_get_labels'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.obj_det_coco.get_labels( )");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_get_labels'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.obj_det_coco.get_labels( )';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>


//<<
Blockly.Blocks['fun_ai_obj_det_coco_get_this_class_no'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("ai.obj_det_coco.get_this_class_no(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_get_this_class_no'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.obj_det_coco.get_this_class_no(' + value_name + ')';
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>


//<<
Blockly.Blocks['fun_ai_obj_det_coco_get_det_list'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.obj_det_coco.get_det_list( )");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_get_det_list'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.obj_det_coco.get_det_list( )';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>


//<<
Blockly.Blocks['fun_ai_obj_det_coco_get_det_no'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.obj_det_coco.get_det_no( )");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_obj_det_coco_get_det_no'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.obj_det_coco.get_det_no( )';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>

//<<
Blockly.Blocks['fun_ai_obj_det_coco_reg_nclass_name'] = {
  init: function() {
    this.appendValueInput("Name")
        .setCheck("String")
        .appendField("ai.obj_det_coco.reg_nclass_name(");
    this.appendDummyInput()
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_obj_det_coco_reg_nclass_name'] = function(block) {
  var value = Blockly.Python.valueToCode(block, 'Name', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.obj_det_coco.reg_nclass_name(' + value + ')'
  // TODO: Assemble Python into code variable.
  var code = strout + '\n';
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.Python.ORDER_NONE];
  return code
};

//>>


