import { getRandomSentence, getRandomWord } from "./words.js";
import { makeChart } from "./chart.js";
import { addScore } from "./score.js";

interface GameStats {
  charsPerTick: number,
  wpmHistory: number[],
  tick: () => number;
  averageWpm: () => number;
}

const words = 10;

function createElement(
  type: string,
  className: string | undefined = undefined,
  children: HTMLElement[] | HTMLElement | undefined = undefined,
) {
  const element = document.createElement(type);
  element.className = className ?? "";

  if (typeof children !== "undefined") {
    if (Array.isArray(children)) {
      children.every(c => element.appendChild(c));
    } else {
      element.appendChild(children);
    }
  }

  return element;
}

function createSpan(content: string, className = ""): HTMLSpanElement {
  const span = createElement("span", className);
  span.innerText = content;
  return span;
}

function createGameUi(rootContainer: HTMLDivElement) {
  const gameStats: GameStats = {
    charsPerTick: 0,
    wpmHistory: [],
    averageWpm: () => {
      if (gameStats.wpmHistory.length < 1) {
        return 0;
      }

      let sum = 0;
      gameStats.wpmHistory.every(v => sum += v);
      return sum / gameStats.wpmHistory.length;
    },
    tick: () => {
      const currentWpm = gameStats.charsPerTick * 12;
      gameStats.wpmHistory.push(currentWpm);
      gameStats.charsPerTick = 0;
      return currentWpm;
    },
  };

//region game
  const presentationMode = false;
  const text = getRandomSentence(words);

  const displayUpcoming = createSpan(text, "neutral");
  const display = createElement("p", "display", displayUpcoming) as HTMLParagraphElement;

  const progress = createElement("progress") as HTMLProgressElement;
  progress.max = text.length;
  progress.value = 0;

  const input = createElement("input", "input") as HTMLInputElement;
  input.type = "text";
  input.addEventListener("input", onInputChanged);

  const wpmDisplay = createElement("p") as HTMLParagraphElement;

//endregion

  const updateStatsInterval = window.setInterval(updateStats, 1000);

  const gameContainer = createElement("div", "game flex flex-col", [display, progress, input, wpmDisplay]);
  rootContainer.appendChild(gameContainer);

  function onInputChanged(event : any) {
    const cursor = event.target.value.length;
    switch (event.inputType) {
      // Character typed
      case "insertText": {
        if (event.target.value.length === 1) {
          gameStats.wpmHistory = [];
        }

        const currentChar = text.charAt(cursor - 1);

        gameStats.charsPerTick++;

        if (presentationMode || event.data === currentChar) {
          insertSpan(currentChar, "valid");
        } else {
          insertSpan(event.data, "invalid");
        }

        if (event.target.value === text) {
          window.clearInterval(updateStatsInterval);
          input.disabled = true;
          rootContainer.appendChild(createMenu(gameStats));
        }
        break;
      }

      // Backspace
      case "deleteContentBackward": {
        display.removeChild(display.childNodes[display.childNodes.length - 2]);
        break;
      }

      // Ctrl + Backspace
      case "deleteWordBackward": {
        const index = event.target.value.lastIndexOf(" ");

        let temp;
        while ((temp = (display.childNodes.length - 2)) > index) {
          display.removeChild(display.childNodes[temp]);
        }

        break;
      }
    }

    progress.value = event.target.value.length;
    displayUpcoming.innerHTML = text.substring(cursor);
  }

  function insertSpan(content: string, className = "") {
    display.insertBefore(createSpan(content, className), displayUpcoming);
  }

  function updateStats() {
    const currentWPM = gameStats.tick();
    wpmDisplay.innerText = Math.round(currentWPM) + " WPM";
  }
}

function createMenu(gameStats: GameStats): HTMLDivElement {
  const menuTitle = createElement("h1", "menu-title");
  menuTitle.innerText = "Challenge completed!";

  const menuChart = makeChart(gameStats.wpmHistory, 240, 140);

  const menuStats = createElement("p", "menu-stats");
  menuStats.innerText = "Average WPM: " + Math.round(gameStats.averageWpm());

  const menuSave = createElement("button");
  menuSave.innerText = "Save score to leaderboard";
  menuSave.onclick = () => {
    addScore({ wpm: gameStats.averageWpm(), date: Date.now() });
    window.location.href = "./leaderboard.html";
  };

  const menuRestart = createElement("button");
  menuRestart.innerText = "Restart";
  menuRestart.onclick = () => window.location.reload();

  const components = [
    menuTitle,
    menuChart,
    menuStats,
    menuSave,
    menuRestart].filter(c => c) as HTMLElement[];

  return createElement(
    "menu",
    "menu flex flex-col",
    components
  ) as HTMLDivElement;
}

const rootContainer = document.getElementById("container-game") as HTMLDivElement;
createGameUi(rootContainer);
