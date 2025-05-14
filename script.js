let time = 60;
const countdown = document.getElementById("countdown");

const interval = setInterval(() => {
    time--;
    countdown.textContent = `00:${time < 10 ? '0' + time : time}`;
    if (time === 0) clearInterval(interval);
}, 1000);