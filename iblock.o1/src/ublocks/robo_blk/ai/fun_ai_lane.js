import Blockly from "blockly";
import 'blockly/python';  

//sgkim
Blockly.Blocks['fun_ai_lane_det_r18_load_model'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ai.lane_det_r18_")
        .appendField(new Blockly.FieldDropdown([["s","s"], ["l","l"], ["r","r"], ["x","x"]]), "dir")
        .appendField(".load_model(");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(")");
    this.setColour(230);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_lane_det_r18_load_model'] = function(block) {
  var dropdown_name = block.getFieldValue('dir');
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  let strout = 'ai.lane_det_r18_'+dropdown_name+'.load_model(' + value_name + ')\n'
  var code = strout;
  return code;
};


//<<
Blockly.Blocks['fun_ai_lane_det_r18_img_to_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ai.lane_det_r18_")
        .appendField(new Blockly.FieldDropdown([["s","s"], ["l","l"], ["r","r"], ["x","x"]]), "dir")
        .appendField(".img_to_angle(");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(")");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_lane_det_r18_img_to_angle'] = function(block) {
  // TODO: Assemble Python into code variable.
  var dropdown_name = block.getFieldValue('dir');
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.lane_det_r18_' + dropdown_name + '.img_to_angle(' + value_name + ')';
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>



//<<
// Blockly.Blocks['fun_ai_lane_det_cv2_img_to_angle'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("ai.lane_det_cv2_")
//         .appendField(new Blockly.FieldDropdown([["s","s"], ["l","l"], ["r","r"]]), "dir")
//         .appendField(".img_to_angle(");
//     this.appendValueInput("NAME")
//         .setCheck(null);
//     this.appendDummyInput()
//         .appendField(")");
//     this.setOutput(true, null);
//     this.setColour(230);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };

// Blockly.Python['fun_ai_lane_det_cv2_img_to_angle'] = function(block) {
//   // TODO: Assemble Python into code variable.
//   var dropdown_name = block.getFieldValue('dir');
//   var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
//   let strout = 'ai.lane_det_cv2_' + dropdown_name + '.img_to_angle(' + value_name + ')';
//   var code = strout;
//   // TODO: Change ORDER_NONE to the correct strength.
//   return [code, Blockly.Python.ORDER_NONE];
// };
//>>


//<<
Blockly.Blocks['fun_ai_lane_det_cv2_img_to_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ai.lane_det_cv2.img_to_angle_")
        .appendField(new Blockly.FieldDropdown([["s","s"], ["l","l"], ["r","r"]]), "dir")
        .appendField("(");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(")");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_ai_lane_det_cv2_img_to_angle'] = function(block) {
  // TODO: Assemble Python into code variable.
  var dropdown_name = block.getFieldValue('dir');
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  let strout = 'ai.lane_det_cv2.img_to_angle_' + dropdown_name + '(' + value_name + ')';
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>












