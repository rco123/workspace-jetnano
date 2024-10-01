
var code_blk_xy = 
`<category name="xy" colour="%{BKY_VARIABLES_HUE}">
  <block type='08.xy/01.xy.xml'></block>
</category>`

//<<1
Blockly.Blocks['08.xy/01.xy.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('01.xy.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['08.xy/01.xy.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


