import Blockly from "blockly";
import 'blockly/python';

const colorVal = "#5050FF"

// Function Name
export var fun_train_xml =
`<category name="TRAIN" colour="${colorVal}">

    <block type="fun_train_import"></block>
    <block type="fun_train_control"></block>
    <block type="fun_train_lane"></block>
    <block type="fun_train_mark"></block>

</category>`


//<
Blockly.Blocks['fun_train_import'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("from train import train_control");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(colorVal);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_train_import'] = function(block) {
    // TODO: Assemble Python into code variable.
    var strout = 'from train import train_control'
    var code =  strout + '\n';
    return code;
};
//>


//<
Blockly.Blocks['fun_train_control'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("train = train_control( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_train_control'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'train = train_control()'
  var code =  strout + '\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_train_lane'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("train.lane(epoch=");
    this.appendDummyInput()
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_train_lane'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "train.lane(" + value_name + ")\n";
  return code;
};
//>

//<
Blockly.Blocks['fun_train_mark'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("train.mark(epoch=");
    this.appendDummyInput()
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_train_mark'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "train.mark(" + value_name + ")\n";
  return code;
};
//>


