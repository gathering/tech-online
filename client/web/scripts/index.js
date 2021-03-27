

const kropp = document.getElementById("kropp");
const dato = document.getElementById("dato");
const imageMagic = createImageMagic({
  target: "#kropp",
  images,
});

function jadda() {
  kropp.classList.add("success");
  imageMagic.show();
}
function neida() {
  kropp.classList.remove("success");
  imageMagic.hide();
}

function sjekk() {
  fetch("https://techo.gathering.org/ping", {
    cache: "no-cache",
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        jadda();
      } else {
        neida();
      }
    })
    .catch((err) => {
      neida();
      console.warn(err);
    });
}
function pad(thing) {
  return thing.toString().padStart(2, 0);
}

function setDate() {
  const date = new Date();

  dato.innerText = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

sjekk();
setDate();

setInterval(sjekk, 1000);
setInterval(setDate, 970);
