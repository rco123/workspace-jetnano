import Blockly from "blockly";
import 'blockly/python';

export var code_blk_sign = 
`<category name="sign" colour="%{BKY_VARIABLES_HUE}">
  <block type='06.sign/01.train_det.xml'></block>
  <block type='06.sign/02.train_class.xml'></block>
  <block type='06.sign/03.det.xml'></block>
  <block type='06.sign/04.class.xml'></block>
  <block type='06.sign/05.drv.xml'></block>
</category>`


//<<
Blockly.Blocks['06.sign/01.train_det.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('01.train_det.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['06.sign/01.train_det.xml'] = function(block) {
  // TODO: Assemble Python into code variable.

var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<2
Blockly.Blocks['06.sign/02.train_class.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('02.train_class.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['06.sign/02.train_class.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<3
Blockly.Blocks['06.sign/03.det.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('03.det.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['06.sign/03.det.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>

//<<4
Blockly.Blocks['06.sign/04.class.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('04.class.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['06.sign/04.class.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<5
Blockly.Blocks['06.sign/05.drv.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('05.drv.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['06.sign/05.drv.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>



