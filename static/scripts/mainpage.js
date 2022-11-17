"use strict"

const create_btn = document.getElementsByClassName("test_create")
const start_btn = document.getElementById("click_test_start")
const load_btn = document.getElementById("load-button")
const side_btns = document.getElementsByClassName("test_selector_btn")
const close_btn = document.getElementById("close_test_button")

for (let i = 0; i < create_btn.length; i++) {
    create_btn[i].addEventListener('click', () => {
        document.location.assign('/test_builder')
    })
}

start_btn.addEventListener('click', (e) => {
    const pair = new URLSearchParams();
    pair.append("uuid", "00000000-0000-0000-0000-000000000002");
    document.location.assign('/test?' + pair.toString())
})

load_btn.addEventListener('change', () => {
    
    var reader = new FileReader();
    reader.readAsText(load_btn.files[0], "UTF-8");
    
    reader.onload = function (evt) {
        sessionStorage.setItem('custom', evt.target.result)
        document.location.assign('/test?custom')
    }
})

for (let i = 0; i < side_btns.length; i++) {
    side_btns[i].addEventListener('click', () => {
        const a = document.getElementById("test_deets");
        a.setAttribute("style", "Visibility: visible;");
        a.click();

    })
}

close_btn.addEventListener('click', () => {
    const a = document.getElementById("test_deets");
    a.setAttribute("style", "Visibility: hidden;");
    a.click();
})