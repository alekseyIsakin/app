let cur_id = 0

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

const json_to_raw_html = {
  'question_holder': create_empty_question_placeholder,
  'btn_placeholder': create_empty_button_placeholder,
  'text_placeholder': create_empty_label_placeholder
}



const convert_raw_test_to_json = (content, fileName, contentType) => {
  var a = document.createElement('a');
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

const convert_json_to_raw_test = (text_data) => {
  cur_id = 0
  const obj = JSON.parse(text_data)

  if (Object.hasOwn(obj, 'questionlist') == false) {
    alert('Incorrect file')
    return
  }
  const arr = obj.questionlist
  let DOM = document.createDocumentFragment()

  arr.forEach(el => {
    DOM.appendChild(proceed_with_json_children(el))
  });

  let for_delete = dropReceivers.querySelectorAll('.movable')
  for_delete.forEach((el) => { el.remove() })
  dropReceivers.appendChild(DOM)
}

const proceed_with_json_children = (json) => {
  const local_DOM = document.createDocumentFragment()
  const one_html_element = json_to_raw_html[json.type]()
  setup_new_element(one_html_element)

  local_DOM.appendChild(one_html_element)
  if (Object.hasOwn(json, 'questionlist')) {
    json.questionlist.forEach(el => {
      const ch = proceed_with_json_children(el)
      one_html_element.appendChild(ch)
    });
  }

  return local_DOM
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



const convert_to_js = () => {
  let a = document.querySelectorAll('.drop_receiver > .movable')
  test = {
    uuid: "",
    name: "",
    description: "",
    answertags: [],
    questionlist: []
  }


  a.forEach((node) => {
    let one_question = proceed_with_children(node)
    test.questionlist.push(one_question)
  })

  console.log(test)
  convert_raw_test_to_json(JSON.stringify(test), 'json.json', 'text/plain');
}

const proceed_with_children = (node) => {
  let question = {}
  let sibling = node.firstElementChild

  question['type'] = node.classList[1]

  if (node.classList.contains('question_holder') == false) {
    question['text-content'] = node.textContent
  } else {
    question['questionlist'] = []
  }

  while (sibling != null) {
    sibling_question = proceed_with_children(sibling)
    question.questionlist.push(sibling_question)
    sibling = sibling.nextElementSibling
  }

  return question
}