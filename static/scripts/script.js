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

function select_question(question) {
    if (question < 0 || question >= test_data[JSON_ATTR.QUESTION_LIST].length) { return }

    hide_all()
    update_progress_line(question)

    document.querySelectorAll('#question_holder > *')[question].hidden = false
    localStorage['selected_quest'] = question
    set_cur_lbl_question(question + 1)
}

function update_progress_line(question) {
    var progr = document.getElementById('progress_line')
    var abs = document.body.scrollWidth * (question + 1) / parseFloat(test_data[JSON_ATTR.QUESTION_LIST].length)
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