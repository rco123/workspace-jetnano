import Blockly from "blockly";
import 'blockly/python';  // Blockly.Python을 초기화하는 모듈을 가져옵니다.

export var code_blk_robo = 
`<category name="robo" colour="%{BKY_VARIABLES_HUE}">
    <block type='01.robo/01.disp.xml'></block>
    <block type='01.robo/02.move.xml'></block>
    <block type='01.robo/03.led.xml'></block>
    <block type='01.robo/04.dist.xml'></block>
</category>`

//<<1
Blockly.Blocks['01.robo/01.disp.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('01.disp.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['01.robo/01.disp.xml'] = function(block) {
  // TODO: Assemble Python into code variable.

var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<2
Blockly.Blocks['01.robo/02.move.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('02.move.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['01.robo/02.move.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<3
Blockly.Blocks['01.robo/03.led.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('03.깜빡이');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['01.robo/03.led.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>

//<<4
Blockly.Blocks['01.robo/04.dist.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('04.dist.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['01.robo/04.dist.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


