import Blockly from "blockly";
import 'blockly/python';  

// Function Name
export var fun_ai_xml =
`
  <category name="AI" colour="%{BKY_VARIABLES_HUE}">

    <block type="fun_ai_import"></block>
    <block type="fun_ai_control"></block>

      <category name="LANE" colour="%{BKY_VARIABLES_HUE}">
        <block type="fun_ai_lane_det_r18_load_model"></block>
        <block type="fun_ai_lane_det_r18_img_to_angle"></block>
        <block type="fun_ai_lane_det_cv2_img_to_angle"></block>

      </category>


      <category name="MARK" colour="%{BKY_VARIABLES_HUE}">
        <block type="fun_ai_mark_det_load_model"></block>
        <block type="fun_ai_mark_det_det"></block>
        <block type="fun_ai_mark_det_get_class"></block>
        <block type="fun_ai_mark_det_get_confi"></block>
      </category>

      <category name="DIR" colour="%{BKY_VARIABLES_HUE}">
        <block type="fun_ai_traffic_dir_det_load_model"></block>
        <block type="fun_ai_traffic_dir_det_det"></block>
        <block type="fun_ai_traffic_dir_det_get_class"></block>
        <block type="fun_ai_traffic_dir_det_box_img"></block>
      </category>

      <category name="LIGHT" colour="%{BKY_VARIABLES_HUE}">
        <block type="fun_ai_traffic_light_det_load_model"></block>
        <block type="fun_ai_traffic_light_det_det"></block>
        <block type="fun_ai_traffic_light_det_box_img"></block>
        <block type="fun_ai_traffic_light_det_crop_img"></block>
        <block type="fun_ai_traffic_light_det_crop_size"></block>

        <block type="fun_ai_traffic_light_class_load_model"></block>
        <block type="fun_ai_traffic_light_class_det"></block>
      </category>

     <category name="SIGN" colour="%{BKY_VARIABLES_HUE}">
      <block type="fun_ai_traffic_sign_det_load_model"></block>
      <block type="fun_ai_traffic_sign_det_det"></block>
      <block type="fun_ai_traffic_sign_det_box_img"></block>
      <block type="fun_ai_traffic_sign_det_crop_img"></block>
      <block type="fun_ai_traffic_sign_det_crop_size"></block>
      <block type="fun_ai_traffic_sign_class_load_model"></block>
      <block type="fun_ai_traffic_sign_class_det"></block>
    </category>

    <category name="OBJ" colour="%{BKY_VARIABLES_HUE}">
      <block type="fun_ai_obj_det_back_load_model"></block>
      <block type="fun_ai_obj_det_back_det"></block>
      <block type="fun_ai_obj_det_back_box_img"></block>
      <block type="fun_ai_obj_det_back_get_class"></block>
      <block type="fun_ai_obj_det_back_dis_class_to_label"></block>
      <block type="fun_ai_obj_det_back_class_to_label"></block>
      <block type="fun_ai_obj_det_back_get_info"></block>
      <block type="fun_ai_obj_det_back_set_opt"></block>
      <block type="fun_ai_obj_det_back_get_labels"></block>
      <block type="fun_ai_obj_det_back_get_this_class_no"></block>
      <block type="fun_ai_obj_det_back_get_det_list"></block>
      <block type="fun_ai_obj_det_back_get_det_no"></block>
      <block type="fun_ai_obj_det_back_reg_nclass_name"></block>
    </category>

</category>`


Blockly.Blocks['fun_ai_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('from ai_control.ai import ai_control');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Python['fun_ai_import'] = function(block) {
  // TODO: Assemble Python into code variable.
  var strout = 'from ai_control.ai import ai_control'
  var code = strout + '\n';
  return code;
};


Blockly.Blocks['fun_ai_control'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("ai = ai_control()");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Python['fun_ai_control'] = function(block) {
    // TODO: Assemble Python into code variable.
    var strout = 'ai = ai_control()'
    var code =  strout + '\n';
    return code;
};



