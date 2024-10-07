import Blockly from "blockly";
import 'blockly/python';


import roboImage from '../../../images/ddd.png';

const colorVal = "#5050FF"

// Function Name
export var fun_train_xml =
`<category name="학습" colour="${colorVal}">

    <block type="fun_train_import"></block>
    <block type="fun_train_control"></block>
    <block type="fun_train_lane"></block>
    <block type="fun_train_mark"></block>

</category>`


// 이미지 필드를 추가하는 함수 정의
function appendRoboImage(block) {
  block.appendDummyInput()
    .appendField(new Blockly.FieldImage(
      roboImage,
      25,  // 이미지 너비
      25,  // 이미지 높이
      "*"
    ));
}



//<
Blockly.Blocks['fun_train_import'] = {
    init: function() {
      appendRoboImage(this);
    
      this.appendDummyInput()
          .appendField("학습컨트롤박스가져오기");
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
    appendRoboImage(this);
    this.appendDummyInput()
        .appendField("학습생성");
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
    appendRoboImage(this);
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("학습.도로(반복수=");
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
    appendRoboImage(this);
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("학습.마크(반복수=");
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


