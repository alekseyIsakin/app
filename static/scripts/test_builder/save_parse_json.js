"use strict"



const create_question_holder_from_main_page = () => {
  const div = document.createElement('div')
  div.id = TR_CLASS.QUESTION_HOLDER
  div.classList.add(TR_CLASS.QUESTION_HOLDER)
  div.align = "center"
  return div
}

const create_empty_question_holder = () => {
  const div = document.createElement('div')
  div.classList.add(TR_CLASS.QUESTION)
  div.align = "center"
  return div
}
const create_empty_string = () => {
  const p = document.createElement('p')
  p.classList.add(TR_CLASS.LBL)
  return p
}
const create_empty_button = () => {
  const btn = document.createElement('button')
  btn.classList.add(TR_CLASS.BTN_ANSWER)
  btn.classList.add(TR_CLASS.ANSWER)
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
  div.classList.add(PH_BEHAVIOR.ANSWER)
  div.classList.add(PH_CLASS.BTN)
  div.setAttribute(
    JSON_ATTR.TYPE,
    PH_CLASS.BTN
  )
  div.setAttribute(
    PH_ATTR.ATTR_LIST,
    [PH_ATTR.ACTION, PH_ATTR.EDITABLE]
  )
  //div.textContent = text_content

  div.draggable = true
  return div
}
const create_empty_label_placeholder = (text_content = PH_CLASS.LBL) => {
  const div = document.createElement('div')

  div.id = PH_ID.LBL
  div.classList.add(PH_BEHAVIOR.MOVABLE)
  div.classList.add(PH_CLASS.LBL)
  div.setAttribute(
    JSON_ATTR.TYPE,
    PH_CLASS.LBL
  )
  div.setAttribute(
    PH_ATTR.ATTR_LIST,
    [PH_ATTR.EDITABLE]
  )
  //div.textContent = text_content

  div.draggable = true
  return div
}
const create_empty_test_info_placeholder = (text_content = PH_CLASS.TEST_INFO) => {
  const div = document.createElement('div')

  div.id = PH_ID.TEST_INFO
  div.classList.add(PH_BEHAVIOR.MOVABLE)
  div.classList.add(PH_CLASS.TEST_INFO)
  div.classList.add(PH_BEHAVIOR.MAY_CONTAINS_ATTR)
  div.setAttribute(
    JSON_ATTR.TYPE,
    PH_CLASS.TEST_INFO
  )
  div.setAttribute(
    TEST_INFO.TEST_RULES, []
  )
  div.setAttribute(
    PH_ATTR.ATTR_LIST,
    [TEST_INFO.NAME, TEST_INFO.AUTHOR, TEST_INFO.ANSWERS_TAG]
  )
  div.textContent = text_content
  div.draggable = true

  return div
}
const old_create_empty_sieve_placeholder = (text_content = PH_CLASS.SIEVE) => { return document.createDocumentFragment() }
const create_empty_bin_sieve_placeholder = (text_content = PH_CLASS.SIEVE) => {
  const div = document.createElement('div')

  div.id = PH_ID.SIEVE
  div.classList.add(PH_BEHAVIOR.MOVABLE)
  div.classList.add(PH_CLASS.SIEVE)
  div.classList.add(PH_BEHAVIOR.MAY_CONTAINS_ATTR)
  div.setAttribute(
    JSON_ATTR.TYPE,
    PH_CLASS.SIEVE
  )
  div.setAttribute(
    PH_ATTR.ATTR_LIST,
    [PH_BEHAVIOR.NEED_UPDATE]
  )
  div.textContent = text_content
  // div.draggable = true

  return div
}

