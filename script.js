const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontpicker = document.getElementById("fontPicker");
const mycanvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");

const ctx = mycanvas.getContext("2d");

colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value; //The strokeStyle property sets or returns the color, gradient, or pattern used for strokes.
  ctx.fillStyle = e.target.value; //The fillStyle property sets or returns the color, gradient, or pattern used to fill the drawing.\
});

mycanvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = event.offsetX; //The offsetX property returns the relative horizontal coordinate of the mouse pointer when a mouse event occurs.
  lastY = event.offsetY; //The offsetY property returns the relative vertical coordinate of the mouse pointer when a mouse event occurs.
});

mycanvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

mycanvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
});

canvasColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, 800, 500);
});
fontpicker.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
});

saveButton.addEventListener("click", () => {
  localStorage.setItem("canvasContents", mycanvas.toDataURL());
  let link = document.createElement("a");
  link.download = "my-canvas.png";
  link.href = mycanvas.toDataURL();
  link.click();
});

retrieveButton.addEventListener("click", () => {
  let savedcanvas = localStorage.getItem("canvasContents");
  if (savedcanvas) {
    let img = new Image();
    img.src = savedcanvas;
    img.onload = () => {
      // ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }
});
