"use strict";



const tasksListElement = document.querySelector(`.${TB_SUPPORT_ENTITY.BASE_ELEMNT_HOLDER}`);
const dropReceiver = document.querySelector(`.${TB_SUPPORT_ENTITY.DROP_RECEIVER}`);
const elementSettings = document.querySelector(`.${TB_SUPPORT_ENTITY.ELEMENT_SETTINGS}`);
const userSettingsHolder = document.querySelector(`.${TB_SUPPORT_ENTITY.USER_SETTINGS}`);
const project_settings = document.querySelector(`.${TB_SUPPORT_ENTITY.PROJECT_SETTINGS}`);
const close_settings_btn = document.getElementById("close_settings")
const open_settings_btn = document.getElementById("open_settings")

tasksListElement.appendChild(create_empty_question_placeholder())
tasksListElement.appendChild(create_empty_button_placeholder())
tasksListElement.appendChild(create_empty_label_placeholder())
tasksListElement.appendChild(create_empty_test_info_placeholder())
document.querySelector(`#${TB_SUPPORT_ENTITY.CREATE_TAG}`).addEventListener('click', () => create_edit_tag_row())

/*tasksListElement.appendChild(create_empty_test_info_placeholder())

const ATTR_ACTION = {}
ATTR_ACTION[PH_ATTR.EDITABLE] = (element) => get_content_editor(element)
ATTR_ACTION[PH_ATTR.ACTION] = (element) => create_attr_editor('action: ', PH_ATTR.ACTION, element)
ATTR_ACTION[TEST_INFO.ANSWERS_TAG] = (element) => create_attr_editor(
  'tags: ',
  TEST_INFO.ANSWERS_TAG,
  element, {
  enter: () => {
    const attr_list = get_answer_tags()
    create_answer_tag_rule_editor(attr_list, {id:TEST_INFO.TEST_RULES})
  },
})
ATTR_ACTION[PH_ATTR.UPDATE_SIEVE] = (element) => create_sieve_btn('update', '', element, update_sieve)*/

document.querySelector(`#${TB_SUPPORT_ENTITY.PREVIEW_TEST}`).addEventListener('click', preview_test)

document.querySelector(`#${TB_SUPPORT_ENTITY.SAVE_INPUT}`).addEventListener('click', () => {
  const json = convert_editor2json()

  save_test_to_disk(JSON.stringify(json), 'test.json', 'text/plain')
})

document.querySelector(`#${TB_SUPPORT_ENTITY.LOAD_INPUT}`).addEventListener('click', () => {
  const text = document.querySelector(`#${TB_SUPPORT_ENTITY.FILE_INPUT}`).files[0]

  if (text) {
    var reader = new FileReader();
    reader.readAsText(text, "UTF-8");
    reader.onload = function (evt) {
      const obj = try_parse(evt.target.result)
      const DOM = convert_json2editor(obj)
      dropReceiver.appendChild(DOM)
    }
  }

})

tasksListElement.addEventListener(`dragstart`, start_moving)
tasksListElement.addEventListener(`dragend`, stop_moving);
close_settings_btn.addEventListener('click', () => {
  const a = document.getElementById("settings_wnd");    
  a.setAttribute("style", "Visibility: hidden;");
  a.click();
})
open_settings_btn.addEventListener('click', () => {
  const a = document.getElementById("settings_wnd");    
  a.setAttribute("style", "Visibility: visible;");
  a.click();
})

const try_parse = (text_data) => {
  return JSON.parse(text_data)
}