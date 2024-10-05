
var code_blk_mnist = 
`<category name="mnist" colour="%{BKY_VARIABLES_HUE}">
  <block type='09.mnist/01.data.xml'></block>
  <block type='09.mnist/02.train.xml'></block>
  <block type='09.mnist/03.check.xml'></block>
  <block type='09.mnist/04.infer.xml'></block>
</category>`

//<<1
Blockly.Blocks['09.mnist/01.data.xml'] = {
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
Blockly.Python['09.mnist/01.data.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<2
Blockly.Blocks['09.mnist/02.train.xml'] = {
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
Blockly.Python['09.mnist/02.train.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<3
Blockly.Blocks['09.mnist/03.check.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('03.check.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['09.mnist/03.check.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


//<<4
Blockly.Blocks['09.mnist/04.infer.xml'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('04.infer.xml');
    
    //this.setInputsInline(true);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

 this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['09.mnist/04.infer.xml'] = function(block) {
  // TODO: Assemble Python into code variable.
var strout ="";
  var code = strout + '\n';
  return code;
};
//>>