const setup_new_ph_element = (element) => {
  element.addEventListener('dragstart', start_moving)
  element.addEventListener('dragend', stop_moving);
  element.addEventListener('click', one_click)
  add_number_to_id(element)
}
const add_number_to_id = (element, num = NaN) => {
  element.id += String(_cur_id)
  _cur_id += 1
}
const clear_drop_receiver = () => {
  dropReceiver.querySelectorAll(`:not(.${TB_SUPPORT_ENTITY.COLUMN_NAME})`)
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
  _cur_id = 0

  if (Object.hasOwn(obj, JSON_ATTR.QUESTION_LIST) == false) {
    alert('Incorrect file')
    return
  }

  const arr = obj[JSON_ATTR.QUESTION_LIST]
  const tags = obj[JSON_ATTR.ANSWER_TAGS]
  get_test_name_input().value = obj[JSON_ATTR.TEST_NAME]
  get_author_input().value = obj[JSON_ATTR.TEST_AUTHOR]
  tags.forEach((pair) => {
    const tag_pair = create_edit_tag_row({ tag_name: pair[TEST_INFO.TAG_NAME], tag_value: pair[TEST_INFO.TAG_VALUE] })
    put_tag_editor(tag_pair[TEST_INFO.TAG_NAME], tag_pair[TEST_INFO.TAG_VALUE])
  })

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
  setup_new_ph_element(one_html_element)

  if (Object.hasOwn(json, JSON_ATTR.TEXT_CONTENT))
    one_html_element.textContent = json[JSON_ATTR.TEXT_CONTENT]
  if (Object.hasOwn(json, JSON_ATTR.ATTR_LIST)) {
    json[JSON_ATTR.ATTR_LIST].forEach(attr => {
      one_html_element.setAttribute(attr, json[attr])
    })
  }

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
  const a = document.querySelectorAll(`.${TB_SUPPORT_ENTITY.DROP_RECEIVER} > .${PH_BEHAVIOR.MOVABLE}`)
  const test = {
    uuid: "",
    version: TEST_VERSION.LATEST,
    description: "",
  }
  test[JSON_ATTR.TEST_NAME] = get_test_name_input().value
  test[JSON_ATTR.TEST_AUTHOR] = get_author_input().value
  test[JSON_ATTR.ANSWER_TAGS] = get_answer_tags()
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

  const attr_list_str = node.getAttribute(PH_ATTR.ATTR_LIST)
  if (attr_list_str != null) {
    question[JSON_ATTR.ATTR_LIST] = []
    const attr_list = attr_list_str
      .split(SEPARATOR)
      .filter((attr) => attr != PH_ATTR.EDITABLE)
    attr_list
      .forEach((attr) => {
        question[JSON_ATTR.ATTR_LIST].push(attr)
        question[attr] = node.getAttribute(attr)
      })
  }

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

const preview = { enable: 0 }
let saved_editor_state = {}

const preview_test = () => {
  const newWin = window.open('/test?custom');
  const json = convert_editor2json()
  newWin.sessionStorage.setItem('custom', JSON.stringify(json))

  newWin.onload = () => {
    newWin.document.body.appendChild(DOM)
    console.log('preview')
  }
}

const convert_json2test = (json) => {

  if (Object.hasOwn(json, JSON_ATTR.QUESTION_LIST) == false) {
    alert('Incorrect file')
    return document.createDocumentFragment()
  }

  const arr = json[[JSON_ATTR.QUESTION_LIST]]
  let DOM = document.createDocumentFragment()

  let el_id = 0
  arr.forEach(el => {
    DOM.appendChild(json2test_proceed_with_children(el, String(el_id)))
    el_id += 1
  });

  return DOM
}

const json2test_proceed_with_children = (json, str) => {
  const one_html_element = JSON_TO_TEST[json.type]()
  if (one_html_element == null) return document.createDocumentFragment()

  const local_DOM = document.createDocumentFragment()
  let el_id = 0

  if (Object.hasOwn(json, JSON_ATTR.ACTION)) {
    one_html_element.setAttribute(TR_ATTR.ACTION, json[JSON_ATTR.ACTION])
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
      one_html_element.setAttribute(TR_ATTR.VALUE, str)
  }

  return local_DOM
}

// ********************************************************* //
// ********************************************************* //
// ********************************************************* //



let _cur_id = 0

const JSON_TO_RAW_HTML = {}
JSON_TO_RAW_HTML[PH_CLASS.QUESTION] = create_empty_question_placeholder;
JSON_TO_RAW_HTML[PH_CLASS.BTN] = create_empty_button_placeholder;
JSON_TO_RAW_HTML[PH_CLASS.LBL] = create_empty_label_placeholder;
JSON_TO_RAW_HTML[PH_CLASS.TEST_INFO] = create_empty_test_info_placeholder;
JSON_TO_RAW_HTML[PH_CLASS.SIEVE] = create_empty_bin_sieve_placeholder

const JSON_TO_TEST = {}
JSON_TO_TEST[PH_CLASS.QUESTION] = create_empty_question_holder;
JSON_TO_TEST[PH_CLASS.BTN] = create_empty_button;
JSON_TO_TEST[PH_CLASS.LBL] = create_empty_string;
JSON_TO_TEST[PH_CLASS.TEST_INFO] = () => { return null };
JSON_TO_TEST[PH_CLASS.SIEVE] = () => { return null };
