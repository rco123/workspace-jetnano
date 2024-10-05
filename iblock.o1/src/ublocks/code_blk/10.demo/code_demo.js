import Blockly from "blockly";
import 'blockly/python';

export var code_blk_demo = 
`<category name="demo" colour="%{BKY_VARIABLES_HUE}">
  <block type='10.demo/01.run_a.xml'></block>
  <block type='10.demo/02.run_b.xml'></block>
  <block type='10.demo/03.run_c.xml'></block>
</category>`

//<<1
Blockly.Blocks['10.demo/01.run_a.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('01.run_a.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['10.demo/01.run_a.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>

//<<2
Blockly.Blocks['10.demo/02.run_b.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('02.run_b.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['10.deom/02.run_b.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>

//<<3
Blockly.Blocks['10.demo/03.run_c.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('03.run_c.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['10.demo/03.run_c.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>

