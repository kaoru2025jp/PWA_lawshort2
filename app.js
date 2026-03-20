function calculate() {
  const stock = +document.getElementById('stock').value || 0;
  const bond = +document.getElementById('bond').value || 0;
  const loss = +document.getElementById('loss').value || 0;
  const profit = +document.getElementById('profit').value || 0;

  const result = stock - bond + loss + profit;
  document.getElementById('result').textContent = result.toFixed(2);
}

function resetFields() {
  ['stock','bond','loss','profit'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('result').textContent = '0';
}

/* 署名 */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

function pos(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function start(e) {
  drawing = true;
  const p = pos(e);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
}

function draw(e) {
  if (!drawing) return;
  e.preventDefault();
  const p = pos(e);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
}

function end() {
  drawing = false;
}

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', end);

canvas.addEventListener('touchstart', start);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', end);

function clearSignature() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  document.getElementById('status').textContent = '';
}

function saveSignature() {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'signature.png';
  a.click();
  document.getElementById('status').textContent = '保存しました';
}
