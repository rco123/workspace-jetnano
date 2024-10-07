import Blockly from "blockly";
import 'blockly/python';

import roboImage from '../../../images/bbb.png';

let colorVal = "#ffc251"
// Function Name
export var fun_mark_xml =
`<category name="마크" colour="${colorVal}">

    <block type="fun_mark_import"></block>
    <block type="fun_mark_control"></block>

    <block type="fun_mark_load_model"></block>
    <block type="fun_mark_det"></block>
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
Blockly.Blocks['fun_mark_import'] = {
    init: function() {
      appendRoboImage(this);  // 함수 호출로 이미지 추가
      this.appendDummyInput()
          .appendField("마크컨트롤박스가져오기");
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
    appendRoboImage(this);
    this.appendDummyInput()
        .appendField("마커생성");
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
    appendRoboImage(this);
    this.appendDummyInput()
        .appendField("마크.학습모델불러오기( )");
    this.setInputsInline(true);
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
    appendRoboImage(this);
    this.appendValueInput("NAME")
        .appendField("마크.감지(이미지=");
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


