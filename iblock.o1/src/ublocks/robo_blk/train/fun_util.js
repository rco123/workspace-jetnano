import Blockly from "blockly";
import 'blockly/python';

// Function Name
export var fun_util_xml =
`<category name="UTIL" colour="%{BKY_VARIABLES_HUE}">

    <block type="fun_util_import"></block>
    <block type="fun_util_control"></block>
    <block type="fun_util_set_data_dir"></block>

    <block type="fun_util_ps_set_addr"></block>
    <block type="fun_util_ps_connect"></block>

    <block type="fun_util_train_r18"></block>

    <block type="fun_util_train_mark"></block>

    <block type="fun_util_train_traffic_dir_det"></block>
    <block type="fun_util_train_traffic_dir_class"></block>

    <block type="fun_util_train_traffic_light_det"></block>
    <block type="fun_util_train_traffic_light_class"></block>

    <block type="fun_util_train_traffic_sign_det"></block>
    <block type="fun_util_train_traffic_sign_class"></block>

    <block type="fun_util_train_obj_det_back"></block>

</category>`


//<
Blockly.Blocks['fun_util_import'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("from util_control.util import util_control");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_util_import'] = function(block) {
    // TODO: Assemble Python into code variable.
    var strout = 'from util_control.util import util_control'
    var code =  strout + '\n';
    return code;
};
//>

