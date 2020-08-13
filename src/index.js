"use strict";
var refs = {
    ul: document.querySelector(".todos"),
    li: document.querySelectorAll("ul.todos > li"),
    input: document.querySelector(".input"),
    buttons: document.querySelector("#buttons"),
    i: document.querySelectorAll(".fa-trash-alt"),
    save: document.querySelector(".save"),
    clear: document.querySelector(".clear"),
    pensil: document.querySelector("#pensil"),
    showTipsButton: document.querySelector("button.showTips"),
    closeTipsButton: document.querySelector("a.closeTips"),
    overlay: document.querySelector("#overlay")
};
var keydown = function (e) {
    var target = e.target;
    if (e.code !== "Enter") {
        return;
    }
    else {
        if (refs.input.value === "") {
            return;
        }
        refs.ul.insertAdjacentHTML("beforeend", createLi(target.value));
        refs.input.value = "";
    }
};
var clickButtons = function (e) {
    switch (true) {
        case e.target === refs.save:
            localStorage.setItem("todos", refs.ul.innerHTML);
            break;
        case e.target === refs.clear:
            refs.ul.innerHTML = "";
            localStorage.removeItem("todos");
            break;
        case e.target === refs.showTipsButton:
            refs.overlay.style.height = "100%";
            break;
    }
};
function clickDeleted(e) {
    var target = e.target;
    if (target.nodeName === "I") {
        var li = target.closest("li");
        li === null || li === void 0 ? void 0 : li.remove();
        localStorage.setItem("todos", refs.ul.innerHTML);
    }
    else {
        target.classList.toggle("checked");
    }
}
var clickPensil = function () {
    refs.input.classList.toggle("display");
};
refs.closeTipsButton.addEventListener("click", function () {
    refs.overlay.style.height = "0";
});
refs.input.addEventListener("keydown", keydown);
refs.buttons.addEventListener("click", clickButtons);
refs.ul.addEventListener("click", clickDeleted);
refs.pensil.addEventListener("click", clickPensil);
loadTodos();
function createLi(value) {
    var template = " <li>\n    <span class=\"todo-text\">" + value + "</span\n    ><span class=\"todo-trash\"><i class=\"fas fa-trash-alt\"></i></span>\n  </li>";
    return template;
}
function loadTodos() {
    var data = localStorage.getItem("todos");
    if (data) {
        refs.ul.innerHTML = data;
    }
}
