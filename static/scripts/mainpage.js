"use strict"

const create_btn = document.getElementsByClassName("test_create")

for (let i = 0; i < create_btn.length; i++)
{
    create_btn[i].addEventListener('click', () => {
        const a = document.createElement("a");
        a.setAttribute("href","http://127.0.0.1:3000/test_builder");
        a.click();
    })
}