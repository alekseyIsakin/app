"use strict"

const set_cur_lbl_question = (cur_q) => {
    current_quest_lbl.textContent = `${cur_q}`
}

const set_cnt_lbl_question = (cnt_q) => {
    count_quest_lbl.textContent = `${cnt_q}`
}


function hide_all() {
    get_all_tests().forEach((el) => { el.hidden = true })
}

const get_tag_from_expr = (expr) => {
    return expr.split('=')[0]
        .replace(/\s+/g, '')
}
const clear_expression = (expr) => {
    return expr
        .split('=')[1]
        .replace(/\s+/g, '')
}
const calc_answer = (str) => {
    let cur_tag = get_tag_from_expr(str)
    let expr = clear_expression(str)

    if (localStorage.hasOwnProperty(cur_tag) == false) {
        alert('error, unknown answer tag: ' + cur_tag)
        return
    }

    get_tag_list().forEach((tag) => expr = expr.replaceAll(tag, localStorage[tag]))


    localStorage[cur_tag] = evaluateString(expr)
}
const validate_answers = () => {
    questions_to_check.forEach(el => {
        localStorage[el].split(SEPARATOR).forEach((expression) => {
            calc_answer(expression)
        })
    })
}

function select_question(question) {

    if (question < 0)
        return
    if (question >= get_cnt_questions()) {
        validate_answers()
        let answ = ''
        localStorage[LOCALSTORAGE.ANSWERS_TAG].split(SEPARATOR).forEach(tag => answ += `${tag}: ${localStorage[tag]}\n`)
        alert(answ)
        return
    }


    hide_all()
    update_progress_line(question)

    document.querySelectorAll('#question_holder > *')[question].hidden = false
    localStorage['selected_quest'] = question
    set_cur_lbl_question(question + 1)
}

function update_progress_line(question) {
    var progr = document.getElementById('progress_line')
    var abs = document.body.scrollWidth * (question + 1) / parseFloat(get_cnt_questions())
    progr.style.webkitMaskSize = abs * 2 + "px";
}



/**  @deprecated  */
function attach_events() {
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
}

const exit_btn = document.getElementById("exit_button")
exit_btn.addEventListener('click', () => {
    document.location.assign('/')
})