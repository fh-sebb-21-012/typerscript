function createGame() {
  const rootContainer = document.createElement("div");

  const menuPauseContainer = document.createElement("div");

  rootContainer.appendChild(createGameUi());
  return rootContainer;
}

function createGameUi() {
  const presentationMode = false;
  const text = "The quick brown fox jumps over the lazy dog";

  const gameContainer = document.createElement("div");
  gameContainer.className = "game flex flex-col"

  const displayUpcoming = makeSpan(text, "neutral");

  const display = document.createElement("p");
  display.className = "display";
  display.appendChild(displayUpcoming);

  const progress = document.createElement("progress");
  progress.max = text.length;
  progress.value = 0;

  const input = document.createElement("input"); // todo hide but always focus
  input.type = "text";
  input.className = "input";
  input.addEventListener('input', onInputChanged);
  input.addEventListener('change', onInputChanged);
  input.addEventListener('propertychange', onInputChanged);

  function onInputChanged(event) {
    const cursor = event.target.value.length;
    switch (event.inputType) {
      // Character typed
      case "insertText":
        const currentChar = text.at(cursor - 1);
        if (presentationMode || event.data === currentChar) {
          insertSpan(currentChar, "valid");
        } else {
          insertSpan(event.data, "invalid");
        }

        progress.value = event.target.value.length;

        if (event.target.value === text) {
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
    displayUpcoming.innerHTML = text.substring(cursor);
  }

  function insertSpan(content, className = "") {
    display.insertBefore(makeSpan(content, className), displayUpcoming);
  }

  gameContainer.appendChild(display);
  gameContainer.appendChild(progress);
  gameContainer.appendChild(input);
  return gameContainer;
}

function makeSpan(content, className = "") {
  const span = document.createElement("span");
  span.innerText = content;
  span.className = className;
  return span;
}

document
  .getElementById("container-game")
  .appendChild(createGame());
