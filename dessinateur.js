const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let currentColor = "#000";
let erasing = false;

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('touchstart', startDraw);

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseleave', stopDraw);
canvas.addEventListener('touchend', stopDraw);

function startDraw(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(getX(e), getY(e));
}

function draw(e) {
  if (!drawing) return;
  e.preventDefault();
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = erasing ? "#fff" : currentColor;
  ctx.lineTo(getX(e), getY(e));
  ctx.stroke();
}

function stopDraw() {
  drawing = false;
}

function getX(e) {
  return e.touches ? e.touches[0].clientX - canvas.offsetLeft : e.clientX - canvas.offsetLeft;
}

function getY(e) {
  return e.touches ? e.touches[0].clientY - canvas.offsetTop : e.clientY - canvas.offsetTop;
}

// Color picker
document.querySelectorAll('.color').forEach(btn => {
  btn.addEventListener('click', () => {
    currentColor = btn.dataset.color;
    erasing = false;
  });
});

// Tools
document.getElementById('penTool').onclick = () => erasing = false;
document.getElementById('eraserTool').onclick = () => erasing = true;

// Timer progress (60s)
let duration = 60;
let elapsed = 0;
const progress = document.getElementById('progress');
const timer = setInterval(() => {
  elapsed++;
  progress.style.width = `${100 - (elapsed / duration) * 100}%`;
  if (elapsed >= duration) clearInterval(timer);
}, 1000);



