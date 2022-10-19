const scores = [
  {score: "58", date: "17.10.2022", name: "Simon"},
  {score: "60", date: "18.10.2022", name: "Simon"},
  {score: "36", date: "20.10.2022", name: "Simon"},
  {score: "25", date: "22.10.2022", name: "Simon"},
  {score: "96", date: "16.10.2022", name: "Simon"},
  {score: "90", date: "19.10.2022", name: "Simon"},
  {score: "58", date: "17.10.2022", name: "Simon"},
  {score: "60", date: "18.10.2022", name: "Simon"},
  {score: "36", date: "20.10.2022", name: "Simon"},
  {score: "25", date: "22.10.2022", name: "Simon"},
  {score: "96", date: "16.10.2022", name: "Simon"},
  {score: "90", date: "19.10.2022", name: "Simon"},
  {score: "58", date: "17.10.2022", name: "Simon"},
  {score: "60", date: "18.10.2022", name: "Simon"},
  {score: "36", date: "20.10.2022", name: "Lukas"},
  {score: "25", date: "22.10.2022", name: "Lukas"},
  {score: "96", date: "16.10.2022", name: "Lukas"},
  {score: "90", date: "19.10.2022", name: "Lukas"},
  {score: "58", date: "17.10.2022", name: "Lukas"},
  {score: "60", date: "18.10.2022", name: "Lukas"},
  {score: "36", date: "20.10.2022", name: "Lukas"},
  {score: "25", date: "22.10.2022", name: "Lukas"},
  {score: "96", date: "16.10.2022", name: "Lukas"},
  {score: "90", date: "19.10.2022", name: "Lukas"},
  {score: "58", date: "17.10.2022", name: "Lukas"},
  {score: "60", date: "18.10.2022", name: "Lukas"},
  {score: "36", date: "20.10.2022", name: "Lukas"},
  {score: "25", date: "22.10.2022", name: "Lukas"},
  {score: "96", date: "16.10.2022", name: "Lukas"},
  {score: "90", date: "19.10.2022", name: "Lukas"},
];

function createTable(data) {
  const table = document.createElement("table");

  const tHead = document.createElement("thead");
  populateTableHead(tHead);
  table.appendChild(tHead);

  const tBody = document.createElement("tbody");
  populateTableBody(tBody, data);
  table.appendChild(tBody);

  return table;
}

function populateTableHead(tHead) {
  const row = tHead.insertRow();

  makeCell(row, 0, "#", "center");
  makeCell(row, 1, "Name");
  makeCell(row, 2, "Date");
  makeCell(row, 3, "Score");
}

function populateTableBody(tBody, data) {
  data
    .sort((a, b) => Number(a.score) > Number(b.score) ? -1 : 1)
    .forEach((item, index) => populateTableRow(tBody, item, index));
}

function populateTableRow(tableComponent, item, index) {
  const row = tableComponent.insertRow();

  makeCell(row, 0, (index + 1).toString(), "0px", "center");
  makeCell(row, 1, item.name, "auto");
  makeCell(row, 2, item.date, "60px");
  makeCell(row, 3, item.score, "20px", "center");
}

function makeCell(row, index, content, width="auto", className= "") {
  const scoreCell = row.insertCell(index);
  scoreCell.style.width = width;
  scoreCell.innerHTML = content;
  scoreCell.className = className;
}

document
  .getElementById("container-leaderboard")
  .appendChild(createTable(scores));
