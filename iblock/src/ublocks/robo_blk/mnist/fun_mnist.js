// Function Name
var fun_mnist_xml = 
`<category name="MNIST" colour="%{BKY_VARIABLES_HUE}">
   
    <block type="fun_mnist_import"></block>
    <block type="fun_mnist"></block>
    <block type="fun_mnist_load_data"></block>
    <block type="fun_mnist_dis_data"></block>
    <block type="fun_mnist_get_data"></block>
    
    <block type="fun_mnist_new_model"></block>
    <block type="fun_mnist_set_lr"></block>
    <block type="fun_mnist_set_epoch"></block>
    <block type="fun_mnist_set_batch"></block>
    <block type="fun_mnist_train"></block>
    <block type="fun_mnist_save_model"></block>
    
    <block type="fun_mnist_load_model"></block>
    <block type="fun_mnist_read_img"></block>
    <block type="fun_mnist_model"></block>
    
</category>`

//<
Blockly.Blocks['fun_mnist_import'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("from mnist_control.mnist import mnist_control");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_mnist_import'] = function(block) {
    // TODO: Assemble Python into code variable.
    var strout = 'from mnist_control.mnist import mnist_control'
    var code =  strout + '\n';
    return code;
};
//>

//<
Blockly.Blocks['fun_mnist'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mnist = mnsit_control( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'mnist = mnist_control()'
  var code =  strout + '\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_mnist_load_data'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mnist.load_data(  )");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist_load_data'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'mnist.load_data( )'
  var code = strout + '\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_mnist_dis_data'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("mnist.dis_data(");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_mnist_dis_data'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'mnist.dis_data(' + value_name + ')\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_mnist_new_model'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("mnist.new_model(  )");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist_new_model'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'mnist.new_model( )'
  var code = strout;  
  return [code, Blockly.Python.ORDER_NONE];
};
//>


//<
Blockly.Blocks['fun_mnist_set_lr'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("mnist.set_lr(");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist_set_lr'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'mnist.set_lr(' + value_name + ')\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_mnist_set_epoch'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("mnist.set_epoch(");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist_set_epoch'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'mnist.set_epoch(' + value_name + ')\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_mnist_set_batch'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("mnist.set_batch(");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist_set_batch'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'mnist.set_batch(' + value_name + ')\n';
  return code;
};
//>

//<
Blockly.Blocks['fun_mnist_train'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("mnist.train(");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist_train'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'mnist.train(' + value_name + ')\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_mnist_save_model'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("mnist.save_model(");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist_save_model'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'mnist.save_model(' + value_name + ')\n';
  return code;
};
//>


//<<
Blockly.Blocks['fun_mnist_load_model'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("mnist.load_model(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist_load_model'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var strout = 'mnist.load_model(' + value_name + ')';
  var code =  strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>


//<<
Blockly.Blocks['fun_mnist_get_data'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("mnist.get_data(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist_get_data'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var strout = 'mnist.get_data(' + value_name + ')';
  var code =  strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>



//<<
Blockly.Blocks['fun_mnist_read_img'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("mnist.read_img(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist_read_img'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var strout = 'mnist.read_img(' + value_name + ')';
  var code =  strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>


//<<
Blockly.Blocks['fun_mnist_model'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("mnist.model(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_mnist_model'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var strout = 'mnist.model(' + value_name + ')';
  var code =  strout;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>






