"use strict";
const refs = {
    ul: document.querySelector(".todos"),
    li: document.querySelectorAll("ul.todos > li"),
    input: document.querySelector(".input"),
    buttons: document.querySelector("#buttons"),
    i: document.querySelectorAll(".fa-trash-alt"),
    add: document.querySelector(".add"),
    save: document.querySelector(".save"),
    clear: document.querySelector(".clear"),
    pensil: document.querySelector("#pensil"),
    showTipsButton: document.querySelector("button.showTips"),
    closeTipsButton: document.querySelector("a.closeTips"),
    overlay: document.querySelector("#overlay"),
};
const keydown = (e) => {
    const target = e.target;
    if (e.code !== "Enter") {
        return;
    }
    else {
        if (target.value === "") {
            return;
        }
        refs.ul.insertAdjacentHTML("beforeend", createLi(target.value));
        refs.input.value = "";
    }
};
const clickButtons = ({ target }) => {
    switch (true) {
        case target === refs.save:
            localStorage.setItem("todos", refs.ul.innerHTML);
            break;
        case target === refs.clear:
            refs.ul.innerHTML = "";
            localStorage.removeItem("todos");
            break;
        case target === refs.showTipsButton:
            refs.overlay.style.height = "100%";
            break;
        case target === refs.add:
            if (refs.input.value === "") {
                return;
            }
            refs.ul.insertAdjacentHTML("beforeend", createLi(refs.input.value));
            refs.input.value = "";
    }
};
function clickDeleted(e) {
    const target = e.target;
    if (target.nodeName === "I") {
        let li = target.closest("li");
        li === null || li === void 0 ? void 0 : li.remove();
        localStorage.setItem("todos", refs.ul.innerHTML);
    }
    else {
        target.classList.toggle("checked");
    }
}
const clickPensil = () => {
    refs.input.classList.toggle("display");
};
refs.closeTipsButton.addEventListener("click", () => {
    refs.overlay.style.height = "0";
});
refs.input.addEventListener("keydown", keydown);
refs.buttons.addEventListener("click", clickButtons);
refs.ul.addEventListener("click", clickDeleted);
refs.pensil.addEventListener("click", clickPensil);
loadTodos();
function createLi(value) {
    const template = ` <li>
    <span class="todo-text">${value}</span
    ><span class="todo-trash"><i class="fas fa-trash-alt"></i></span>
  </li>`;
    return template;
}
function loadTodos() {
    const data = localStorage.getItem("todos");
    if (data) {
        refs.ul.innerHTML = data;
    }
}
