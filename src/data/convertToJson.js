import fs from "fs";
import path from "path";

const dataPath = path.resolve("src/data/Kitab at Tawheed_251012_121524.txt");

const data = fs.readFileSync(dataPath, "utf-8");
const titles = data.split("\n");
const filteredTitles = titles.filter((t) => {
  return t !== "";
});
const objs = filteredTitles.reduce((acc, titles) => {
  const [key, value] = titles.split("-");
  return { ...acc, [key]: value };
}, {});

const stringifyOutput = JSON.stringify(objs);
fs.writeFileSync("src/data/chapterNamesKAT.json", stringifyOutput);
