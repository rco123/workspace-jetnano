import Blockly from "blockly";
import 'blockly/python';

import roboImage from '../../../images/ccc.png';

const colorVal = "#2ce12c"
// Function Name
export var fun_lane_xml =
`<category name="도로" colour="${colorVal}">

    <block type="fun_lane_import"></block>
    <block type="fun_lane_control"></block>

    <block type="fun_lane_load_model"></block>
    <block type="fun_lane_det"></block>
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
Blockly.Blocks['fun_lane_import'] = {
    init: function() {
      appendRoboImage(this);
    
      this.appendDummyInput()
          .appendField("도로컨트롤박스가져오기");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(colorVal);
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
    appendRoboImage(this);
    this.appendDummyInput()
        .appendField("도로생성");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
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
    appendRoboImage(this);
    this.appendDummyInput()
        .appendField("도로.학습모델불러오기( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
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
    appendRoboImage(this);
    this.appendValueInput("NAME")
        .appendField("도로.감지(이미지=");
    this.appendDummyInput()
        .appendField(")");
    
        this.setInputsInline(true);
    this.setOutput(true, null);
        
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_lane_det'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "ailane.det(" + value_name + ")";
  return [code, Blockly.Python.ORDER_NONE];
  
};
//>
