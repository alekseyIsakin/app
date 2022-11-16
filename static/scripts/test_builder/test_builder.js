"use strict";



/* *************** */
/* **** sieve **** */
/* *************** */

const autoname_questions = (node, depth = -1) => {
  let index = 0
  let questions_ids = []

  dropReceiver
    .querySelectorAll(`.${PH_CLASS.QUESTION}`)
    .forEach(el => {
      el.id = PH_ID.QUESTION
      add_number_to_id(el)
    })

  node
    .parentNode
    .querySelectorAll(`#${node.parentNode.id} > .${PH_CLASS.QUESTION}`)
    .forEach(el => {
      questions_ids = questions_ids.concat(
        autoname_question_children(el, index, depth)
      )
      index++
    })

  node.innerHTML = ''

  return questions_ids
}

const autoname_question_children = (question, index, depth) => {
  question.id = `${PH_ID.QUESTION}${index}-s`
  let questions_ids = []
  questions_ids.push(question.id)

  let sub_index = 0

  if (depth != -1 && String(index).split('-').length >= depth) return questions_ids

  question
    .parentNode
    .querySelectorAll(`#${question.id} > .${PH_CLASS.QUESTION}`)
    .forEach(el => {
      let ch_ids = autoname_question_children(el, `${index}-${sub_index}`, depth)
      questions_ids = questions_ids.concat(ch_ids)
      sub_index++
    })
  return questions_ids
}

const get_answers_from_question = (question_id) => {
  const quest = dropReceiver.querySelector(`#${question_id}`)
  const answers = []
  quest == null ?
    [] :
    quest
      .parentNode
      .querySelectorAll(`#${question_id} > .${PH_BEHAVIOR.ANSWER}`)
      .forEach(el => answers.push(el.id))

  console.log(answers)
  return answers
}

const create_sieve_btn = (label, attr, element, callback = null) => {
  const div = document.createElement('div')
  const btn = document.createElement('button')
  const input = document.createElement('input')

  btn.textContent = label
  btn.addEventListener('click', (ev) => { callback(element, input.value) })

  input.value = -1
  input.type = "number"
  input.min = -1

  div.appendChild(btn)
  div.appendChild(input)

  userSettingsHolder.appendChild(div)
}

const update_sieve = (element, depth = -1) => {
  const questions = autoname_questions(element, depth)
  const test_info = get_answer_tags()

  if (test_info == null) return1

  questions.forEach(el => {
    const p = document.createElement('p')
    const drop_down = create_drop_down(get_answers_from_question(el))

    drop_down.insertBefore(
      create_empty_option('--Select--'),
      drop_down.firstChild
    )

    p.appendChild(drop_down)
    // test_info.getAttribute(TEST_INFO.ANSWERS_TAG)
    element.appendChild(p)
  })
}

/* ********************** */
/* ********************** */
/* ********************** */

const get_test_info = () => {
  let test_info = dropReceiver.querySelector('.' + PH_CLASS.TEST_INFO)
  return test_info ? test_info : null
}

const get_answer_tags = () => {
  const test_info = get_test_info()

  if (test_info == null) return []
  return test_info.getAttribute(TEST_INFO.ANSWERS_TAG).split(SEPARATOR)
}

const create_answer_tag_rule_editor = (tags, options = { id: '' }) => {
  const check_dd = userSettingsHolder.querySelector(`#${TEST_INFO.TEST_RULES}`)
  if (check_dd)
    check_dd.remove()
  
  const dd = create_drop_down(tags, options)
  userSettingsHolder.appendChild(dd)

  if (tags.length < 0) return


}

const get_selected_node_id = (return_holder = false) => {
  if (return_holder)
    return elementSettings.querySelector(`#${TB_SUPPORT_ENTITY.ELEMENT_ID_LBL}`)
  return elementSettings.querySelector(`#${TB_SUPPORT_ENTITY.ELEMENT_ID_LBL}`).textContent
}

const create_empty_option = (label = '') => {
  const p = document.createElement('option')
  p.text = label
  p.selected = true
  p.disabled = true
  return p
}

/** @param variants is array of string */
const create_drop_down = (variants, options = { id: '', }) => {
  const dropdown = document.createElement('select')
  dropdown.id = options.hasOwnProperty('id') ? options.id : ''

  variants.forEach(el => {
    const p = document.createElement('option')
    p.value = el
    p.text = el
    dropdown.appendChild(p)
  })
  return dropdown
}

