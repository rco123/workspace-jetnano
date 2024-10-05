
import Blockly from "blockly";
import 'blockly/python';  

export var fun_robo_xml = `
<category name="ROBO" colour="%{BKY_VARIABLES_HUE}">
  <block type="fun_robo_import"></block>
  <block type="fun_robo_control"></block>
  <block type="fun_robo_move"></block>
  <block type="fun_robo_delay"></block>

  <block type="fun_robo_led_left"></block>
  <block type="fun_robo_led_right"></block>
  <block type="fun_robo_led_left_back"></block>
  <block type="fun_robo_led_right_back"></block>
  
  <block type="fun_robo_get_rbutton"></block>
  <block type="fun_robo_get_lbutton"></block>

  <block type="fun_robo_get_dist"></block>
  <block type="fun_robo_get_time"></block>
 
  <block type="fun_robo_reboot"></block>
  <block type="fun_robo_read_battery"></block>

  <block type="fun_robo_call_time"></block>
  <block type="fun_robo_check_end_time"></block>
  <block type="fun_robo_reset_end_time"></block>

</category>`

let strout
//<
Blockly.Blocks['fun_robo_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("from robot_control.robot import robot_control");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_import'] = function(block) {
// TODO: Assemble Python into code variable.

let strout = 'from robot_control.robot import robot_control'
var code = strout + '\n';
return code;
};
//>

//<<
Blockly.Blocks['fun_robo_control'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("robo = robot_control()");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_robo_control'] = function(block) {
  // TODO: Assemble Python into code variable.

  let strout = 'robo = robot_control()'
  var code = strout + '\n';
  return code;
};
//>>

