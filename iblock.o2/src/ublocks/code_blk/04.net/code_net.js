import Blockly from "blockly";
import 'blockly/python';

export var code_blk_net = 
`<category name="net" colour="%{BKY_VARIABLES_HUE}">
  <block type='04.net/01.ip.xml'></block>
  <block type='04.net/02.ap.xml'></block>
</category>`


//<<1
Blockly.Blocks['04.net/01.ip.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('01.ip.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['04.net/01.ip.xml'] = function(block) {
  // TODO: Assemble Python into code variable.

var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<2
Blockly.Blocks['04.net/02.ap.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('02.ap.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['04.net/02.ap.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>
