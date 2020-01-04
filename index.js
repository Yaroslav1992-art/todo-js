"use strict";

const refs = {
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

const keydown = e => {
  if (e.code !== "Enter") {
    return;
  } else {
    if (refs.input.value === "") {
      return;
    }
    refs.ul.insertAdjacentHTML("beforeend", createLi(e.target.value));
    refs.input.value = "";
  }
};

const clickButtons = e => {
  if (e.target === refs.save) {
    localStorage.setItem("todos", refs.ul.innerHTML);
  } else if (e.target === refs.clear) {
    refs.ul.innerHTML = "";
    localStorage.removeItem("todos", refs.ul.innerHTML);
  }
};

function clickDeleted(e) {
  if (e.target.nodeName === "I") {
    let li = e.target.closest("li");
    li.remove();
    localStorage.setItem("todos", refs.ul.innerHTML);
  } else {
    e.target.classList.toggle("checked");
  }
}

const clickPensil = () => {
  refs.input.classList.toggle("display");
};

refs.showTipsButton.addEventListener("click", () => {
  overlay.style.height = "100%";
});
refs.closeTipsButton.addEventListener("click", () => {
  overlay.style.height = "0";
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
