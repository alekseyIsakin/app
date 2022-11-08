"use strict"

var test_data = {}
const question_holder = document.getElementById("question_holder")
const next_btn = document.getElementById("click_next")
const prev_btn = document.getElementById("click_prev")

const gradient_holder = document.getElementById("gradient_holder");
const gradient = document.getElementById("gradient");
const selected_quest_str = document.getElementById("selected_question")
const test_name_h = document.getElementById('test_name')

// const test_for_loading = JSON.stringify({ testUUID: '00000000-0000-0000-0000-000000000001' })

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const ask_file = document.createElement('input')
  ask_file.setAttribute('type', 'file')
  ask_file.setAttribute('accept', '.json,application/json')
  ask_file.click()

  ask_file.onchange = (evt) => {
    const f = ask_file.files[0]
    get_test_by_localhost(f)
  }

  // let request = new XMLHttpRequest();
  // request.open("POST", "/test", true);
  // request.setRequestHeader("Content-Type", "application/json");
  // request.addEventListener("load", function () {
  //   test_data = JSON.parse(request.response);
  //   test_receive(test_data);
  // });
  // request.send(test_for_loading);
})

const get_test_by_localhost = (text) => {
  if (text) {
    var reader = new FileReader();
    reader.readAsText(text, "UTF-8");
    reader.onload = function (evt) {
      const json = JSON.parse(evt.target.result)
      const DOM = convert_json2test(json)

      DOM.childNodes.forEach((el) => { el.hidden = true })
      DOM.firstChild.hidden = false
      question_holder.appendChild(DOM)
      
      localStorage.clear()
      localStorage['selected_quest'] = 0
      localStorage[json.uuid] = JSON.stringify({})
      selected_quest_str.className = "default_text"
      test_name_h.textContent = json.name
      
      test_data = json
      attach_events()
    
      select_question(0)
    }
  }
}

function test_receive(test) {
  for (let i = 0; i < test.questionlist.length; i++) {
    let question_div = document.createElement('div')
    let text_question = document.createElement('p')

    text_question.textContent = test.questionlist[i].Text
    question_div.className = "one_question"
    question_div.setAttribute("align", "center")

    question_div.appendChild(text_question)

    for (let j = 0; j < test.questionlist[i].Questions.length; j++) {
      let question_variant = document.createElement('div')
      let p = document.createElement('p')
      let combo_box = document.createElement('select')

      combo_box.className = "drop-down"
      combo_box.style.textAlign = "center"

      p.className = "question"
      p.style.borderWidth = 0
      p.textContent = test.questionlist[i].Questions[j]

      for (let v = 0; v < test.questionlist[i].Variants.length; v++) {

        let b = document.createElement('option')
        b.textContent = test.questionlist[i].Variants[v]
        b.value = `${i} ${j} ${v}`

        combo_box.appendChild(b)
      }

      question_variant.appendChild(p)
      question_variant.appendChild(combo_box)
      question_div.appendChild(question_variant)
    }


    question_div.hidden = true
    question_holder.appendChild(question_div)
  }

  localStorage.clear()
  localStorage['selected_quest'] = 0
  localStorage[test.uuid] = JSON.stringify({})
  selected_quest_str.className = "default_text"
  test_name_h.textContent = test.name
  attach_events()

  select_question(0)
}