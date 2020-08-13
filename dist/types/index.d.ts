declare const refs: {
    ul: HTMLUListElement;
    li: NodeListOf<HTMLLIElement>;
    input: HTMLInputElement;
    buttons: HTMLButtonElement;
    i: NodeListOf<Element>;
    add: HTMLButtonElement;
    save: HTMLButtonElement;
    clear: HTMLButtonElement;
    pensil: HTMLButtonElement;
    showTipsButton: HTMLButtonElement;
    closeTipsButton: HTMLButtonElement;
    overlay: HTMLDivElement;
};
declare const keydown: (e: KeyboardEvent) => void;
declare const clickButtons: ({ target }: MouseEvent) => void;
declare function clickDeleted(e: MouseEvent): void;
declare const clickPensil: () => void;
declare function createLi(value: string): string;
declare function loadTodos(): void;