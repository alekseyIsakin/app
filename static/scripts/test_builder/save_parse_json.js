"use strict"



const create_question_holder_from_main_page = () => {
  const div = document.createElement('div')
  div.id = TEST_CLASS.QUESTION_HOLDER
  div.classList.add(TEST_CLASS.QUESTION_HOLDER)
  div.align = "center"
  return div
}

const create_empty_question_holder = () => {
  const div = document.createElement('div')
  div.classList.add(TEST_CLASS.QUESTION)
  return div
}
const create_empty_string = () => {
  const p = document.createElement('p')
  p.classList.add(TEST_CLASS.LBL)
  return p
}
const create_empty_button = () => {
  const btn = document.createElement('button')
  btn.classList.add(TEST_CLASS.ANSWER)
  return btn
}



const create_empty_question_placeholder = () => {
  const div = document.createElement('div')
  div.id = PH_ID.QUESTION
  div.classList.add(PH_BEHAVIOR.MOVABLE)
  div.classList.add(PH_CLASS.QUESTION)
  div.setAttribute(
    JSON_ATTR.TYPE,
    PH_CLASS.QUESTION
  )
  div.draggable = true

  div.setAttribute('ondrop', 'drop_put_to_question(event)')
  div.setAttribute('ondragover', 'dragover_handler(event)')

  return div
}
const create_empty_button_placeholder = (text_content = PH_CLASS.BTN) => {
  const div = document.createElement('div')

  div.id = PH_ID.BTN
  div.classList.add(PH_BEHAVIOR.MOVABLE)
  div.classList.add(PH_BEHAVIOR.EDIT_CONTENT)
  div.classList.add(PH_CLASS.BTN)
  div.setAttribute(
    JSON_ATTR.TYPE,
    PH_CLASS.BTN
  )
  div.textContent = text_content

  div.draggable = true
  return div
}
const create_empty_label_placeholder = (text_content = PH_CLASS.LBL) => {
  const div = document.createElement('div')
  div.id = PH_ID.LBL
  div.classList.add(PH_BEHAVIOR.MOVABLE)
  div.classList.add(PH_BEHAVIOR.EDIT_CONTENT)
  div.classList.add(PH_CLASS.LBL)
  div.setAttribute(
    JSON_ATTR.TYPE,
    PH_CLASS.LBL
  )
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
  dropReceivers.querySelectorAll(`:not(.${SUPPORT_ENTITY.COLUMN_NAME})`)
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

  if (Object.hasOwn(obj, JSON_ATTR.QUESTION_LIST) == false) {
    alert('Incorrect file')
    return
  }
  const arr = obj[JSON_ATTR.QUESTION_LIST]
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

  if (Object.hasOwn(json, JSON_ATTR.TEXT_CONTENT))
    one_html_element.textContent = json[JSON_ATTR.TEXT_CONTENT]
  if (Object.hasOwn(json, JSON_ATTR.ACTION))
    one_html_element.setAttribute(TEST_ATTR.ACTION, json[JSON_ATTR.ACTION])

  local_DOM.appendChild(one_html_element)

  if (Object.hasOwn(json, JSON_ATTR.QUESTION_LIST)) {
    json[JSON_ATTR.QUESTION_LIST].forEach(el => {
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
  const a = document.querySelectorAll(`.${SUPPORT_ENTITY.DROP_RECEIVER} > .${PH_BEHAVIOR.MOVABLE}`)
  const test = {
    uuid: "",
    name: "",
    version: TEST_VERSION.LATEST,
    description: "",
  }
  test[JSON_ATTR.ANSWER_TAGS] = []
  test[JSON_ATTR.QUESTION_LIST] = []

  a.forEach((node) => {
    let one_question = editor2json_proceed_with_children(node)
    test[JSON_ATTR.QUESTION_LIST].push(one_question)
  })

  return test
}

const editor2json_proceed_with_children = (node) => {
  let question = {}
  let sibling = node.firstElementChild

  question[JSON_ATTR.TYPE] = node.getAttribute(JSON_ATTR.TYPE)

  if (node.getAttribute(JSON_ATTR.VALUE)){  
    question[JSON_ATTR.VALUE] = node.getAttribute(JSON_ATTR.VALUE)
  }
  if (node.getAttribute(JSON_ATTR.ACTION))
    question[JSON_ATTR.ACTION] = node.getAttribute(JSON_ATTR.ACTION)


  if (node.classList.contains(PH_CLASS.QUESTION) == false) {
    question[JSON_ATTR.TEXT_CONTENT] = node.textContent
  } else {
    question[JSON_ATTR.QUESTION_LIST] = []
  }

  while (sibling != null) {
    const sibling_question = editor2json_proceed_with_children(sibling)
    question[JSON_ATTR.QUESTION_LIST].push(sibling_question)
    sibling = sibling.nextElementSibling
  }

  return question
}



// ********************************************************* //
// ****************** json2test **************************** //
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

  if (Object.hasOwn(obj, JSON_ATTR.QUESTION_LIST) == false) {
    alert('Incorrect file')
    return document.createDocumentFragment()
  }

  const arr = obj[[JSON_ATTR.QUESTION_LIST]]
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

  if (Object.hasOwn(json, JSON_ATTR.ACTION)) {
    one_html_element.setAttribute(TEST_ATTR.ACTION, json[JSON_ATTR.ACTION])
  }
  if (Object.hasOwn(json, JSON_ATTR.TEXT_CONTENT)) {
    one_html_element.textContent = json[JSON_ATTR.TEXT_CONTENT]
  }
  local_DOM.appendChild(one_html_element)

  if (Object.hasOwn(json, JSON_ATTR.QUESTION_LIST)) {

    json[JSON_ATTR.QUESTION_LIST].forEach(el => {
      const ch = json2test_proceed_with_children(el, str + ' ' + el_id)
      el_id += 1

      one_html_element.appendChild(ch)
    });

    if (json[JSON_ATTR.QUESTION_LIST].find((el) => el.action))
      one_html_element.setAttribute(TEST_ATTR.VALUE, str)
  }

  return local_DOM
}

// ********************************************************* //
// ********************************************************* //
// ********************************************************* //



let cur_id = 0

const JSON_TO_RAW_HTML = { }
JSON_TO_RAW_HTML[PH_CLASS.QUESTION] = create_empty_question_placeholder,
JSON_TO_RAW_HTML[PH_CLASS.BTN] = create_empty_button_placeholder,
JSON_TO_RAW_HTML[PH_CLASS.LBL] = create_empty_label_placeholder

const JSON_TO_TEST = { }
JSON_TO_TEST[PH_CLASS.QUESTION]  = create_empty_question_holder,
JSON_TO_TEST[PH_CLASS.BTN]  = create_empty_button,
JSON_TO_TEST[PH_CLASS.LBL]  = create_empty_string
