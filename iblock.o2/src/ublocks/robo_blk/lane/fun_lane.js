import Blockly from "blockly";
import 'blockly/python';

// Function Name
export var fun_lane_xml =
`<category name="LANE" colour="%{BKY_VARIABLES_HUE}">

    <block type="fun_lane_import"></block>
    <block type="fun_lane_control"></block>

    <block type="fun_lane_load_model"></block>
    <block type="fun_lane_det"></block>
</category>`


//<
Blockly.Blocks['fun_lane_import'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("from lane import lane_control");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_lane_import'] = function(block) {
    // TODO: Assemble Python into code variable.
    var strout = 'from lane import lane_control'
    var code =  strout + '\n';
    return code;
};
//>


//<
Blockly.Blocks['fun_lane_control'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ailane = lane_control( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_lane_control'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'ailane = lane_control()'
  var code =  strout + '\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_lane_load_model'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ailane.load_model( )");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_lane_load_model'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = "ailane.load_model( )\n";
  return code;
};
//>


//<
Blockly.Blocks['fun_lane_det'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("ailane.det(epoch=");
    this.appendDummyInput()
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_lane_det'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "ailane.det(" + value_name + ")\n";
  return code;
};
//>


