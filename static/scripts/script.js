"use strict"


function setwidth(val) {
    let percent = 100 * ((Number(val) + 1) / test_data.questionlist.length)
    
    gradient.setAttribute('style', `background: 
        linear-gradient(to right, green 0% ${percent - 4}%, yellow ${percent + 1}% 100%);`)
}

function attach_events(){

    next_btn.addEventListener('click', () => {
        select_question( Number(localStorage['selected_quest']) + 1)
    })
    prev_btn.addEventListener('click', () => {
        select_question( Number(localStorage['selected_quest']) - 1)
    })
}
    
function get_question_id(question) {
    let arr = question.split(' ')
    if (arr.length == 0)
        return ''
    return `${arr[0]}`
}

function question_is_answered(question, remove = false) {
    if (!localStorage[test_data.uuid])
        { localStorage[test_data.uuid] = JSON.stringify({}) }
    
    let quest = get_question_id(question)
    let selected_quest = JSON.parse(localStorage[test_data.uuid])

    selected_quest[quest] = question.split(' ').slice(-1)[0]
    localStorage[test_data.uuid] = JSON.stringify(selected_quest)
}

function hide_all() {
    var test_holder = document.getElementsByClassName('one_question');

    for (let ch = 0; ch < test_holder.length; ch++) {
        test_holder[ch].hidden = true
    }
}

function button_click(event) {
    var question = event.rangeParent.parentNode.value
    select_question(question)
}

function select_question(question) {
    if (question < 0 || question >= test_data.questionlist.length)
        { return }

    hide_all()
    update_progress_line(question)
    document.getElementsByClassName('one_question')[question].hidden = false
    selected_quest_str.textContent = `<\xa0\xa0\xa0${question + 1} / ${test_data.questionlist.length}\xa0\xa0\xa0>`
    localStorage['selected_quest'] = question
}

function combo_box_answer_click(event) {
    var question = event.target.value
    question_is_answered(question)
}

function update_progress_line(question) {
    var progr = document.getElementById('progress_line')
    var abs = document.body.scrollWidth * question / parseFloat(test_data.questionlist.length)
    progr.style.webkitMaskSize = abs * 2 + "px";
}