const get_text_content = (node_id) => {
  const text_node = dropReceiver.querySelector(`#${node_id}`)

  return text_node == null ? null : text_node.textContent
}

/** 
 * @param callbacks contains 2 calbacks 
 * @description input func(input, attr, element) occurs when input is changed 
 * @description enter func(input, attr, element) occurs when enter is released
 * @description element is owner of attribute attr, input is html element*/
const create_attr_editor = (label, attr, element, callbacks =
  {
    input: (input, attr, element) => { }, enter: (input, attr, element) => { }
  }) => {

  const input = document.createElement('input')
  const p = document.createElement('p')

  callbacks['input'] = callbacks.hasOwnProperty('input') ? callbacks.input : () => { }
  callbacks['enter'] = callbacks.hasOwnProperty('enter') ? callbacks.enter : () => { }

  input.value = element.getAttribute(attr)
  input.addEventListener('input', (ev) => {
    if (element.getAttribute(attr) != input.value) {
      input.classList.add('changed-atribut')
    } else {
      input.classList.remove('changed-atribut')
    }
    callbacks.input(input, attr, element)
  })

  input.addEventListener('keyup', (ev) => {
    if (ev.key != 'Enter') return
    element.setAttribute(attr, input.value)
    input.classList.remove('changed-atribut')
    callbacks.enter(input, attr, element)
  })

  p.textContent = label
  p.appendChild(input)
  p.classList.add("header_text")
  p.setAttribute("style", "font-size: 25px;")
  input.id = TB_SUPPORT_ENTITY.USER_INPUT + attr
  userSettingsHolder.appendChild(p)
}
const get_input_value_holder = (element) => {
  const check_input = userSettingsHolder.querySelector(`#${TB_SUPPORT_ENTITY.VALUE_INPUT}`)
  if (check_input != null)
    return check_input

  return create_attr_editor('Действие: ', PH_ATTR.ACTION, element)
}
const get_input_content_holder = (element) => {
  const check_input = userSettingsHolder.querySelector(`#${TB_SUPPORT_ENTITY.CONTENT_INPUT}`)
  if (check_input != null)
    return check_input

  const input = document.createElement('input')
  const p = document.createElement('p')

  input.addEventListener('input', change_content)
  input.id = TB_SUPPORT_ENTITY.CONTENT_INPUT
  input.value = element.textContent

  p.textContent = 'Содержимое: '
  p.classList.add("header_text")
  p.setAttribute("style", "font-size: 25px;")
  p.appendChild(input)
  userSettingsHolder.appendChild(p)

  return input
}

const change_content = (ev) => {
  const node_element_id = get_selected_node_id()
  if (node_element_id == '') return

  const element = dropReceiver.querySelector(`#${node_element_id}`)

  if (!node_element_id || typeof (element) == 'undefined') return
  const text_content = get_input_content_holder()

  element.textContent = text_content.value
}



/* ********************** */
/* ******* moving ******* */
/* ********************** */

