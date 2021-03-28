const createImageMagic = ({
  target = "#image-magic-container",
  rotateDelay = 10000,
  loadDelay = 3000,
  loopDelay = 1000,
  // Might be useful if we want to forward information about current image somewhere
  onChanged,
  images = [],
}) => {
  const elements = {
    container: undefined,
    active: undefined,
    inactive: undefined,
  };
  let visible = false;
  let looping = true;
  let timeToChange = false;
  let activeImage = 0;

  function show() {
    elements.container?.classList.add("active");
    visible = true;
  }

  function hide() {
    elements.container?.classList.remove("active");
    visible = false;
  }

  function destroy() {
    looping = false;
    hide();
    setTimeout(() => {
      elements.container.remove();
      elements.active.remove();
      elements.inactive.remove();
    }, loopDelay);
  }

  function expireImageIn(ms) {
    setTimeout(() => {
      timeToChange = true;
    }, rotateDelay);
  }

  function setRandomActiveImage() {
    const candidate = Math.floor(Math.random() * images.length);
    activeImage =
      candidate !== activeImage ? candidate : (candidate + 1) % images.length;
  }

  async function changeImage() {
    return new Promise((resolve, reject) => {
      setRandomActiveImage();
      const image = images[activeImage];
      const isVideo = image.url.endsWith(".mp4");

      if (isVideo) {
        elements.inactive.style = "";
        elements.inactive.innerHTML = `
          ${getCreditMarkup(image)}
          <video loop muted playsinline autoplay src="${image.url}" />
        `;
      } else {
        elements.inactive.style = `background-image: url(${image.url})`;
        elements.inactive.innerHTML = getCreditMarkup(image);
      }

      // Wait for image to load. For now we just a assume X time
      // rather than actually detecting if image is loaded.
      setTimeout(() => {
        let inactive = elements.inactive;
        elements.inactive = elements.active;
        elements.active = inactive;

        elements.active.classList.add("active");
        elements.inactive.classList.remove("active");

        resolve();

        if (onChanged) {
          onChanged(image);
        }
      }, loadDelay);
    });
  }

  function getCreditMarkup(image) {
    return `<div class="title">
      <strong>${image.title || image.url.split("/").pop()}</strong>
      <br />${image.creator || ""}
    </div>`;
  }

  function getElementWithClass(classname) {
    const elm = document.createElement("div");
    elm.className = `imageMagic ${classname}`;
    return elm;
  }

  async function loop() {
    if (timeToChange) {
      timeToChange = false;

      if (visible) {
        await changeImage();
      }

      expireImageIn(rotateDelay);
    }
    if (looping) {
      setTimeout(() => {
        loop();
      }, loopDelay);
    }
  }

  async function init() {
    elements.container = getElementWithClass("container");
    elements.active = getElementWithClass("image");
    elements.inactive = getElementWithClass("image");

    elements.container.appendChild(elements.active);
    elements.container.appendChild(elements.inactive);
    document.querySelector(target).appendChild(elements.container);

    setRandomActiveImage();
    await changeImage();
    expireImageIn(rotateDelay);

    looping = true;
    loop();
  }

  init();

  return {
    show,
    hide,
    destroy,
    init,
  };
};
