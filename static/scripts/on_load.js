"use strict"

var test_data = {}



// ********************************************************** //
// ***************** html elements ************************** //
// ********************************************************** //

const question_holder = document.getElementById(TR_SUPPORT_ENTITY.QUESTION_HOLDER)
const next_btn = document.getElementById(TR_SUPPORT_ENTITY.BTN_NEXT)
const prev_btn = document.getElementById(TR_SUPPORT_ENTITY.BTN_PREV)

const current_quest_lbl = document.getElementById(TR_SUPPORT_ENTITY.CURRENT_QUESTION_LBL)
const count_quest_lbl = document.getElementById(TR_SUPPORT_ENTITY.COUNT_QUESTIONS_LBL)

const gradient = document.getElementById(TR_SUPPORT_ENTITY.GRADIENT);
const test_name_h = document.getElementById(TR_SUPPORT_ENTITY.TEST_NAME_HEADER)

const get_all_tests = () => document.querySelectorAll(`#${TR_SUPPORT_ENTITY.QUESTION_HOLDER} > *`)

next_btn.addEventListener('click', () => {
  select_question(
      Number(localStorage[LOCALSTORAGE.CUR_QUEST]) + 1
  )
})
prev_btn.addEventListener('click', () => {
  select_question(
      Number(localStorage[LOCALSTORAGE.CUR_QUEST]) - 1
  )
})

document.querySelector(`.${TR_SUPPORT_ENTITY.HEADER_TEXT}`).addEventListener('click', () => {
  const ask_file = document.createElement('input')
  ask_file.setAttribute('type', 'file')
  ask_file.setAttribute('accept', '.json,application/json')
  ask_file.click()

  ask_file.onchange = (evt) => {
    const f = ask_file.files[0]
    get_test_by_localhost(f)
  }
})

const get_test_by_localhost = (text) => {
  if (text) {

    var reader = new FileReader();
    reader.readAsText(text, "UTF-8");
    reader.onload = function (evt) {
      get_all_tests().forEach((el) => el.remove())
      const json = JSON.parse(evt.target.result)
      const DOM = convert_json2test(json)

      DOM.childNodes.forEach((el) => { el.hidden = true })
      DOM.firstChild.hidden = false
      question_holder.appendChild(DOM)

      localStorage.clear()
      localStorage[LOCALSTORAGE.CUR_QUEST] = 0
      test_name_h.textContent = json.name

      test_data = json

      select_question(0)
      set_cnt_lbl_question(test_data[JSON_ATTR.QUESTION_LIST].length)

      document.querySelectorAll(`.${TR_CLASS.QUESTION}`)
        .forEach((el) => {
          if (el.getAttribute(`${TR_ATTR.VALUE}`))
            localStorage[el.getAttribute(`${TR_ATTR.VALUE}`)] = '0'
        })

      document.querySelectorAll(`.${TR_CLASS.ANSWER}`)
        .forEach((el) => {
          el.addEventListener('click', (ev) => {
            const v = ev.target.parentNode.getAttribute(`${TR_ATTR.VALUE}`)
            localStorage[v] = ev.target.getAttribute(`${TR_ATTR.ACTION}`)
          })
        })

    }
  }
}




/**  @deprecated used for test version 1.0 */
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
  current_quest_lbl.className = "default_text"
  test_name_h.textContent = test.name
  // attach_events()

  select_question(0)
}