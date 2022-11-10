"use strict";



const tasksListElement = () => document.querySelector(`.dragable_elements_holder`);
const dropReceivers = () => document.querySelector(`.drop_receiver`);
const elementSettings = () => document.querySelector(`.element-settings`);

document.addEventListener("DOMContentLoaded", () => {

  tasksListElement().appendChild(create_empty_question_placeholder())
  tasksListElement().appendChild(create_empty_button_placeholder())
  tasksListElement().appendChild(create_empty_label_placeholder())

  elementSettings().querySelector('#element-text').addEventListener('input', type_element_content)
  elementSettings().querySelector('#element-value').addEventListener('input', type_element_value)

  elementSettings().querySelector('#save-button').addEventListener('click', () => {
    const json = convert_editor2json()

    save_test_to_disk(JSON.stringify(json), 'test.json', 'text/plain')
  })
  elementSettings().querySelector('#load-button').addEventListener('click', () => {
    const text = elementSettings().querySelector('#load-input').files[0]

    if (text) {
      var reader = new FileReader();
      reader.readAsText(text, "UTF-8");
      reader.onload = function (evt) {
        const obj = try_parse(evt.target.result)
        const DOM = convert_json2editor(obj)
        dropReceivers().appendChild(DOM)
      }
    }

  })
  elementSettings().querySelector('#preview-button').addEventListener('click', preview_test)

  tasksListElement().addEventListener(`dragstart`, start_moving)
  tasksListElement().addEventListener(`dragend`, stop_moving);
})

const try_parse = (text_data) => {
  return JSON.parse(text_data)
}