//<<
Blockly.Blocks['fun_robo_move'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("robo.move( angle=");
      this.appendValueInput("angle")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(",")
          .appendField("speed=");
      this.appendValueInput("speed")
          .setCheck("Number");
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
Blockly.Python['fun_robo_move'] = function(block) {
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  strout = 'robo.move(' + value_angle + ', ' + value_speed + ')';
  var code = strout + '\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_robo_delay'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.delay(");
      this.appendValueInput("NAME")
          .setCheck("Number");
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
  Blockly.Python['fun_robo_delay'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    
    strout = 'robo.delay(' + value_name + ')';
    var code = strout + '\n';
    return code;
  };
  //>>
  
//<<
Blockly.Blocks['fun_robo_led_left'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.led_left(");
      this.appendValueInput("NAME")
          .setCheck("Number");
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
Blockly.Python['fun_robo_led_left'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    
    strout = 'robo.led_left(' + value_name + ')';
    var code = strout + '\n';
    return code;
};
//>>

//<<
Blockly.Blocks['fun_robo_led_left_back'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.led_left_back(");
      this.appendValueInput("NAME")
          .setCheck("Number");
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
Blockly.Python['fun_robo_led_left_back'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    
    strout = 'robo.led_left_back(' + value_name + ')';
    var code = strout + '\n';
    return code;
};
//>>

//<<
Blockly.Blocks['fun_robo_led_right'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.led_right(");
      this.appendValueInput("NAME")
          .setCheck("Number");
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

Blockly.Python['fun_robo_led_right'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  strout = 'robo.led_right(' + value_name + ')';
  var code = strout + '\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_robo_led_right_back'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.led_right_back(");
      this.appendValueInput("NAME")
          .setCheck("Number");
      
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

Blockly.Python['fun_robo_led_right_back'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  strout = 'robo.led_right_back(' + value_name + ')';
  var code = strout + '\n';
  return code;
};
//>>




//<<
Blockly.Blocks['fun_robo_beep'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("robo.beep()");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_beep'] = function(block) {
// TODO: Assemble Python into code variable.

let strout = 'robo.beep()'
var code = strout + '\n';
return code;
};
//>>

//<<
Blockly.Blocks['fun_robo_arecord'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("robo.arecord(");
    this.appendValueInput("wav")
        .setCheck("String");
    this.appendDummyInput()
        .appendField(",");
    this.appendValueInput("time")
        .setCheck("Number");
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
Blockly.Python['fun_robo_arecord'] = function(block) {
var value_wav = Blockly.Python.valueToCode(block, 'wav', Blockly.Python.ORDER_ATOMIC);
var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
// TODO: Assemble Python into code variable.
strout = 'robo.arecord(' + value_wav + ', ' + value_time + ')';
var code = strout + '\n';
return code;
};
//>>


//<<
Blockly.Blocks['fun_robo_sound'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("robo.sound(");
    this.appendValueInput("wav")
        .setCheck("String");
    this.appendDummyInput()
        .appendField(",");
    this.appendValueInput("time")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(",");
    this.appendValueInput("onoff")
        .setCheck("Number");
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
Blockly.Python['fun_robo_sound'] = function(block) {
var value_wav = Blockly.Python.valueToCode(block, 'wav', Blockly.Python.ORDER_ATOMIC);
var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
var value_onoff = Blockly.Python.valueToCode(block, 'onoff', Blockly.Python.ORDER_ATOMIC);

// TODO: Assemble Python into code variable.
strout = 'robo.sound(' + value_wav + ', ' + value_time + ', ' + value_onoff + ')';
var code = strout + '\n';
return code;
};
//>>

//sgkim
//<<
Blockly.Blocks['fun_robo_net_eth'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("robo.net_eth()");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_net_eth'] = function(block) {
// TODO: Assemble Python into code variable.

let strout = 'robo.net_eth()'
var code = strout + '\n';
return code;
};
//>>

//<<
Blockly.Blocks['fun_robo_net_wifi'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("robo.net_wifi()");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_net_wifi'] = function(block) {
// TODO: Assemble Python into code variable.

let strout = 'robo.net_wifi()'
var code = strout + '\n';
return code;
};
//>>

//<<
Blockly.Blocks['fun_robo_offset'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.offset(");
      this.appendValueInput("NAME")
          .setCheck("Number");
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
  Blockly.Python['fun_robo_offset'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    
    strout = 'robo.offset(' + value_name + ')';
    var code = strout + '\n';
    return code;
  };
  //>>


//<<
Blockly.Blocks['fun_robo_pid_gain'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.pid_gain(");
      this.appendValueInput("NAME")
          .setCheck("Number");
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
Blockly.Python['fun_robo_pid_gain'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    
    strout = 'robo.pid_gain(' + value_name + ')';
    var code = strout + '\n';
    return code;
};
//>>


//<<
Blockly.Blocks['fun_robo_reboot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("robo.reboot()");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_reboot'] = function(block) {
// TODO: Assemble Python into code variable.

let strout = 'robo.reboot()'
var code = strout + '\n';
return code;
};
//>>


//<<
Blockly.Blocks['fun_robo_set_run_speed'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.set_run_speed(");
      this.appendValueInput("NAME")
          .setCheck("Number");
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
Blockly.Python['fun_robo_set_run_speed'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    
    strout = 'robo.set_run_speed(' + value_name + ')';
    var code = strout + '\n';
    return code;
};
//>>

//<
Blockly.Blocks['fun_robo_get_run_speed'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.get_run_speed(  )");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_get_run_speed'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'robo.get_run_speed()'
  //var code = strout + '\n';
  var code = strout;  
  return [code, Blockly.Python.ORDER_NONE];
};
//>

//<<
Blockly.Blocks['fun_robo_set_psd'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.set_psd(");
      this.appendValueInput("NAME")
          .setCheck("Number");
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
Blockly.Python['fun_robo_set_psd'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    
    strout = 'robo.set_psd(' + value_name + ')';
    var code = strout + '\n';
    return code;
};
//>>

//<
Blockly.Blocks['fun_robo_read_battery'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.read_battery(  )");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_read_battery'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'robo.read_battery()'
  //var code = strout + '\n';
  var code = strout;  
  return [code, Blockly.Python.ORDER_NONE];
};
//>


//<
Blockly.Blocks['fun_robo_get_rbutton'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.get_rbutton(  )");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_get_rbutton'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'robo.get_rbutton()'
  //var code = strout + '\n';
  var code = strout;  
  return [code, Blockly.Python.ORDER_NONE];
};
//>


//<
Blockly.Blocks['fun_robo_get_lbutton'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.get_lbutton(  )");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_get_lbutton'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'robo.get_lbutton()'
  //var code = strout + '\n';
  var code = strout;  
  return [code, Blockly.Python.ORDER_NONE];
};
//>


//<
Blockly.Blocks['fun_robo_get_dist'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.get_dist(  )");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_get_dist'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'robo.get_dist()'
  //var code = strout + '\n';
  var code = strout;  
  return [code, Blockly.Python.ORDER_NONE];
};
//>


//<
Blockly.Blocks['fun_robo_get_time'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.get_time(  )");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_get_time'] = function(block) {
  // TODO: Assemble Python into code variable.
  let strout = 'robo.get_time()'
  //var code = strout + '\n';
  var code = strout;  
  return [code, Blockly.Python.ORDER_NONE];
};
//>


//<<---
Blockly.Blocks['fun_robo_call_time'] = {
  init: function() {
      this.setOutput(true,null)
      this.setInputsInline(true);

      this.appendValueInput("NAME")
          .setCheck("Number")
          .appendField("robo.call_time(");
      this.appendDummyInput()
          .appendField(")");

      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};

Blockly.Python['fun_robo_call_time'] = function(block) {
var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
// TODO: Assemble Python into code variable.
var strout = 'robo.call_time(' + value_name + ')';
var code =  strout;
return [code, Blockly.Python.ORDER_NONE];
};
//-->>


//<<---
Blockly.Blocks['fun_robo_check_end_time'] = {
  init: function() {
      this.setOutput(true,null)
      this.setInputsInline(true);

      this.appendValueInput("NAME")
          .setCheck("Number")
          .appendField("robo.check_end_time(");
      this.appendDummyInput()
          .appendField(")");
      
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_check_end_time'] = function(block) {
var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
// TODO: Assemble Python into code variable.
var strout = 'robo.check_end_time(' + value_name + ')';
var code =  strout;
return [code, Blockly.Python.ORDER_NONE];
};
//-->>

//<<---
Blockly.Blocks['fun_robo_reset_end_time'] = {
  init: function() {
      this.setInputsInline(true);

      this.setNextStatement(true,null)
      this.setPreviousStatement(true,null)
          
      this.appendDummyInput()
          .appendField("robo.reset_end_time( )");
      
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};

Blockly.Python['fun_robo_reset_end_time'] = function(block) {
var strout = 'robo.reset_end_time( )';
var code =  strout + '\n';
return code;
};
//-->>
