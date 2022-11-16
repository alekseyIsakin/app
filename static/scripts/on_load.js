"use strict"

let _test_data = {}
const questions_to_check = []

const get_test_info = () => _test_data[JSON_ATTR.QUESTION_LIST].find(el => el.type == PH_CLASS.TEST_INFO)
const get_tag_list = () => localStorage[LOCALSTORAGE.ANSWERS_TAG].split(SEPARATOR)

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
const get_cnt_questions = () => _test_data[JSON_ATTR.QUESTION_LIST].filter(el => el[JSON_ATTR.TYPE] != PH_CLASS.TEST_INFO).length

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

      _test_data = json

      test_name_h.textContent = json[PH_ATTR.TEST_NAME]

      const attrs = json[JSON_ATTR.ANSWER_TAGS]
      if (attrs != '') {
        let answer_tags = ''

        attrs
          .forEach((tag) => {
            localStorage[tag[TEST_INFO.TAG_NAME]] = Number(tag[TEST_INFO.TAG_VALUE])
            answer_tags = answer_tags.concat(tag[TEST_INFO.TAG_NAME], SEPARATOR)
          })

        localStorage[LOCALSTORAGE.ANSWERS_TAG] = answer_tags.slice(0, -1)
      }

      questions_to_check.length = 0
      document.querySelectorAll(`.${TR_CLASS.QUESTION}`)
        .forEach((el) => {
          const attr = el.getAttribute(`${TR_ATTR.VALUE}`)

          if (attr) {
            localStorage[attr] = '0'
            questions_to_check.push(attr)
          }
        })

      document.querySelectorAll(`.${TR_CLASS.ANSWER}`)
        .forEach((el) => {
          el.classList.add("btn_answer")
          el.addEventListener('click', (ev) => btn_click(ev.target)
          )
        })

      set_cnt_lbl_question(get_cnt_questions())
      select_question(0)
    }
  }
}

const answer_possible_click = {}
answer_possible_click[RULES.ONLY_ONE] = (btn, parent_value) => {
  localStorage[parent_value] = btn.getAttribute(`${TR_ATTR.ACTION}`)

  btn.parentNode.childNodes
    .forEach((el) => {
      el.classList.remove('btn_answer_clicked')
    })

  btn.classList.add('btn_answer_clicked')
}

const btn_click = (btn) => {
  const v = btn.parentNode.getAttribute(`${TR_ATTR.VALUE}`)
  const rules = btn.parentNode.querySelectorAll(`[${TR_ATTR.VALUE}="${v}"] > ${TR_CLASS.RULES}`)

  rules.forEach(() => { })
  answer_possible_click[RULES.ONLY_ONE](btn, v)

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