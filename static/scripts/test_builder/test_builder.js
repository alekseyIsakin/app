"use strict";


const get_selected_node_id = () => {
  return elementSettings.querySelector(`#${TB_SUPPORT_ENTITY.ELEMENT_ID_LBL}`).textContent
}
const get_input_value_holder = () => {
  return elementSettings.querySelector(`#${TB_SUPPORT_ENTITY.VALUE_INPUT}`)
}
const get_input_content_holder = () => {
  return elementSettings.querySelector(`#${TB_SUPPORT_ENTITY.CONTENT_INPUT}`)
}

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
    const edited_element = dropReceivers.querySelector(`#${edited_element_id}`)
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
  if (activeElement == null) return

  let newElemnt = activeElement

  if (activeElement.parentNode == tasksListElement) {
    newElemnt = activeElement.cloneNode(true)
    setup_new_element(newElemnt)
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

  if (ev.target != dropReceivers) return

  const movable_id = ev.dataTransfer.getData('text')

  const activeElement = document.getElementById(movable_id)
  if (activeElement == null) return

  let newElemnt = activeElement

  if (activeElement.parentNode == tasksListElement) {
    newElemnt = activeElement.cloneNode(true)
    setup_new_element(newElemnt)
  }
  newElemnt.classList.remove(PH_STAUS.SELECTED)
  ev.currentTarget.appendChild(newElemnt)
}

function drop_del_handler(ev) {
  ev.preventDefault();
  const movable_id = ev.dataTransfer.getData('text')
  const activeElement = dropReceivers.querySelector(`#${movable_id}`)
  activeElement.remove()
}

const one_click = (ev) => {
  // cur_target - элемент на который кликнули
  const target = ev.target
  const cur_target = ev.currentTarget

  if (target != cur_target && target.classList.contains(PH_BEHAVIOR.MOVABLE) == cur_target.classList.contains(PH_BEHAVIOR.MOVABLE)) return
  if (target == cur_target || target.parentNode == cur_target) {
    const prev_selected = dropReceivers.querySelector(`.${PH_STAUS.EDITING}`)

    if (prev_selected && prev_selected != cur_target) { prev_selected.classList.remove(PH_STAUS.EDITING) }

    if (cur_target.classList.contains(PH_STAUS.EDITING)) {
      unhighlite_selections()
      show_selected_element_info(dropReceivers)
    }
    else {
      highlite_selection(cur_target)
      show_selected_element_info(cur_target)
    }
  }
}

const unhighlite_selections = () => {
  const el = dropReceivers.querySelectorAll(`.${PH_BEHAVIOR.MOVABLE}`)
  el.forEach(element => {
    element.classList.remove(PH_STAUS.NOT_EDITING)
    element.classList.remove(PH_STAUS.EDITING)
  });
}
const highlite_selection = (element) => {
  unhighlite_selections()
  element.classList.add(PH_STAUS.EDITING)
  element.classList.remove(PH_STAUS.NOT_EDITING)

  const el = dropReceivers.querySelectorAll(`.${PH_BEHAVIOR.MOVABLE}:not(.${PH_STAUS.EDITING} *, .${PH_STAUS.EDITING})`)
  el.forEach(element => {
    element.classList.add(PH_STAUS.NOT_EDITING)
  });
}

const show_selected_element_info = (element) => {
  const node_element_id = get_selected_node_id()

  if (!node_element_id || typeof (element) == 'undefined') return
  const text_content = get_input_content_holder()
  const value_content = get_input_value_holder()

  if (element.classList.contains(PH_BEHAVIOR.EDIT_CONTENT)) {
    text_content.parentNode.hidden = false
    value_content.parentNode.hidden = false
    text_content.value = element.textContent
    value_content.value = element.getAttribute(TR_ATTR.ACTION)
  } else {
    text_content.parentNode.hidden = true
    value_content.parentNode.hidden = true
    text_content.value = ''
    value_content.value = ''
  }
  node_element_id.textContent = element.id
}

const type_element_content = (ev) => {
  const node_element_id = get_selected_node_id()
  if (node_element_id == '') return

  const element = dropReceivers.querySelector(`#${node_element_id}`)

  if (!node_element_id || typeof (element) == 'undefined') return
  const text_content = get_input_content_holder()

  element.textContent = text_content.value
}

const type_element_value = (ev) => {
  const node_element_id = get_selected_node_id()
  if (node_element_id == '') return

  const element = dropReceivers.querySelector(`#${node_element_id}`)

  if (!node_element_id || typeof (element) == 'undefined') return
  const text_content = get_input_value_holder()

  if (text_content == '')
    element.removeAttribute(TR_ATTR.ACTION)
  else
    element.setAttribute(TR_ATTR.ACTION, text_content.value)
}
