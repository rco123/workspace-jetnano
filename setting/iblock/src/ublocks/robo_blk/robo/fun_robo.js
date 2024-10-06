
import Blockly from "blockly";
import 'blockly/python';  

const colorVal = "#cc3b3b"


export var fun_robo_xml = `
<category name="ROBO" colour="${colorVal}">
  <block type="fun_robo_import"></block>
  <block type="fun_robo_control"></block>
  
  <block type="fun_robo_move"></block>
  <block type="fun_robo_stop"></block>
  <block type="fun_robo_delay"></block>

  <block type="fun_robo_get_img"></block>

  
  
  <block type="fun_robo_dis_img"></block>
  <block type="fun_robo_dis_img_ang"></block>

  <block type="fun_robo_dir_clean"></block>
  <block type="fun_robo_hp_con"></block>

  <block type="fun_robo_led_left"></block>
  <block type="fun_robo_led_right"></block>
  <block type="fun_robo_beep"></block>

  <block type="fun_robo_get_ip"></block>
  <block type="fun_robo_conn_ap"></block>
  <block type="fun_robo_set_hotspot"></block>

</category>`;




//<
Blockly.Blocks['fun_robo_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("from robot import robot_control");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_import'] = function(block) {
// TODO: Assemble Python into code variable.

let strout = 'from robo import robot_control'
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
      this.setColour(colorVal);
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
      this.setColour(colorVal);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_robo_move'] = function(block) {
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  let strout = 'robo.move(' + value_angle + ', ' + value_speed + ')';
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
      this.setColour(colorVal);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  Blockly.Python['fun_robo_delay'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    
    let strout = 'robo.delay(' + value_name + ')';
    var code = strout + '\n';
    return code;
  };
//>>


//<<
Blockly.Blocks['fun_robo_get_img'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.get_img(");
      this.appendDummyInput()
          .appendField(")");
      
      this.setInputsInline(true);

      this.setInputsInline(true);
      this.setOutput(true, null);

      this.setColour(colorVal);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  Blockly.Python['fun_robo_get_img'] = function(block) {
    
    let strout = 'robo.get_img( )';
    var code = strout;
    return [code, Blockly.Python.ORDER_NONE];
  };
//>>

  
//<<
Blockly.Blocks['fun_robo_dis_img'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.dis_img(img =");
      
      // img 문자열 입력
      this.appendValueInput("IMG")
          .setCheck("String")
         
      this.appendDummyInput()
          .appendField(")");

      this.setInputsInline(true);  // 한 줄로 표시
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(colorVal);  // 블록 색상 설정
      this.setTooltip("Display image using robo.dis_img()");
      this.setHelpUrl("");
  }
};

Blockly.Python['fun_robo_dis_img'] = function(block) {
  var value_img = Blockly.Python.valueToCode(block, 'IMG', Blockly.Python.ORDER_ATOMIC);  // img 값 가져오기

  // Python 코드 생성
  var code = 'robo.dis_img(' + value_img + ')\n';
  return code;
};
  
//>

//<<
Blockly.Blocks['fun_robo_dis_img_ang'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.dis_img_ang(");

      // img 문자열 입력
      this.appendValueInput("IMG")
          .setCheck("String")
          .appendField("img =");

      // angle 숫자 입력
      this.appendValueInput("ANGLE")
          .setCheck("Number")
          .appendField(", angle =");

      this.appendDummyInput()
          .appendField(")");

      this.setInputsInline(true);  // 모든 입력을 한 줄로 표시
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(colorVal);  // 블록 색상 설정
      this.setTooltip("Display image with angle using robo.dis_img_ang()");
      this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_dis_img_ang'] = function(block) {
  var value_img = Blockly.Python.valueToCode(block, 'IMG', Blockly.Python.ORDER_ATOMIC);  // img 값 가져오기
  var value_angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC);  // angle 값 가져오기

  // Python 코드 생성
  var code = 'robo.dis_img_ang(' + value_img + ', ' + value_angle + ')\n';
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
      this.setColour(colorVal);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_led_left'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    let strout = 'robo.led_left(' + value_name + ')';
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
      this.setColour(colorVal);
      this.setTooltip("");
      this.setHelpUrl("");
    }
};
Blockly.Python['fun_robo_led_right'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  let strout = 'robo.led_right(' + value_name + ')';
  var code = strout + '\n';
  return code;
};
//>>


//<<
Blockly.Blocks['fun_robo_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("robo.stop( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_stop'] = function(block) {
// TODO: Assemble Python into code variable.

let strout = 'robo.stop()'
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
    this.setColour(colorVal);
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
Blockly.Blocks['fun_robo_get_ip'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("robo.get_ip()");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colorVal);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_robo_get_ip'] = function(block) {
// TODO: Assemble Python into code variable.

let strout = 'robo.get_ip()'
var code = strout + '\n';
return code;
};
//>>


//<<
Blockly.Blocks['fun_robo_conn_ap'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("robo.conn_ap( ssdi=");
      this.appendValueInput("ssid")
          .setCheck("String");
      this.appendDummyInput()
          .appendField(",")
          .appendField("pw=");
      this.appendValueInput("pw")
          .setCheck("String");
      this.appendDummyInput()
          .appendField(")");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(colorVal);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_robo_conn_ap'] = function(block) {
  var value_ssid = Blockly.Python.valueToCode(block, 'ssid', Blockly.Python.ORDER_ATOMIC);
  var value_pw = Blockly.Python.valueToCode(block, 'pw', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  let strout = 'robo.conn_ap(' + value_ssid + ', ' + value_pw + ')';
  var code = strout + '\n';
  return code;
};
//>>



//<<
Blockly.Blocks['fun_robo_set_hotspot'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.set_hotspot(");
      this.appendValueInput("NAME")
          .setCheck("String");
      this.appendDummyInput()
          .appendField(")");

      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(colorVal);
      this.setTooltip("");
      this.setHelpUrl("");
    }
};

Blockly.Python['fun_robo_set_hotspot'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  let strout = 'robo.set_hotspot(' + value_name + ')';
  var code = strout + '\n';
  return code;
};
//>>




//<<

Blockly.Blocks['fun_robo_dir_clean'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.dir_clean(")
          .appendField(new Blockly.FieldDropdown([
            ["lane0", "lane0"],  // 실제 값도 소문자로 설정
            ["lane1", "lane1"], 
            ["lane2", "lane2"], 
            ["mark0", "mark0"], 
            ["mark1", "mark1"], 
            ["mark2", "mark2"]
          ]), "NAME")  // 드롭다운으로 선택
          .appendField(")");
          
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(colorVal);
      this.setTooltip("");
      this.setHelpUrl("");
    }
};


Blockly.Python['fun_robo_dir_clean'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');  // 드롭다운에서 선택된 값을 가져옴
  var code = 'robo.dir_clean("' + dropdown_name + '")\n';
  return code;
};

//>>


//<<
// 블록 정의
Blockly.Blocks['fun_robo_hp_con'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("robo.hp_con(");
      
      // sdir 드롭다운 입력 (lane0, lane1, lane2, mark0, mark1, mark2)
      this.appendDummyInput()
          .appendField('sdir =')
          .appendField(new Blockly.FieldDropdown([
            ["lane0", "lane0"],
            ["lane1", "lane1"],
            ["lane2", "lane2"],
            ["mark0", "mark0"],
            ["mark1", "mark1"],
            ["mark2", "mark2"]
          ]), "SDIR");

      // cspeed 숫자 입력
      this.appendValueInput("CSPEED")
          .setCheck("Number")
          .appendField(", cspeed =");

      // idiv 숫자 입력
      this.appendValueInput("IDIV")
          .setCheck("Number")
          .appendField(", idiv =");

      // asens 숫자 입력
      this.appendValueInput("ASENS")
          .setCheck("Number")
          .appendField(", asens =");

      this.appendDummyInput()
          .appendField(")");

      this.setInputsInline(true);  // 모든 입력을 한 줄로 표시
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(colorVal);  // 블록 색상 설정
      this.setTooltip("Calls robo.hp_con with the specified parameters.");
      this.setHelpUrl("");
    }
};


// Python 코드 생성기
Blockly.Python['fun_robo_hp_con'] = function(block) {
  var dropdown_sdir = block.getFieldValue('SDIR');  // sdir 드롭다운 값
  var value_cspeed = Blockly.Python.valueToCode(block, 'CSPEED', Blockly.Python.ORDER_ATOMIC);  // cspeed 값
  var value_idiv = Blockly.Python.valueToCode(block, 'IDIV', Blockly.Python.ORDER_ATOMIC);  // idiv 값
  var value_asens = Blockly.Python.valueToCode(block, 'ASENS', Blockly.Python.ORDER_ATOMIC);  // asens 값

  // Python 코드 생성
  var code = 'robo.hp_con(sdir="' + dropdown_sdir + '", cspeed=' 
		+ value_cspeed + ', idiv=' + value_idiv + ', asens=' + value_asens + ')\n';
  return code;
};

//>>


