import { getScores, Score } from "./score.js";
import { registerMenuToggle } from "./menu.js";

function createTable(scores: Score[]) {
  const table = document.createElement("table");

  const tHead = document.createElement("thead");
  populateTableHead(tHead);
  table.appendChild(tHead);

  const tBody = document.createElement("tbody");
  populateTableBody(tBody, scores);
  table.appendChild(tBody);

  return table;
}

function populateTableHead(tHead: HTMLTableSectionElement) {
  const row = tHead.insertRow();

  makeCell(row, 0, "#", "center");
  makeCell(row, 1, "Average WPM");
  makeCell(row, 2, "Date");
}

function populateTableBody(tBody: HTMLTableSectionElement, data: Score[]) {
  data
    .sort((a, b) => Number(a.wpm) > Number(b.wpm) ? -1 : 1)
    .forEach((item, index) => populateTableRow(tBody, item, index));
}

function populateTableRow(tableComponent: HTMLTableSectionElement, item: Score, index: number) {
  const row = tableComponent.insertRow();

  makeCell(row, 0, (index + 1).toString(), "0px", "center");
  makeCell(row, 1, Math.round(item.wpm), "auto", "align-end");
  makeCell(row, 2, new Date(item.date).toLocaleDateString(), "60px");
}

function makeCell(row: HTMLTableRowElement, index: number, content: number | string, width = "auto", className = "") {
  const scoreCell = row.insertCell(index);
  scoreCell.style.width = width;
  scoreCell.innerHTML = content?.toString();
  scoreCell.className = className;
}

window.onload = () => {
  registerMenuToggle();

  document
    .getElementById("container-leaderboard")
    ?.appendChild(createTable(getScores()));
}
