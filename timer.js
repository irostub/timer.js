let nowInterval = 0;
let timeRateInterval = 0;
let time = 0;

const startInput = document
  .getElementById("start-input")
  .addEventListener("input", handleStartInput);

const endInput = document
  .getElementById("end-input")
  .addEventListener("input", handleEndInput);

const nowInput = document
  .getElementById("now-input")
  .addEventListener("change", handleNowInput);

const titleInput = document
  .getElementById("title-input")
  .addEventListener("input", handleTitleInput);

const expressInput = document
  .getElementById("express-input")
  .addEventListener("change", (e) => {});

const styleInput = document.getElementsByName("style");
for (styleRadio in styleInput) {
  styleInput[styleRadio].onclick = function () {
    handleStyleInput(this.value);
  };
}

const backgroundInput = document
  .getElementById("background-input")
  .addEventListener("change", (e) => {});

const glowInput = document
  .getElementById("glow-input")
  .addEventListener("change", (e) => {});

const exportBtn = document
  .getElementById("export-btn")
  .addEventListener("change", (e) => {});

function handleStartInput(e) {
  const startInput = document.getElementById("start-input");
  const endInput = document.getElementById("end-input");
  if (!isEmpty(e.target.value) && !isEmpty(endInput.value)) {
    time = parseTime(startInput.value, endInput.value);
    clearInterval(timeRateInterval);
    timeRateInterval = setInterval(intervalTimeRate, 1);
  }
}
function handleEndInput(e) {
  const startInput = document.getElementById("start-input");
  const endInput = document.getElementById("end-input");
  if (!isEmpty(e.target.value) && !isEmpty(startInput.value)) {
    time = parseTime(startInput.value, endInput.value);
    clearInterval(timeRateInterval);
    timeRateInterval = setInterval(intervalTimeRate, 1);
  }
}

function intervalTimeRate() {
  const t = new Date().getTime();
  const rate = (((t - time.sTime) / (time.eTime - time.sTime)) * 100).toFixed(
    6
  );
  document.getElementById("time").innerText = rate;
}

function parseTime(start, end) {
  const sDate = parseDate(start);
  const eDate = parseDate(end);

  const sTime = new Date(sDate.year, sDate.month - 1, sDate.day).getTime();
  const eTime = new Date(eDate.year, eDate.month - 1, eDate.day).getTime();

  return { sTime: sTime, eTime: eTime };
}

function parseDate(date) {
  return {
    year: parseInt(date.slice(0, 4), 10),
    month: parseInt(date.slice(5, 7), 10),
    day: parseInt(date.slice(8, 10), 10),
  };
}

function handleNowInput(e) {
  const checked = e.target.checked;
  if (!checked) {
    clearInterval(nowInterval);
  } else {
    setStartDateToNow();
    nowInterval = setInterval(setStartDateToNow, 2000);
  }
}
function handleExpressInput() {}
function handleStyleInput(e) {
  const timerBar = document.getElementById("timer-bar");
  timerBar.className = "";
  switch (e) {
    case "standard":
      timerBar.className = "";
      break;
    case "candy":
      timerBar.className = "candy";
      break;
    case "black":
      timerBar.className = "black";
      break;
  }
}
function handleBackgroundInput() {}
function handleGlowInput() {}
function handleExportBtnInput() {}

function handleTitleInput(e) {
  const title = document.getElementById("title");
  title.innerText = e.target.value;
}

function getNowDate() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

function setStartDateToNow() {
  document.getElementById("start-input").value = getNowDate();
}

function isEmpty(data) {
  return data == null || data == "undefined" || data == "";
}
