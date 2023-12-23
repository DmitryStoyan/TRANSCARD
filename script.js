const modal = document.querySelector(".modal");
const form = document.querySelector(".modal__form");
const inputRoute = document.querySelector(".modal__input-route");
const inputNumber = document.querySelector(".modal__input-number");
const buttonShare = document.querySelector(".info-share__button-share");

const routeBus = document.querySelector(".route__title");
const numberBus = document.querySelector(".info__number");
const dateBus = document.querySelector(".info__date");
const timeBus = document.querySelector(".info__time");
const installIcon = document.querySelector(".info-share__title");

// !!!!!!!!!!!!!!!!!!
document.fullscreenEnabled =
  document.fullscreenEnabled ||
  document.mozFullScreenEnabled ||
  document.documentElement.webkitRequestFullScreen;

function requestFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  }
}

if (document.fullscreenEnabled) {
  requestFullscreen(document.documentElement);
}

// This is not even entirely comprehensive. There's more.
// !!!!!!!!!!!!!!!!!!

buttonShare.addEventListener("click", function () {
  openPopup(modal);
});

document.addEventListener("click", function (evt) {
  const popup = document.querySelector(".popup-active");
  if (evt.target === popup) {
    closePopup(modal);
  }
});

function openPopup(popup) {
  popup.classList.add("popup-active");
}

function closePopup(popup) {
  popup.classList.remove("popup-active");
}

let formattedDateTime = "";

function sendInfo(event) {
  event.preventDefault();
  const inputRouteText = inputRoute.value;
  const inputNumberText = inputNumber.value;

  let currentDate = new Date(); // Получаем текущую дату и время

  // Определяем названия месяцев на русском языке
  let months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  // Форматируем дату в соответствии с нужным форматом
  formattedDateTime =
    currentDate.getDate() +
    " " +
    months[currentDate.getMonth()] +
    " " +
    currentDate.getFullYear() +
    " " +
    ("0" + currentDate.getHours()).slice(-2) +
    ":" +
    ("0" + currentDate.getMinutes()).slice(-2);

  // Вставляем отформатированную дату и время в параграф
  dateBus.textContent = formattedDateTime;
  routeBus.textContent = `Маршрут ${inputRouteText}`;
  numberBus.textContent = `Госномер ${inputNumberText}`;

  if (inputNumberText == "") {
    numberBus.textContent = "Госномер 058CI01";
  }

  closePopup(modal);
}

form.addEventListener("submit", sendInfo);

// Установка
let defaultInstallEvent = null;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  defaultInstallEvent = event;
});
installIcon.addEventListener("click", (event) => {
  defaultInstallEvent.prompt();
});
