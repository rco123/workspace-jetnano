var fun_goog_xml = `
<category name="GOOG" colour="%{BKY_VARIABLES_HUE}">
  <block type="fun_goog_import"></block>
  <block type="fun_goog_control"></block>
  <block type="fun_goog_reg_event"></block>
  <block type="fun_goog_reg_trigger"></block>
  <block type="fun_goog_run_event"></block>
  <block type="fun_goog_start"></block>
  </category>`

  
//<
Blockly.Blocks['fun_goog_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("from google_control.goog import google_control");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_goog_import'] = function(block) {
// TODO: Assemble Python into code variable.

let strout = 'from google_control.goog import google_control'
var code = strout + '\n';
return code;
};
//>

//<
Blockly.Blocks['fun_goog_control'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("goog = google_control()");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_goog_control'] = function(block) {
  // TODO: Assemble Python into code variable.

  let strout = 'goog = google_control()'
  var code = strout + '\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_goog_reg_event'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("goog.reg_event()");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_goog_reg_event'] = function(block) {
// TODO: Assemble Python into code variable.
let strout = 'goog.reg_event()'
var code = strout + '\n';
return code;
};
//>


//<<
Blockly.Blocks['fun_goog_reg_trigger'] = {
  init: function() {
    this.appendValueInput("file")
        .setCheck("String")
        .appendField("goog.reg_trigger(");
    this.appendDummyInput()
        .appendField(")");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_goog_reg_trigger'] = function(block) {
  var value_file = Blockly.Python.valueToCode(block, 'file', Blockly.Python.ORDER_ATOMIC);
  let strout = 'goog.reg_trigger(' + value_file + ')'
  // TODO: Assemble Python into code variable.
  var code = strout + '\n';
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.Python.ORDER_NONE];
  return code
};
//>>

//<
Blockly.Blocks['fun_goog_run_event'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("goog.run_event()");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_goog_run_event'] = function(block) {
// TODO: Assemble Python into code variable.
let strout = 'goog.run_event()'
var code = strout + '\n';
return code;
};
//>

//<
Blockly.Blocks['fun_goog_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("goog.start()");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_goog_start'] = function(block) {
// TODO: Assemble Python into code variable.
let strout = 'goog.start()'
var code = strout + '\n';
return code;
};
//>


