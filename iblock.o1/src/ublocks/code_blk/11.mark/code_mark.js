import Blockly from "blockly";
import 'blockly/python';

export var code_blk_mark =
`<category name="mark" colour="%{BKY_VARIABLES_HUE}">
  <block type='11.mark/01.train.xml'></block>
  <block type='11.mark/02.det.xml'></block>
</category>`

//<<1
Blockly.Blocks['11.mark/01.train.xml'] = {
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
Blockly.Python['11.mark/01.train.xml'] = function(block) {
  // TODO: Assemble Python into code variable.

var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<2
Blockly.Blocks['11.mark/02.det.xml'] = {
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
Blockly.Python['11.mark/02.det.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>

