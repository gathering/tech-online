const kropp = document.getElementById("kropp");
const dato = document.getElementById("dato");
const imageMagic = createImageMagic({
  target: "#kropp",
  images,
  onChanged: publishImageInformation,
});

// If a global `hookUrl` is set and we are online, notify webhook when image changes
function publishImageInformation(image) {
  if (hookUrl && kropp.classList.contains("success")) {
    fetch(hookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: image.title,
            author: { name: image.creator },
            image: {
              url: image.url,
            },
            footer: {
              text: `Check out this masterwork of a competition entry, and others like it at ${image.source}`,
            },
          },
        ],
      }),
    });
  }
}

/**
 * padding number with leading zeroes so it becomes two digits no matter what
 *
 * @param {number|string} thing the number to pad
 * @return {string} the padded number
 */
function pad(thing) {
  return thing.toString().padStart(2, 0);
}

/**
 * sets the date on the website
 *
 */
function setDate() {
  const date = new Date();

  dato.innerText = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

/**
 * does stuff to the website when stuff works
 *
 */
function jadda() {
  kropp.classList.add("success");
  imageMagic.show();
}

/**
 * does stuff to the website when stuff doesnt work
 *
 */
function neida() {
  kropp.classList.remove("success");
  imageMagic.hide();
}

/**
 * checks the connection to make sure the internet works
 *
 */
function sjekk() {
  fetch("https://techo.gathering.org/ping", {
    cache: "no-cache",
    mode: "cors",
  })
    .then((response) => {
      response.ok ? jadda() : neida();
    })
    .catch((err) => {
      neida();
      console.warn(err);
    });
}

sjekk();
setDate();

setInterval(sjekk, 1000);
setInterval(setDate, 970);