//<
Blockly.Blocks['fun_util_control'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("util = util_control( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_util_control'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'util = util_control()'
  var code =  strout + '\n';
  return code;
};
//>


//<
Blockly.Blocks['fun_util_set_data_dir'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("util.set_data_dir(");
    this.appendDummyInput()
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_util_set_data_dir'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.set_data_dir(" + value_name + ")\n";
  return code;
};
//>


//<
Blockly.Blocks['fun_util_ps_set_addr'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("util.ps_set_addr(");
    this.appendDummyInput()
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_util_ps_set_addr'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.ps_set_addr(" + value_name + ")\n";
  return code;
};
//>


//<
Blockly.Blocks['fun_util_ps_connect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("util.ps_connect(  )");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Python['fun_util_ps_connect'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'util.ps_connect()'
  var code = strout + '\n';
  return code;
};
//>


//<<
Blockly.Blocks['fun_util_train_r18'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_r18_")
        .appendField(new Blockly.FieldDropdown([["s","s"], ["l","l"], ["r","r"], ["x","x"]]), "dir")
        .appendField("(batch=")
    this.appendValueInput("batch")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",epochs=");
    this.appendValueInput("epochs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",out=");
    this.appendValueInput("out")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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
Blockly.Python['fun_util_train_r18'] = function(block) {
  var dir = block.getFieldValue('dir');
  var value_batch = Blockly.Python.valueToCode(block, 'batch', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);
  var value_out = Blockly.Python.valueToCode(block, 'out', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = "util.train_r18_" + dir +  "(batch=" + value_batch + ',epochs=' + value_epochs + ',out=' + value_out + ')\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_util_train_r18_x_hyp'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_r18_x_hyp(");
    this.appendValueInput("hyp")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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
Blockly.Python['fun_util_train_r18_x_hyp'] = function(block) {
  var value_hyp = Blockly.Python.valueToCode(block, 'hyp', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'util.train_r18_x_hyp(' + value_hyp + ')\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_util_train_r18_x_preprocess'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_r18_x_preprocess(");
    this.appendValueInput("opt")
        .setCheck("null")
        .setAlign(Blockly.ALIGN_RIGHT);
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
Blockly.Python['fun_util_train_r18_x_preprocess'] = function(block) {
  var value_opt = Blockly.Python.valueToCode(block, 'opt', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'util.train_r18_x_preprocess(' + value_opt + ')\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_util_train_r18_x_premodel'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_r18_x_premodel(");
    this.appendValueInput("model")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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
Blockly.Python['fun_util_train_r18_x_premodel'] = function(block) {
  let value_model = Blockly.Python.valueToCode(block, 'model', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  let code = 'util.train_r18_x_premodel(' + value_model + ')\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_util_train_mark'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_mark(batch=");
    this.appendValueInput("batch")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",epochs=");
    this.appendValueInput("epochs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);

        this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",out=");
    this.appendValueInput("out")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_mark'] = function(block) {
  var value_batch = Blockly.Python.valueToCode(block, 'batch', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);
  var value_out = Blockly.Python.valueToCode(block, 'out', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = "util.train_mark(batch=" + value_batch + ',epochs=' + value_epochs + ',out=' + value_out + ')\n';
  return code;
};
//>>




//<<
Blockly.Blocks['fun_util_train_traffic_dir_det'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_traffic_dir_det(batch=");
    this.appendValueInput("batch")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",epochs=");
    this.appendValueInput("epochs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);

        this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",out=");
    this.appendValueInput("out")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_traffic_dir_det'] = function(block) {
  var value_batch = Blockly.Python.valueToCode(block, 'batch', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);
  var value_out = Blockly.Python.valueToCode(block, 'out', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = "util.train_traffic_dir_det(batch=" + value_batch + ',epochs=' + value_epochs + ',out=' + value_out + ')\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_util_train_traffic_dir_class'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_traffic_dir_class(batch=");
    this.appendValueInput("batch")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",epochs=");
    this.appendValueInput("epochs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);

        this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",out=");
    this.appendValueInput("out")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_traffic_dir_class'] = function(block) {
  var value_batch = Blockly.Python.valueToCode(block, 'batch', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);
  var value_out = Blockly.Python.valueToCode(block, 'out', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = "util.train_traffic_dir_class(batch=" + value_batch + ',epochs=' + value_epochs + ',out=' + value_out + ')\n';
  return code;
};

//>>


//<<
Blockly.Blocks['fun_util_train_traffic_sign_det'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_traffic_sign_det(batch=");
    this.appendValueInput("batch")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",epochs=");
    this.appendValueInput("epochs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);

        this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",out=");
    this.appendValueInput("out")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_traffic_sign_det'] = function(block) {
  var value_batch = Blockly.Python.valueToCode(block, 'batch', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);
  var value_out = Blockly.Python.valueToCode(block, 'out', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = "util.train_traffic_sign_det(batch=" + value_batch + ',epochs=' + value_epochs + ',out=' + value_out + ')\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_util_train_traffic_sign_class'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_traffic_sign_class(batch=");
    this.appendValueInput("batch")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",epochs=");
    this.appendValueInput("epochs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",out=");
    this.appendValueInput("out")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_traffic_sign_class'] = function(block) {
  var value_batch = Blockly.Python.valueToCode(block, 'batch', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);
  var value_out = Blockly.Python.valueToCode(block, 'out', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = "util.train_traffic_sign_class(batch=" + value_batch + ',epochs=' + value_epochs + ',out=' + value_out+  ')\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_util_train_traffic_light_det'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_traffic_light_det(batch=");
    this.appendValueInput("batch")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",epochs=");
    this.appendValueInput("epochs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",out=");
    this.appendValueInput("out")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_traffic_light_det'] = function(block) {
  var value_batch = Blockly.Python.valueToCode(block, 'batch', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);
  var value_out = Blockly.Python.valueToCode(block, 'out', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = "util.train_traffic_light_det(batch=" + value_batch + ',epochs=' + value_epochs + ',out=' + value_out + ')\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_util_train_traffic_light_class'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_traffic_light_class(batch=");
    this.appendValueInput("batch")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",epochs=");
    this.appendValueInput("epochs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",out=");
    this.appendValueInput("out")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_traffic_light_class'] = function(block) {
  var value_batch = Blockly.Python.valueToCode(block, 'batch', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);
  var value_out = Blockly.Python.valueToCode(block, 'out', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = "util.train_traffic_light_class(batch=" + value_batch + ',epochs=' + value_epochs + ',out=' + value_out + ')\n';
  return code;
};
//>




//<<
Blockly.Blocks['fun_util_train_obj_det_back'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_det_back(batch=");
    this.appendValueInput("batch")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",epochs=");
    this.appendValueInput("epochs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);


    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",out=");
    this.appendValueInput("out")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_obj_det_back'] = function(block) {
  var value_batch = Blockly.Python.valueToCode(block, 'batch', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);
  var value_out = Blockly.Python.valueToCode(block, 'out', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_det_back(batch=" + value_batch + ',epochs=' + value_epochs  + ',out=' + value_out + ')\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_util_train_obj_class_back'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_class_back(batch=");
    this.appendValueInput("batch")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",epochs=");
    this.appendValueInput("epochs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_obj_class_back'] = function(block) {
  var value_batch = Blockly.Python.valueToCode(block, 'batch', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_class_back(batch= " + value_batch + ', epochs= ' + value_epochs + ')\n';
  return code;
};
//>>



//<<
Blockly.Blocks['fun_util_train_obj_det_coco'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_det_coco(batch=");
    this.appendValueInput("batch")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(",epochs=");
    this.appendValueInput("epochs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_obj_det_coco'] = function(block) {
  var value_batch = Blockly.Python.valueToCode(block, 'batch', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_det_coco(batch= " + value_batch + ', epochs= ' + value_epochs + ')\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_util_train_preprocess'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_preprocess(");
    this.appendValueInput("img")
        .setCheck("null")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(" )");

    this.setInputsInline(true);
    this.setOutput(true, null);

    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_util_train_preprocess'] = function(block) {
  var value_img = Blockly.Python.valueToCode(block, 'img', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_preprocess(" + value_img + ')\n';
  return [code, Blockly.Python.ORDER_NONE];
};
//>>


//<<
Blockly.Blocks['fun_util_preprocess'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.preprocess(");
    this.appendValueInput("opt")
        .setCheck("null")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(" )");

    this.setInputsInline(true);
    this.setOutput(true, null);

    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['fun_util_preprocess'] = function(block) {
  var value_opt = Blockly.Python.valueToCode(block, 'opt', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.preprocess(" + value_opt + ')\n';
  return [code, Blockly.Python.ORDER_NONE];
};
//>>


//<<
Blockly.Blocks['fun_util_preprocess_add_fnc'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.preprocess_add_fnc(");
    this.appendValueInput("fnc")
        .setCheck("null")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_preprocess_add_fnc'] = function(block) {
  var value_fnc = Blockly.Python.valueToCode(block, 'fnc', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.preprocess_add_fnc(" + value_fnc + ')\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_util_train_preprocess_add_fnc'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_preprocess_add_fnc(");
    this.appendValueInput("fnc")
        .setCheck("null")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_preprocess_add_fnc'] = function(block) {
  var value_fnc = Blockly.Python.valueToCode(block, 'fnc', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_preprocess_add_fnc(" + value_fnc + ')\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_util_train_obj_class_back_hyp'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_class_back_hyp(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_obj_class_back_hyp'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_class_back_hyp(" + value_arg + ')\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_util_train_obj_class_back_preprocess'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_class_back_preprocess(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_obj_class_back_preprocess'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_class_back_preprocess(" + value_arg + ')\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_util_train_obj_class_back_premodel'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_class_back_premodel(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_obj_class_back_premodel'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_class_back_premodel(" + value_arg + ')\n';
  return code;
};
//>>



//<<
Blockly.Blocks['fun_util_train_obj_det_back_hyp'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_det_back_hyp(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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


Blockly.Python['fun_util_train_obj_det_back_hyp'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_det_back_hyp(" + value_arg + ')\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_util_train_obj_det_back_preprocess'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_det_back_preprocess(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_obj_det_back_preprocess'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_det_back_preprocess(" + value_arg + ')\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_util_train_obj_det_back_premodel'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_det_back_premodel(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_obj_det_back_premodel'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_det_back_premodel(" + value_arg + ')\n';
  return code;
};
//>>


//sgkim

//<<
Blockly.Blocks['fun_util_train_obj_det_coco_hyp'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_det_coco_hyp(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_obj_det_coco_hyp'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_det_coco_hyp(" + value_arg + ')\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_util_train_obj_det_coco_preprocess'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_det_coco_preprocess(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_obj_det_coco_preprocess'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_det_coco_preprocess(" + value_arg + ')\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_util_train_obj_det_coco_premodel'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_obj_det_coco_premodel(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_obj_det_coco_premodel'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_obj_det_coco_premodel(" + value_arg + ')\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_util_train_make_dir'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_make_dir(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_make_dir'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_make_dir(" + value_arg + ')\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_util_train_del_dir'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.train_del_dir(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_train_del_dir'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.train_del_dir(" + value_arg + ')\n';
  return code;
};
//>>



//<<
Blockly.Blocks['fun_util_preprocess_dataset'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("util.preprocess_dataset(");
    this.appendValueInput("arg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT);
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

Blockly.Python['fun_util_preprocess_dataset'] = function(block) {
  var value_arg = Blockly.Python.valueToCode(block, 'arg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "util.preprocess_dataset(" + value_arg + ')\n';
  return code;
};
//>>
















