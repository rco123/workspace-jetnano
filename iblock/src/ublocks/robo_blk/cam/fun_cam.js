
import Blockly from "blockly";
import 'blockly/python';

// Function Name
export var fun_cam_xml = 
`<category name="CAM" colour="%{BKY_VARIABLES_HUE}">
   
    <block type="fun_cam_import"></block>
    <block type="fun_cam"></block>
    <block type="fun_cam_cam_open"></block>
    
    <block type="fun_cam_cam_img_read"></block>
    <block type="fun_cam_read_cam_img"></block>
    
    <block type="fun_cam_img_display"></block>
    <block type="fun_cam_display_img"></block>
    <block type="fun_cam_display_img_angle"></block>
    
    <block type="fun_cam_img_read"></block>
    <block type="fun_cam_read_img"></block>
    
    <block type="fun_cam_img_write"></block>
    <block type="fun_cam_img_write_2"></block>
    <block type="fun_cam_delay"></block>
    
</category>`


//<
Blockly.Blocks['fun_cam_import'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("from cam_control.cam import cam_control");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_cam_import'] = function(block) {
    // TODO: Assemble Python into code variable.
    var strout = 'from cam_control.cam import cam_control'
    var code =  strout + '\n';
    return code;
};
//>

//<
Blockly.Blocks['fun_cam'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("cam = cam_control( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_cam'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'cam = cam_control()'
  var code =  strout + '\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_cam_cam_open'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("cam.cam_open(  )");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_cam_cam_open'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'cam.cam_open()'
  var code = strout + '\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_cam_cam_img_read'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("cam.cam_img_read(  )");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Python['fun_cam_cam_img_read'] = function(block) {
  // TODO: Assemble Python into code variable.

  let strout = 'cam.cam_img_read( )'
  //var code = strout + '\n';
  var code = strout;  
  return [code, Blockly.Python.ORDER_NONE];
};
//>



//<
Blockly.Blocks['fun_cam_read_cam_img'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("cam.read_cam_img(  )");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Python['fun_cam_read_cam_img'] = function(block) {
  // TODO: Assemble Python into code variable.

  let strout = 'cam.read_cam_img( )'
  //var code = strout + '\n';
  var code = strout;  
  return [code, Blockly.Python.ORDER_NONE];
};
//>


//<
Blockly.Blocks['fun_cam_img_display'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("cam.img_display(");
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
Blockly.Python['fun_cam_img_display'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'cam.img_display(' + value_name + ')\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_cam_display_img'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("cam.display_img(");
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
Blockly.Python['fun_cam_display_img'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'cam.display_img(' + value_name + ')\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_cam_display_img_angle'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("cam.display_img_angle(");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",");
    this.appendValueInput("angle")
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
Blockly.Python['fun_cam_display_img_angle'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = 'cam.display_img_angle(' + value_name + ',' +  value_angle  +  ')\n';
  return code;
};
//>















//<<
Blockly.Blocks['fun_cam_img_read'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("cam.img_read(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_cam_img_read'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var strout = 'cam.img_read(' + value_name + ')';
  var code =  strout + '\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>


//<<
Blockly.Blocks['fun_cam_read_img'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("cam.read_img(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_cam_read_img'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var strout = 'cam.read_img(' + value_name + ')';
  var code =  strout + '\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
//>>




Blockly.Blocks['fun_cam_img_write'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("cam.img_write(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_cam_img_write'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var strout = 'cam.img_write(' + value_name + ')';
  var code =  strout + '\n';
  return code;
};


//<<
Blockly.Blocks['fun_cam_img_write_2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("cam.img_write( file=");
    this.appendValueInput("file")
        .setCheck("String");
    this.appendDummyInput()
        .appendField(",")
        .appendField("dir=");
    this.appendValueInput("dir")
        .setCheck("String");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_cam_img_write_2'] = function(block) {
var value_file = Blockly.Python.valueToCode(block, 'file', Blockly.Python.ORDER_ATOMIC);
var value_dir = Blockly.Python.valueToCode(block, 'dir', Blockly.Python.ORDER_ATOMIC);
// TODO: Assemble Python into code variable.
let strout = 'cam.img_write(' + value_file + ', ' + value_dir + ')';
var code = strout + '\n';
return code;
};

//>







Blockly.Blocks['fun_cam_delay'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("cam.delay(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_cam_delay'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var strout = 'cam.delay(' + value_name + ')';
  var code =  strout + '\n';
  return code;
};
