#!/usr/bin/env node

import { writeFileSync, readFileSync } from "fs";
import { dirname, basename } from "path";

const urls = readFileSync("./ftp-image-urls").toString("utf8");

function titleCase(title = "") {
  const words = title.split(" ");
  return words
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.substr(1))
    .join(" ");
}

function removePlacement(title = "") {
  return title.replace(/^\d{0,3}\.? /, "");
}

const images = urls.split("\n").map((url) => {
  const image = {
    url: url.replace(/ /g, "%20"),
    source: dirname(url),
  };
  const parts = (basename(url).replace(/[_|-]/g, " ") || "").split(" by ");
  const title = titleCase(removePlacement(parts?.[0]));
  const creator = (parts?.[1] || "").split(".").slice(0, -1).join(".");

  if (creator && title) {
    image.creator = creator;
    image.title = title;
  }

  return image;
});

images.push({
  title: "TG22 tema-teaser",
  creator: "Rick Astley",
  url:
    "https://ia801602.us.archive.org/11/items/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.mp4",
  source: "https://archive.org/details/Rick_Astley_Never_Gonna_Give_You_Up",
});

writeFileSync("images.json", Buffer.from(JSON.stringify(images)));
