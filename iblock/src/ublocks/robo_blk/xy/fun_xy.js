// Function Name

var fun_xy_xml = 
`<category name="XY" colour="%{BKY_VARIABLES_HUE}">
   
    <block type="fun_xy_import"></block>
    <block type="fun_xy"></block>
    <block type="fun_xy_set_optimize"></block>
    <block type="fun_xy_model"></block>
    <block type="fun_xy_update_para"></block>
    <block type="fun_xy_display_xy"></block>
    <block type="fun_xy_display_end"></block>
</category>`


//<
Blockly.Blocks['fun_xy_import'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("from xy_control.xy import xy_control");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);

   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_xy_import'] = function(block) {
    // TODO: Assemble Python into code variable.
    var strout = 'from xy_control.xy import xy_control'
    var code =  strout + '\n';
    return code;
};
//>


//<
Blockly.Blocks['fun_xy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("xy = xy_control( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_xy'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'xy = xy_control()'
  var code =  strout + '\n';
  return code;
};
//>



//<
Blockly.Blocks['fun_xy_set_optimize'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("xy.set_optimize( w=");

    this.appendValueInput("val_w")
        .setCheck("Number");

     this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(", b=");

    this.appendValueInput("val_b")
        .setCheck("Number");

    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(", lr=");

    this.appendValueInput("val_lr")
        .setCheck("Number");

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
Blockly.Python['fun_xy_set_optimize'] = function(block) {
  var value_w = Blockly.Python.valueToCode(block, 'val_w', Blockly.Python.ORDER_ATOMIC);
  var value_b = Blockly.Python.valueToCode(block, 'val_b', Blockly.Python.ORDER_ATOMIC);
  var value_lr = Blockly.Python.valueToCode(block, 'val_lr', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = 'xy.set_optimize(' + value_w + "," + value_b + "," + value_lr + ')\n';
  return code;
};
//>

//<
Blockly.Blocks['fun_xy_model'] = {
  init: function() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("xy.model(");
    
    this.appendValueInput("NAME")
      .setCheck(null);

    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(")");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Python['fun_xy_model'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = 'xy.model(' + value + ')';
  return [code, Blockly.Python.ORDER_NONE];
}
//>

//<
Blockly.Blocks['fun_xy_update_para'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("xy.update_para( out=");

    this.appendValueInput("val_a")
        .setCheck(null);

     this.appendDummyInput()
        .appendField(", y=");

    this.appendValueInput("val_b")
        .setCheck(null);

    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(")");

    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);

    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['fun_xy_update_para'] = function(block) {
  var value_a = Blockly.Python.valueToCode(block, 'val_a', Blockly.Python.ORDER_ATOMIC);
  var value_b = Blockly.Python.valueToCode(block, 'val_b', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = 'xy.update_para(' + value_a + "," + value_b + ')';
  return [code, Blockly.Python.ORDER_NONE];
};
//>

//<
Blockly.Blocks['fun_xy_display_xy'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("xy.display_xy(  )" );
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_xy_display_xy'] = function(block) {
  
  // TODO: Assemble Python into code variable.
  var code = 'xy.display_xy( )\n';
  return code;
};
//>

//<
Blockly.Blocks['fun_xy_display_end'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("xy.display_end(  )" );
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_xy_display_end'] = function(block) {
  
  // TODO: Assemble Python into code variable.
  var code = 'xy.display_end( )\n';
  return code;
};
//>

