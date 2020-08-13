"use strict";

const refs = {
  ul: document.querySelector(".todos") as HTMLUListElement,
  li: document.querySelectorAll("ul.todos > li") as NodeListOf<HTMLLIElement>,
  input: document.querySelector(".input") as HTMLInputElement,
  buttons: document.querySelector("#buttons") as HTMLButtonElement,
  i: document.querySelectorAll(".fa-trash-alt"),
  add: document.querySelector(".add") as HTMLButtonElement,
  save: document.querySelector(".save") as HTMLButtonElement,
  clear: document.querySelector(".clear") as HTMLButtonElement,
  pensil: document.querySelector("#pensil") as HTMLButtonElement,
  showTipsButton: document.querySelector(
    "button.showTips"
  ) as HTMLButtonElement,
  closeTipsButton: document.querySelector("a.closeTips") as HTMLButtonElement,
  overlay: document.querySelector("#overlay") as HTMLDivElement,
};

const keydown = (e: KeyboardEvent): void => {
  const target = e.target as HTMLInputElement;
  if (e.code !== "Enter") {
    return;
  } else {
    if (target.value === "") {
      return;
    }
    refs.ul.insertAdjacentHTML("beforeend", createLi(target.value));
    refs.input.value = "";
  }
};

const clickButtons = ({ target }: MouseEvent): void => {
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

function clickDeleted(e: MouseEvent): void {
  const target = e.target as HTMLUListElement;
  if (target.nodeName === "I") {
    let li: HTMLLIElement | null = target.closest("li");
    li?.remove();
    localStorage.setItem("todos", refs.ul.innerHTML);
  } else {
    target.classList.toggle("checked");
  }
}

const clickPensil = (): void => {
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

function createLi(value: string): string {
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
