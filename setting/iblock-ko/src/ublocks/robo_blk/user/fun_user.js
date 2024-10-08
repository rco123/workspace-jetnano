import Blockly from "blockly";
import 'blockly/python';

import roboImage from '../../../images/fff.png';

const colorVal = 230

export var fun_user_xml = 
`<category name="기타" colour="${colorVal}">
  <block type="fun_user"> </block>
  <block type="fun_user_input"> </block>
  
  <block type="fun_import_time"> </block>
  <block type="fun_time_time"> </block>

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

Blockly.Blocks['fun_import_time'] = {
  init: function() {
        
  appendRoboImage(this);  // 함수 호출로 이미지 추가

    this.appendDummyInput()
        .appendField('시간불러오기');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_import_time'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'import time'
  var code = strout + '\n';
  return code;
};


Blockly.Blocks['fun_time_time'] = {
  init: function() {
    appendRoboImage(this);  // 함수 호출로 이미지 추가
    this.appendDummyInput()
        .appendField("시간.현재시간( )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(colorVal);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_time_time'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'time.time( )';
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Blocks['fun_user'] = {
  init: function() {
    appendRoboImage(this);  // 함수 호출로 이미지 추가
    this.appendDummyInput()
        .appendField("사용자코드 ")
        .appendField(new Blockly.FieldTextInput("..."), "code");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_user'] = function(block) {
  var text_code = block.getFieldValue('code');
  // TODO: Assemble Python into code variable.
  var strout = text_code;
  var code =  strout + '\n';
  return code;
};


Blockly.Blocks['fun_user_input'] = {
  init: function() {
    appendRoboImage(this);  // 함수 호출로 이미지 추가
    this.appendDummyInput()
        .appendField("사용자입력")
        .appendField(new Blockly.FieldTextInput("..."), "user_input");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(colorVal);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_user_input'] = function(block) {
  var text_user_input = block.getFieldValue('user_input');
  // TODO: Assemble Python into code variable.
  let strout = text_user_input;
  var code = strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};









