const images = [
  {
    title: "Behind Enemy Lines",
    creator: "Even aka Evendeejay",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Behind_Enemy_Lines_by_Even_aka_Evendeejay.png",
  },
  {
    title: "Bewitched",
    creator: "Klara aka Klarita",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Bewitched_by_Klara_aka_Klarita.png",
  },
  {
    title: "Demonic Cuteness",
    creator: "Maja aka Drifandi",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Demonic_Cuteness_by_Maja_aka_Drifandi.png",
  },
  {
    title: "Drage",
    creator: "Simone Hoem aka TlexSHF",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Drage_by_Simone_Hoem_aka_TlexSHF.PNG",
  },
  {
    title: "Elefanten",
    creator: "Mina aka Kvaa99",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Elefanten_by_Mina_aka_Kvaa99.png",
  },
  {
    title: "Hva man rekker på en time",
    creator: "Tonje aka tawd92",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Hva_man_rekker_p%c3%a5_en_time_by_Tonje_aka_tawd92.png",
  },
  {
    title: "I Hate My Job",
    creator: "Camilla aka Mills",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/I_Hate_My_Job_by_Camilla_aka_Mills.png",
  },
  {
    title: "Oppgradert",
    creator: "Inger aka Iserith",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Oppgradert_by_Inger_aka_Iserith.png",
  },
  {
    title: "Resist",
    creator: "Sebastian Wilhelmsen aka Wilhelmsen",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Resist_by_Sebastian_Wilhelmsen_aka_Wilhelmsen.png",
  },
  {
    title: "Siljeeva",
    creator: "Silje Eva Kvitle aka 716c8ded96ae4e63bbf6a8e844",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Siljeeva_by_Silje_Eva_Kvitle_aka_716c8ded96ae4e63bbf6a8e844.jpg",
  },
  {
    title: "Sweet dreams",
    creator: "Amalie aka Harley Quinn",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Sweet_dreams_by_Amalie_aka_Harley_Quinn.png",
  },
  {
    title: "The Creature Within",
    creator: "Mariel Simone aka MillisRose",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/The_Creature_Within_by_Mariel_Simone_aka_MillisRose.png",
  },
  {
    title: "Unironic Dab",
    creator: "Erlend aka Elvi75",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Unironic_Dab_by_Erlend_aka_Elvi75.png",
  },
  {
    title: "Were No Strangers To Love",
    creator: "Hanna Nikoline",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Were_No_Strangers_To_Love_by_Hanna_Nikoline.png",
  },
  {
    title: "Chita portrait",
    creator: "Sølve",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/chita_portrait_by_s%c3%b8lve.png",
  },
  {
    title: "The lynx and the leech",
    creator: "Adrian aka ArtFæg",
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/the_lynx_and_the_leech_by_adrian_aka_ArtF%c3%a6g.png",
  },
];

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

const kropp = document.getElementById("kropp");
const dato = document.getElementById("dato");
const imageMagic = createImageMagic({
  target: "#kropp",
  // Random dump of 2019 MSPaint urls, are there other cool sources we
  // could pick from. Either manually or dynamically?
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
