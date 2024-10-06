import Blockly from "blockly";
import 'blockly/python';  

export var code_blk_lane =
`<category name="LANE" colour="%{BKY_VARIABLES_HUE}">
  <block type='03.lane/01.data.xml'></block>
  <block type='03.lane/02.train.xml'></block>
  <block type='03.lane/03.det.xml'></block>
  <block type='03.lane/04.drv.xml'></block>
</category>`

//<<1
Blockly.Blocks['03.lane/01.data.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('01.data.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['03.lane/01.data.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<2
Blockly.Blocks['03.lane/02.train.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('02.train.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['03.lane/02.train.xml'] = function(block) {
  // TODO: Assemble Python into code variable.

var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<3
Blockly.Blocks['03.lane/03.det.xml'] = {
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
Blockly.Python['03.lane/03.det.xml'] = function(block) {
  // TODO: Assemble Python into code variable.

var strout ="";
  var code = strout + '\n';
  return code;
};
//>>

//<<4
Blockly.Blocks['03.lane/04.drv.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('04.drv.xml');

    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['03.lane/04.drv.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
var code = strout + '\n';
  return code;
};
//>>

