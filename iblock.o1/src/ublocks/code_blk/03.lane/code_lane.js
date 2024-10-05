import Blockly from "blockly";
import 'blockly/python';  

export var code_blk_lane =
`<category name="lane" colour="%{BKY_VARIABLES_HUE}">
  <block type='03.lane/01.bt_imgs.xml'></block>
  <block type='03.lane/01.ps_imgs.xml'></block>
  <block type='03.lane/01.net_imgs.xml'></block>
  <block type='03.lane/02.trainx.xml'></block>
  <block type='03.lane/03.drvx.xml'></block>
  <block type='03.lane/04.drvcv.xml'></block>
</category>`

//<<1
Blockly.Blocks['03.lane/01.bt_imgs.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('01.bt_imgs.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['03.lane/01.bt_imgs.xml'] = function(block) {
  // TODO: Assemble Python into code variable.

var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<1
Blockly.Blocks['03.lane/01.ps_imgs.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('01.ps_imgs.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['03.lane/01.ps_imgs.xml'] = function(block) {
  // TODO: Assemble Python into code variable.

var strout ="";
  var code = strout + '\n';
  return code;
};
//>>

//<<1
Blockly.Blocks['03.lane/01.net_imgs.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('01.net_imgs.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['03.lane/01.net_imgs.xml'] = function(block) {
  // TODO: Assemble Python into code variable.

var strout ="";
  var code = strout + '\n';
  return code;
};
//>>





//<<2
Blockly.Blocks['03.lane/02.trainx.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('02.trainx.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['03.lane/02.trainx.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<3
Blockly.Blocks['03.lane/03.drvx.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('03.drvx.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['03.lane/03.drvx.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<4
Blockly.Blocks['03.lane/04.drvcv.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('04.drvcv.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['03.lane/04.drvcv.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>
