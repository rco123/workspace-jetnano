import Blockly from "blockly";
import 'blockly/python';  

//<<
Blockly.Blocks['fun_ai_mark_det_load_model'] = {
  init: function() {
    this.appendValueInput("file")
        .setCheck("String")
        .appendField("ai.mark_det.load_model(");
    this.appendDummyInput()
        .appendField(")");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_mark_det_load_model'] = function(block) {
  var value_file = Blockly.Python.valueToCode(block, 'file', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.mark_det.load_model(' + value_file + ')\n'
  // TODO: Assemble Python into code variable.
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.Python.ORDER_NONE];
  return code
};
//>>


//<<
Blockly.Blocks['fun_ai_mark_det_det'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("ai.mark_det.det(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_mark_det_det'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.mark_det.det(' + value_name + ')';
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>


//<<
Blockly.Blocks['fun_ai_mark_det_get_class'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.mark_det.get_class( )");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_mark_det_get_class'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.mark_det.get_class( )';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>



//<<
Blockly.Blocks['fun_ai_mark_det_get_confi'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ai.mark_det.get_confi( )");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_mark_det_get_confi'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai.mark_det.get_confi( )';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>

