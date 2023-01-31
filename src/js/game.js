import { getRandomSentence } from "./words.js";
import { makeChart } from "./chart.js";
import { addScore } from "./score.js";
import { registerMenuToggle } from "./menu.js";
const words = 10;
function createElement(type, className = undefined, children = undefined) {
    const element = document.createElement(type);
    element.className = className ?? "";
    if (typeof children !== "undefined") {
        if (Array.isArray(children)) {
            children.every(c => element.appendChild(c));
        }
        else {
            element.appendChild(children);
        }
    }
    return element;
}
function createSpan(content, className = "") {
    const span = createElement("span", className);
    span.innerText = content;
    return span;
}
function createGameUi(rootContainer) {
    const gameStats = {
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
    const presentationMode = false;
    const text = getRandomSentence(words);
    const displayUpcoming = createSpan(text, "neutral");
    const display = createElement("p", "display", displayUpcoming);
    displayUpcoming.ariaLabel = "The text which has to be typed in order to complete the challenge";
    const progress = createElement("progress");
    progress.max = text.length;
    progress.value = 0;
    progress.ariaLabel = "Shows how much of the sentence has already been typed";
    const input = createElement("input", "input");
    input.type = "text";
    input.ariaLabel = "Input field for the typing challenge";
    input.addEventListener("input", onInputChanged);
    const wpmDisplay = createElement("p");
    const updateStatsInterval = window.setInterval(updateStats, 1000);
    const gameContainer = createElement("div", "game flex flex-col", [display, progress, input, wpmDisplay]);
    rootContainer.appendChild(gameContainer);
    function onInputChanged(event) {
        const cursor = event.target.value.length;
        switch (event.inputType) {
            case "insertText": {
                if (event.target.value.length === 1) {
                    gameStats.wpmHistory = [];
                }
                const currentChar = text.charAt(cursor - 1);
                gameStats.charsPerTick++;
                if (presentationMode || event.data === currentChar) {
                    insertSpan(currentChar, "valid");
                }
                else {
                    insertSpan(event.data, "invalid");
                }
                if (event.target.value === text) {
                    window.clearInterval(updateStatsInterval);
                    input.disabled = true;
                    rootContainer.appendChild(createMenu(gameStats));
                }
                break;
            }
            case "deleteContentBackward": {
                display.removeChild(display.childNodes[display.childNodes.length - 2]);
                break;
            }
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
    function insertSpan(content, className = "") {
        display.insertBefore(createSpan(content, className), displayUpcoming);
    }
    function updateStats() {
        const currentWPM = gameStats.tick();
        wpmDisplay.innerText = Math.round(currentWPM) + " WPM";
    }
}
function createMenu(gameStats) {
    const menuTitle = createElement("h1", "menu-title");
    menuTitle.innerText = "Challenge completed!";
    const menuChart = makeChart(gameStats.wpmHistory, 240, 140);
    if (menuChart != null) {
        menuChart.ariaLabel = "A graph showing the typing performance (WPM) over time";
    }
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
        menuRestart
    ].filter(c => c);
    return createElement("menu", "menu flex flex-col", components);
}
window.onload = () => {
    registerMenuToggle();
    const rootContainer = document.getElementById("container-game");
    if (rootContainer == null) {
        console.error("Could not find root container");
        return;
    }
    createGameUi(rootContainer);
};
//# sourceMappingURL=game.js.map