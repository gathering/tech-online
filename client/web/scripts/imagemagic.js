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
    title: undefined,
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
    elements.container?.classList.add("active");
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
    activeImage = Math.floor(Math.random() * images.length);
  }

  async function changeImage() {
    return new Promise((resolve, reject) => {
      setRandomActiveImage();
      const image = images[activeImage];
      elements.inactive.style = `background-image: url(${image.url})`;

      // Wait for image to load. For now we just a assume X time
      // rather than actually detecting if image is loaded.
      setTimeout(() => {
        let inactive = elements.inactive;
        elements.inactive = elements.active;
        elements.active = inactive;

        const inactiveTitle = elements.inactiveTitle;
        elements.inactiveTitle = elements.activeTitle;
        elements.activeTitle = inactiveTitle;

        elements.active.classList.add("active");
        elements.inactive.classList.remove("active");
        elements.activeTitle.innerHTML = `<strong>${
          image.title || image.url.split("/").pop()
        }</strong><br />${image.creator || ""}`;

        resolve();

        if (onChanged) {
          onChanged(image);
        }
      }, loadDelay);
    });
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
    elements.activeTitle = getElementWithClass("title");
    elements.inactive = getElementWithClass("image");
    elements.inactiveTitle = getElementWithClass("title");

    elements.active.appendChild(elements.activeTitle);
    elements.inactive.appendChild(elements.inactiveTitle);
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
