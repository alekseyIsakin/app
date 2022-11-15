"use strict";



const tasksListElement = document.querySelector(`.${TB_SUPPORT_ENTITY.BASE_ELEMNT_HOLDER}`);
const dropReceiver = document.querySelector(`.${TB_SUPPORT_ENTITY.DROP_RECEIVER}`);
const elementSettings = document.querySelector(`.${TB_SUPPORT_ENTITY.ELEMENT_SETTINGS}`);
const userSettingsHolder = document.querySelector(`.${TB_SUPPORT_ENTITY.USER_SETTINGS}`);


tasksListElement.appendChild(create_empty_question_placeholder())
tasksListElement.appendChild(create_empty_button_placeholder())
tasksListElement.appendChild(create_empty_label_placeholder())
tasksListElement.appendChild(create_empty_test_info_placeholder())
tasksListElement.appendChild(create_empty_sieve_placeholder())

const ATTR_ACTION = {}
ATTR_ACTION[PH_ATTR.EDITABLE] = (element) => get_content_editor(element)
ATTR_ACTION[PH_ATTR.ACTION] = (element) => create_attr_editor('action: ', PH_ATTR.ACTION, element)
ATTR_ACTION[PH_ATTR.NEED_UPDATE] = (element) => create_sieve_btn('update', '', element, update_sieve)

elementSettings.querySelector(`#${TB_SUPPORT_ENTITY.SAVE_INPUT}`).addEventListener('click', () => {
  const json = convert_editor2json()

  save_test_to_disk(JSON.stringify(json), 'test.json', 'text/plain')
})

elementSettings.querySelector(`#${TB_SUPPORT_ENTITY.LOAD_INPUT}`).addEventListener('click', () => {
  const text = elementSettings.querySelector(`#${TB_SUPPORT_ENTITY.FILE_INPUT}`).files[0]

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
elementSettings.querySelector(`#${TB_SUPPORT_ENTITY.PREVIEW_TEST}`).addEventListener('click', preview_test)

tasksListElement.addEventListener(`dragstart`, start_moving)
tasksListElement.addEventListener(`dragend`, stop_moving);

const try_parse = (text_data) => {
  return JSON.parse(text_data)
}