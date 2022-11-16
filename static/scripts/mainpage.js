"use strict"

const create_btn = document.getElementsByClassName("test_create")
const start_btn = document.getElementById("click_test_start")
const side_btns = document.getElementsByClassName("test_selector_btn")
const close_btn = document.getElementById("click_test_close")

for (let i = 0; i < create_btn.length; i++)
{
    create_btn[i].addEventListener('click', () => {
        const a = document.createElement("a");
        a.setAttribute("href","http://127.0.0.1:3000/test_builder");
        a.click();
    })
}

start_btn.addEventListener('click', () => {
    const a = document.createElement("a");
    a.setAttribute("href","http://127.0.0.1:3000/test");
    a.click();
})

for(let i=0;i<side_btns.length;i++)
{
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