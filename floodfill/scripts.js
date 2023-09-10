var state = function initState() {
  let canvasSize = 1024;
  let state = {};
  let floodArr = [];
  let pxSize = 8;
  let size = canvasSize / pxSize;
  floodArr = []
  for (let i = 0; i < size; i++) {
    var row = []
    for (let j = 0; j < size; j++) {
      let value = Math.floor(Math.random() * (1 - 0 + 1)) + 0
      row.push(value);
    }
    floodArr.push(row)
  }
  state.floodArr = floodArr
  state.pxSize = pxSize;
  return state;
}()

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var colors = ["red", "black", "lime"]
    for (let i = 0; i < state.floodArr.length; i++) {
      for (let j = 0; j < state.floodArr.length; j++) {
        let color = colors[state.floodArr[i][j]]
        ctx.fillStyle = color;
        ctx.fillRect(i * state.pxSize, j * state.pxSize, state.pxSize, state.pxSize);
      }
    }

  }
}

function floodFill(x, y) {
  stack = [[x, y]]
  alert(x+","+y)
  fillColor = state.floodArr[x][y]
  if (fillColor === 2) {
    return;
  }
  while (stack.length > 0) {
    coords = stack.pop()
    x = coords[0]
    y = coords[1]
    state.floodArr[x][y] = 2;
    if (x > 0 && state.floodArr[x - 1][y] == fillColor) {
      stack.push([x - 1, y])
    }
    if (x < (state.floodArr.length - 1) && state.floodArr[x + 1][y] == fillColor) {
      stack.push([x + 1, y])
    }
    if (y > 0 && state.floodArr[x][y - 1] == fillColor) {
      stack.push([x, y - 1])
    }
    if (y < (state.floodArr.length - 1) && state.floodArr[x][y + 1] == fillColor) {
      stack.push([x, y + 1])
    }
  }
}

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  floodFill(Math.floor(x / state.pxSize), Math.floor(y / state.pxSize));
  draw();
}

let canvasElem = document.querySelector("canvas");

canvasElem.addEventListener("mousedown", function (e) {
  getMousePosition(canvasElem, e);
});