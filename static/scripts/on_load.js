"use strict"

var test_data = {}
const question_holder = document.getElementById("question_holder")
const next_btn = document.getElementById("click_next")
const prev_btn = document.getElementById("click_prev")

const gradient_holder = document.getElementById("gradient_holder");
const gradient = document.getElementById("gradient");
const selected_quest_str = document.getElementById("selected_question")
const test_name_h = document.getElementById('test_name')

const test_for_loading = JSON.stringify({testUUID: '00000000-0000-0000-0000-000000000001'})

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  let request = new XMLHttpRequest();
    request.open("POST", "/postgrestest", true);   
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      test_data = JSON.parse(request.response);
      // test_receive(test_data);
      console.log(test_data)
    });
    request.send(test_for_loading);
})

function test_receive(test){
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