const start_moving = (event) => {
  if (!event.target.classList || event.target.classList.contains(PH_BEHAVIOR.MOVABLE) == false)
    return
  event.dataTransfer.setData("text/plain", event.target.id);
  event.target.classList.add(PH_STAUS.SELECTED);

  unhighlite_selections()
}
const stop_moving = (event) => {
  if (!event.target.classList || event.target.classList.contains(PH_BEHAVIOR.MOVABLE) == false)
    return

  const edited_element_id = get_selected_node_id()
  if (edited_element_id != '') {
    const edited_element = dropReceiver.querySelector(`#${edited_element_id}`)
    if (edited_element) { highlite_selection(edited_element) }
  }

  event.target.classList.remove(PH_STAUS.SELECTED);
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop_put_to_question(ev) {
  ev.preventDefault();

  if (ev.target != ev.currentTarget) return
  if (ev.target.parentNode == tasksListElement) return

  let movable_id = ev.dataTransfer.getData('text')

  const activeElement = document.getElementById(movable_id)
  if (activeElement.classList.contains(PH_CLASS.TEST_INFO)) return
  if (activeElement == null) return

  let newElemnt = activeElement

  if (activeElement.parentNode == tasksListElement) {
    newElemnt = activeElement.cloneNode(true)
    setup_new_ph_element(newElemnt)
  }

  newElemnt.classList.remove(PH_STAUS.SELECTED)
  try {
    ev.currentTarget.appendChild(newElemnt)
  }
  catch (err) {
    console.log(err)
  }
}
function drop_put_handler(ev) {
  ev.preventDefault();

  if (ev.target != dropReceiver) return
  const movable_id = ev.dataTransfer.getData('text')
  console.log(movable_id)

  const activeElement = document.getElementById(movable_id)
  if (activeElement == null) return

  if (activeElement.classList.contains(PH_CLASS.TEST_INFO) && dropReceiver.querySelector(`.${PH_CLASS.TEST_INFO}`)) return

  let newElemnt = activeElement

  if (activeElement.parentNode == tasksListElement) {
    newElemnt = activeElement.cloneNode(true)
    setup_new_ph_element(newElemnt)
  }
  newElemnt.classList.remove(PH_STAUS.SELECTED)
  ev.currentTarget.appendChild(newElemnt)
}

function drop_del_handler(ev) {
  ev.preventDefault();
  const movable_id = ev.dataTransfer.getData('text')
  const activeElement = dropReceiver.querySelector(`#${movable_id}`)

  if (activeElement != null)
    activeElement.remove()
}



/* ************************ */
/* **** select element **** */
/* ************************ */

const one_click = (ev) => {
  // cur_target - элемент на который кликнули
  const target = ev.target
  const cur_target = ev.currentTarget

  if (target != cur_target && target.classList.contains(PH_BEHAVIOR.MOVABLE) == cur_target.classList.contains(PH_BEHAVIOR.MOVABLE)) return
  if (target == cur_target || target.parentNode == cur_target) {
    const prev_selected = dropReceiver.querySelector(`.${PH_STAUS.EDITING}`)

    if (prev_selected && prev_selected != cur_target) { prev_selected.classList.remove(PH_STAUS.EDITING) }

    if (cur_target.classList.contains(PH_STAUS.EDITING)) {
      unhighlite_selections()
      show_selected_element_info(dropReceiver)
    }
    else {
      highlite_selection(cur_target)
      show_selected_element_info(cur_target)
    }
  }
}

const unhighlite_selections = () => {
  const el = dropReceiver.querySelectorAll(`.${PH_BEHAVIOR.MOVABLE}`)
  el.forEach(element => {
    element.classList.remove(PH_STAUS.NOT_EDITING)
    element.classList.remove(PH_STAUS.EDITING)
  });
}
const highlite_selection = (element) => {
  unhighlite_selections()
  element.classList.add(PH_STAUS.EDITING)
  element.classList.remove(PH_STAUS.NOT_EDITING)

  const el = dropReceiver.querySelectorAll(`.${PH_BEHAVIOR.MOVABLE}:not(.${PH_STAUS.EDITING} *, .${PH_STAUS.EDITING})`)
  el.forEach(element => {
    element.classList.add(PH_STAUS.NOT_EDITING)
  });
}


const show_selected_element_info = (element) => {
  remove_all_settings()

  const node_element_id = get_selected_node_id(true)
  const attr_list_str = element.getAttribute(PH_ATTR.ATTR_LIST)

  if (attr_list_str != null) {
    attr_list_str.split(SEPARATOR).forEach((attr) => {
      if (ATTR_ACTION.hasOwnProperty(attr)) {
        ATTR_ACTION[attr](element)
      }
      else
        create_new_attr(element, attr)
    })
  }

  node_element_id.textContent = element.id
}

const remove_all_settings = () => {
  if (userSettingsHolder.childNodes.length > 0) {
    const settings = userSettingsHolder.querySelectorAll('*')
    settings.forEach((el) => el.remove())
  }
}

const ATTR_ACTION = {}
ATTR_ACTION[PH_ATTR.EDITABLE] = (element) => get_input_content_holder(element)
ATTR_ACTION[PH_ATTR.ACTION] = (element) => create_attr_editor('Действие: ', PH_ATTR.ACTION, element)

/** @param element html object that should contain attribut PH_ATTR.ATTR_LIST */
const create_new_attr = (element, attr) => {
  create_attr_editor(`${attr}: `, attr, element)
}

const exit_btn = document.getElementById("exit_button")
exit_btn.addEventListener('click', () => {
  const a = document.createElement("a");
  a.setAttribute("href","http://127.0.0.1:3000");
  a.click();
})



