export function makeChart(values, width, height, gridSize = 20, padding = 16) {
  console.log(values);

  let maxValue = 0;
  for (const v of values) {
    if (v > maxValue) {
      maxValue = v;
    }
  }

  const heightMult = height / maxValue;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.font = "12px sans-serif";

  const spaceX = width / values.length;

  let t = 0;
  while ((t += gridSize) <= (maxValue + padding)) {
    drawHGridLine(t);
  }

  drawHAxis();
  drawVAxis();
  drawValues();

  function drawValues() {
    const [firstValue, ...otherValues] = values;
    ctx.beginPath();
    ctx.moveTo(padding, ((maxValue - firstValue) * heightMult) + padding);
    ctx.strokeStyle = "#1f1f1f";
    otherValues.every((v, i) => {
      drawValue(i + 1, v);
      return true;
    });
    ctx.stroke();

    values.every((v, i) => {
      drawVGridLine(i + 1);
      drawCircle(i, v);
      return true;
    });
  }

  function drawValue(index, value) {
    const x = (index * spaceX) + padding;
    const y = ((maxValue - value) * heightMult) + padding;
    ctx.lineTo(x, y);
  }

  function drawVGridLine(index) {
    const x = (index * spaceX) + padding;

    ctx.beginPath();
    ctx.moveTo(x, height - 3);
    ctx.lineTo(x, 0);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#aaaaaa";
    ctx.stroke();
  }

  function drawHGridLine(value) {
    const y = ((maxValue - value) * heightMult) + padding;

    ctx.fillText(value, 0, y);

    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width, y);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#aaaaaa";
    ctx.stroke();
  }

  function drawCircle(index, value, radius = 4) {
    const x = (index * spaceX) + padding;
    const y = ((maxValue - value) * heightMult) + padding;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#1f1f1f';
    ctx.strokeStyle = "#1f1f1f";
    ctx.fill();
    ctx.stroke();
  }

  function drawHAxis() {
    drawAxis(width, 1, padding, 1);
  }

  function drawVAxis() {
    drawAxis(0, height, padding, 0);
  }

  function drawAxis(toX, toY, offsetX = 0, offsetY = 0) {
    ctx.beginPath();
    ctx.moveTo(offsetX, height - offsetY);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#313131";
    ctx.lineTo(offsetX + toX, height - offsetY - toY);
    ctx.stroke();
  }

  return canvas;
}
