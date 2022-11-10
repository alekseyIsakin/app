"use strict";



const start_moving = (event) => {
  if (!event.target.classList || event.target.classList.contains('movable') == false)
    return
  event.dataTransfer.setData("text/plain", event.target.id);
  event.target.classList.add(`selected`);

  unhighlite_selections()
}
const stop_moving = (event) => {
  if (!event.target.classList || event.target.classList.contains('movable') == false)
    return

  const edited_element_id = elementSettings.querySelector('#element-id').textContent
  if (edited_element_id != '') {
    const edited_element = dropReceivers.querySelector(`#${edited_element_id}`)
    if (edited_element) { highlite_selection(edited_element) }
  }

  event.target.classList.remove(`selected`);
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

  newElemnt.classList.remove('selected')
  try {
    ev.currentTarget.appendChild(newElemnt)
  }
  catch (err) {
    //
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
  newElemnt.classList.remove('selected')
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

  if (target != cur_target && target.classList.contains('movable') == cur_target.classList.contains('movable')) return
  if (target == cur_target || target.parentNode == cur_target) {
    const prev_selected = dropReceivers.querySelector('.selected_for_editing')

    if (prev_selected && prev_selected != cur_target) { prev_selected.classList.remove('selected_for_editing') }

    if (cur_target.classList.contains('selected_for_editing')) {
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
  const el = dropReceivers.querySelectorAll('.movable')
  el.forEach(element => {
    element.classList.remove('non_selected_for_editing')
    element.classList.remove('selected_for_editing')
  });
}
const highlite_selection = (element) => {
  unhighlite_selections()
  element.classList.add('selected_for_editing')
  element.classList.remove('non_selected_for_editing')

  const el = dropReceivers.querySelectorAll('.movable:not(.selected_for_editing *, .selected_for_editing)')
  el.forEach(element => {
    element.classList.add('non_selected_for_editing')
  });
}

const show_selected_element_info = (element) => {
  const node_element_id = elementSettings.querySelector('#element-id')

  if (!node_element_id || typeof (element) == 'undefined') return
  const text_content = elementSettings.querySelector('#element-text')
  const value_content = elementSettings.querySelector('#element-value')

  if (element.classList.contains('able-to-edit-content')) {
    text_content.parentNode.hidden = false
    value_content.parentNode.hidden = false
    text_content.value = element.textContent
    value_content.value = element.getAttribute('action')
  } else {
    text_content.parentNode.hidden = true
    value_content.parentNode.hidden = true
    text_content.value = ''
    value_content.value = ''
  }
  node_element_id.textContent = element.id
}

const type_element_content = (ev) => {
  const node_element_id = elementSettings.querySelector('#element-id').textContent
  if (node_element_id == '') return

  const element = dropReceivers.querySelector(`#${node_element_id}`)

  if (!node_element_id || typeof (element) == 'undefined') return
  const text_content = elementSettings.querySelector('#element-text')

  element.textContent = text_content.value
}

const type_element_value = (ev) => {
  const node_element_id = elementSettings.querySelector('#element-id').textContent
  if (node_element_id == '') return

  const element = dropReceivers.querySelector(`#${node_element_id}`)

  if (!node_element_id || typeof (element) == 'undefined') return
  const text_content = elementSettings.querySelector('#element-value')

  if (text_content == '')
    element.removeAttribute('action')
  else
    element.setAttribute('action', text_content.value)
}
