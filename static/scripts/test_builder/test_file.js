let cur_id = 0


const convert_raw_test_to_json = (content, fileName, contentType) => {
  var a = document.createElement('a');
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

const convert_json_to_raw_test = (text_data) => {
  const obj = JSON.parse(text_data)


  console.log(obj)
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

const create_empty_question_placeholder = () => {
  const div = document.createElement('div')
  div.id = 'one_question_holder_'
  div.classList.add('movable')
  div.classList.add('question_holder')
  div.draggable = true
  
  div.setAttribute ('ondrop', 'drop_put_to_question(event)')
  div.setAttribute ('ondragover', 'dragover_handler(event)')

  return div
}
const create_empty_button_placeholder = () => {
  const div = document.createElement('div')
  div.id = 'btn_placeholder_'
  div.classList.add('movable')
  div.classList.add('btn_placeholder')
  div.classList.add('able-to-edit-content')
  div.textContent = 'button_holder'

  div.draggable = true
  return div
}
const create_empty_label_placeholder = () => {
  const div = document.createElement('div')
  div.id = 'text_placeholder_'
  div.classList.add('movable')
  div.classList.add('text_placeholder')
  div.classList.add('able-to-edit-content')
  div.textContent = 'label_holder'

  div.draggable = true
  return div
}
