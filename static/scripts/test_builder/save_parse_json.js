"use strict"



const create_question_holder_from_main_page = () => {
  const div = document.createElement('div')
  div.id = "question_holder"
  div.classList.add("bordered")
  div.align = "center"
  return div
}

const create_empty_question_placeholder = () => {
  const div = document.createElement('div')
  div.id = 'one_question_holder_'
  div.classList.add('movable')
  div.classList.add('question_holder')
  div.draggable = true

  div.setAttribute('ondrop', 'drop_put_to_question(event)')
  div.setAttribute('ondragover', 'dragover_handler(event)')

  return div
}
const create_empty_button_placeholder = (text_content = 'button_holder') => {
  const div = document.createElement('div')
  div.id = 'btn_placeholder_'
  div.classList.add('movable')
  div.classList.add('btn_placeholder')
  div.classList.add('able-to-edit-content')
  div.textContent = text_content

  div.draggable = true
  return div
}
const create_empty_label_placeholder = (text_content = 'label_holder') => {
  const div = document.createElement('div')
  div.id = 'text_placeholder_'
  div.classList.add('movable')
  div.classList.add('text_placeholder')
  div.classList.add('able-to-edit-content')
  div.textContent = text_content

  div.draggable = true
  return div
}
const setup_new_element = (element) => {
  element.addEventListener('dragstart', start_moving)
  element.addEventListener('dragend', stop_moving);
  element.addEventListener('click', one_click)
  add_number_to_id(element)
}
const add_number_to_id = (element) => {
  element.id += String(cur_id)
  cur_id += 1
}
const clear_drop_receiver = () => {
  dropReceivers.querySelectorAll(':not(.column_name)')
    .forEach((el) => { el.remove() })
}


// ********************************************************* //
// ****************** json2editor ************************** //
// ********************************************************* //

const save_test_to_disk = (content, fileName, contentType) => {
  var a = document.createElement('a');
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

const convert_json2editor = (obj) => {
  cur_id = 0

  if (Object.hasOwn(obj, 'questionlist') == false) {
    alert('Incorrect file')
    return
  }
  const arr = obj.questionlist
  let DOM = document.createDocumentFragment()

  arr.forEach(el => {
    DOM.appendChild(json2editor_proceed_with_children(el))
  });

  clear_drop_receiver()
  return DOM
}

const json2editor_proceed_with_children = (json) => {
  const local_DOM = document.createDocumentFragment()
  const one_html_element = JSON_TO_RAW_HTML[json.type]()
  setup_new_element(one_html_element)

  if (Object.hasOwn(json, 'text-content'))
    one_html_element.textContent = json['text-content']
  if (Object.hasOwn(json, 'action'))
    one_html_element.setAttribute('action', json['action'])

  local_DOM.appendChild(one_html_element)

  if (Object.hasOwn(json, 'questionlist')) {
    json.questionlist.forEach(el => {
      const ch = json2editor_proceed_with_children(el)
      one_html_element.appendChild(ch)
    });

  }

  return local_DOM
}



// ********************************************************* //
// ******************* editor2json ************************* //
// ********************************************************* //

const convert_editor2json = () => {
  const a = document.querySelectorAll('.drop_receiver > .movable')
  const test = {
    uuid: "",
    name: "",
    version: TEST_VERSION.LATEST,
    description: "",
    answertags: [],
    questionlist: []
  }

  a.forEach((node) => {
    let one_question = editor2json_proceed_with_children(node)
    test.questionlist.push(one_question)
  })

  return test
}

const editor2json_proceed_with_children = (node) => {
  let question = {}
  let sibling = node.firstElementChild

  question['type'] = node.classList[1]

  if (node.getAttribute('value'))
    question['value'] = node.getAttribute('value')
  if (node.getAttribute('action'))
    question['action'] = node.getAttribute('action')


  if (node.classList.contains('question_holder') == false) {
    question['text-content'] = node.textContent
  } else {
    question['questionlist'] = []
  }

  while (sibling != null) {
    const sibling_question = editor2json_proceed_with_children(sibling)
    question.questionlist.push(sibling_question)
    sibling = sibling.nextElementSibling
  }

  return question
}



// ********************************************************* //
// ********************************************************* //
// ********************************************************* //
const preview = {enable: 0}
let saved_editor_state = {}

const preview_test = () => {
  const DOM = document.createDocumentFragment()

  if (preview.enable == 0){
    const json = convert_editor2json()
    saved_editor_state = json
    const d = convert_json2test(json)
    if (d){
      const div = create_question_holder_from_main_page()
      div.appendChild(d)
  
      DOM.appendChild(div)
      preview.enable = 1
      unhighlite_selections()
      show_selected_element_info(dropReceivers)
    }
  }else{
    DOM.appendChild(convert_json2editor(saved_editor_state))
    preview.enable = 0
  }
  
  clear_drop_receiver()
  dropReceivers.appendChild(DOM)
}

const convert_json2test = (obj) => {
  cur_id = 0

  if (Object.hasOwn(obj, 'questionlist') == false) {
    alert('Incorrect file')
    return document.createDocumentFragment()
  }

  const arr = obj.questionlist
  let DOM = document.createDocumentFragment()

  let el_id = 0
  arr.forEach(el => {
    DOM.appendChild(json2test_proceed_with_children(el, String(el_id)))
    el_id += 1
  });

  return DOM
}

const json2test_proceed_with_children = (json, str) => {
  const local_DOM = document.createDocumentFragment()
  const one_html_element = JSON_TO_TEST[json.type]()
  let el_id = 0

  if (Object.hasOwn(json, 'action')) {
    one_html_element.setAttribute('action', json['action'])
  }
  if (Object.hasOwn(json, 'text-content')) {
    one_html_element.textContent = json['text-content']
  }
  local_DOM.appendChild(one_html_element)

  if (Object.hasOwn(json, 'questionlist')) {

    json.questionlist.forEach(el => {
      const ch = json2test_proceed_with_children(el, str + ' ' + el_id)
      el_id += 1

      one_html_element.appendChild(ch)
    });

    if (json.questionlist.find((el) => el.action))
      one_html_element.setAttribute('value', str)
  }

  return local_DOM
}

const create_empty_question_holder = () => {
  const div = document.createElement('div')
  div.classList.add('one_question')
  return div
}
const create_empty_string = () => {
  const p = document.createElement('p')
  p.classList.add('question_text')
  return p
}
const create_empty_button = () => {
  const btn = document.createElement('button')
  btn.classList.add('answer')
  return btn
}

// ********************************************************* //
// ********************************************************* //
// ********************************************************* //



let cur_id = 0
const TEST_VERSION = {
  'LATEST': '2.0'
}

const JSON_TO_RAW_HTML = {
  'question_holder': create_empty_question_placeholder,
  'btn_placeholder': create_empty_button_placeholder,
  'text_placeholder': create_empty_label_placeholder
}

const JSON_TO_TEST = {
  'question_holder': create_empty_question_holder,
  'btn_placeholder': create_empty_button,
  'text_placeholder': create_empty_string
}
