function createGame() : HTMLDivElement{

  const rootContainer : HTMLDivElement = document.createElement("div");

  const menuPauseContainer : HTMLDivElement = document.createElement("div");

  rootContainer.appendChild(createGameUi());
  return rootContainer;
}

function createGameUi() : HTMLDivElement{
  const presentationMode : boolean = false;
  const text : string = "The quick brown fox jumps over the lazy dog";

  const gameContainer : HTMLDivElement = document.createElement("div");
  gameContainer.className = "game flex flex-col"

  const displayUpcoming : HTMLElement = makeSpan(text, "neutral");

  const display : HTMLParagraphElement = document.createElement("p");
  display.className = "display";
  display.appendChild(displayUpcoming);

  const progress : HTMLProgressElement = document.createElement("progress");
  progress.max = text.length;
  progress.value = 0;

  const input : HTMLInputElement = document.createElement("input"); // todo hide but always focus
  input.type = "text";
  input.className = "input";
  input.addEventListener('input', onInputChanged);
  input.addEventListener('change', onInputChanged);
  input.addEventListener('propertychange', onInputChanged);

  function onInputChanged(event : InputEvent) {
    const target = event.target as HTMLInputElement; //todo target is weird
    const cursor = target.value.length;
    switch (event.inputType) {
      // Character typed
      case "insertText":
        const currentChar : string = text.charAt(cursor - 1);
        if (presentationMode || event.data === currentChar) {
          insertSpan(currentChar, "valid");
        } else {
          insertSpan(event.data, "invalid");
        }

        if (target.value === text) {
          // todo win
          console.log("Yay you did it");
          input.disabled = true;
        }

        break;
      // Backspace
      case "deleteContentBackward":
        display.removeChild(display.childNodes[display.childNodes.length - 2]);
        break;
      // Ctrl + Backspace
      case "deleteWordBackward":
        break;
    }

    progress.value = target.value.length;
    displayUpcoming.innerHTML = text.substring(cursor);
  }

  function insertSpan(content : string, className : string = "") {
    display.insertBefore(makeSpan(content, className), displayUpcoming);
  }

  gameContainer.appendChild(display);
  gameContainer.appendChild(progress);
  gameContainer.appendChild(input);
  return gameContainer;
}

function makeSpan(content : string, className :string = "") : HTMLSpanElement {
  const span : HTMLSpanElement = document.createElement("span");
  span.innerText = content;
  span.className = className;
  return span;
}

document
  .getElementById("container-game")
  .appendChild(createGame());
