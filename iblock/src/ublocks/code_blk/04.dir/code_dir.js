import Blockly from "blockly";
import 'blockly/python';

export var code_blk_dir = 
`<category name="dir" colour="%{BKY_VARIABLES_HUE}">
  <block type='04.dir/01.train.xml'></block>
  <block type='04.dir/02.det.xml'></block>
  <block type='04.dir/03.drv.xml'></block>
</category>`


//<<1
Blockly.Blocks['04.dir/01.train.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('01.train.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['04.dir/01.train.xml'] = function(block) {
  // TODO: Assemble Python into code variable.

var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<2
Blockly.Blocks['04.dir/02.det.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('02.det.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['04.dir/02.det.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>

//<<3
Blockly.Blocks['04.dir/03.drv.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('03.drv.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['04.dir/03.drv.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


