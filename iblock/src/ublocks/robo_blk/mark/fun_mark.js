import Blockly from "blockly";
import 'blockly/python';

let colorVal = "#ffc251"
// Function Name
export var fun_mark_xml =
`<category name="MARK" colour="${colorVal}">

    <block type="fun_mark_import"></block>
    <block type="fun_mark_control"></block>

    <block type="fun_mark_load_model"></block>
    <block type="fun_mark_det"></block>
</category>`


//<
Blockly.Blocks['fun_mark_import'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("from mark import mark_control");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(colorVal);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_mark_import'] = function(block) {
    // TODO: Assemble Python into code variable.
    var strout = 'from mark import mark_control'
    var code =  strout + '\n';
    return code;
};
//>


//<
Blockly.Blocks['fun_mark_control'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("aimark = mark_control( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_mark_control'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'aimark = mark_control()'
  var code =  strout + '\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_mark_load_model'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("aimark.load_model( )");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_mark_load_model'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = "aimark.load_model( )\n";
  return code;
};
//>


//<
Blockly.Blocks['fun_mark_det'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("aimark.det(img=");
    this.appendDummyInput()
        .appendField(")");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_mark_det'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "aimark.det(" + value_name + ")";
  return [code, Blockly.Python.ORDER_NONE];
};
//>


