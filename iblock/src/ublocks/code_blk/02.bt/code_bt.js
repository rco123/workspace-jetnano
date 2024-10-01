import Blockly from "blockly";
import 'blockly/python';

export var code_blk_bt =
`<category name="bt" colour="%{BKY_VARIABLES_HUE}">
  <block type='02.bt/01.bt_move.xml'></block>
  <block type='02.bt/02.bt_imgs.xml'></block>
  <block type='02.bt/03.ps_conn.xml'></block>
  <block type='02.bt/04.ps_move.xml'></block>
  <block type='02.bt/05.ps_imgs.xml'></block>
  <block type='02.bt/06.ps_imgs.xml'></block>
</category>`

//<<1
Blockly.Blocks['02.bt/01.bt_move.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('01.bt_move.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['02.bt/01.bt_move.xml'] = function(block) {
  // TODO: Assemble Python into code variable.

var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<2
Blockly.Blocks['02.bt/02.bt_imgs.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('02.bt_imgs.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['02.bt/02.bt_imgs.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<3
Blockly.Blocks['02.bt/03.ps_conn.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('03.ps_conn.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['02.bt/03.ps_conn.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<4
Blockly.Blocks['02.bt/04.ps_move.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('04.ps_move.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['02.bt/04.ps_move.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<4
Blockly.Blocks['02.bt/05.ps_imgs.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('05.ps_imgs.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['02.bt/05.ps_imgs.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<4
Blockly.Blocks['02.bt/06.ps_imgs.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('06.ps_imgs.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['02.bt/06.ps_imgs.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>
