import fs from "fs/promises";
import path from "path";
import fss from "fs";

const titlep = path.resolve("src/data/chapterNamesTafsir.json");
const dirPath = "/home/maryam10/husnaa-gardens-website/public/audio/Tafsir";

const titlesJson = fss.readFileSync(titlep, "utf-8");
const titles = JSON.parse(titlesJson);

function errFunc(err) {
  if (err) {
    console.log(err);
  }
}

function splitFilenameTafsir(fileName) {
  let [part, verse, date] = fileName.split(",");
  let parts = part.split(".");
  let i = parseInt(parts[0]) - 1;

  if (fileName.includes("&")) {
    part = part.split("&");
    verse = verse.split("&");
    i = [];
    for (let p of part) {
      let t = p.split(".");
      i.push(parseInt(t[0]));
    }
  }

  return [i, verse, part, date];
}

function formatDate(date) {
  const [d, m, y] = date.split("-");

  return new Date(y, m, d);
}

async function createObject(dirPath, titles) {
  const results = [];
  const subDirList = await fs.readdir(dirPath, errFunc);
  const parentDirName = path.basename(dirPath);
  const srcPathParent = path.join("/audio", parentDirName);

  for (const subDir of subDirList) {
    const subDirPath = path.join(dirPath, subDir);
    const fileList = await fs.readdir(subDirPath, errFunc);
    const srcPathSub = path.join(srcPathParent, subDir);

    for (const file of fileList) {
      const filePath = path.join(subDirPath, file);
      const fileStats = await fs.stat(filePath);
      const fileName = path.parse(filePath).name;
      const srcPath = path.join(srcPathSub, file);

      const [i, verse, part, date] = splitFilenameTafsir(fileName);
      let title;

      let datef = formatDate(date);
      if (Array.isArray(i)) {
        title = `Surah ${titles[i[0]]}- ayahs ${verse[0]}, Surah ${
          titles[i[1]]
        }- ayahs ${verse[1]}`;
      } else {
        title = `Surah ${titles[i]}- ayahs ${verse}`;
      }

      results.push({
        fileName: fileName,
        src: srcPath,
        size: fileStats.size,
        atime: fileStats.atime,
        tags: [fileName, subDir, parentDirName],
        part: part,
        title: title,
        verse: verse,
        date: datef,
      });
    }
  }

  return results;
}

const objectList = await createObject(dirPath, titles);

const stringifyOutput = JSON.stringify(objectList);
fs.writeFile("src/data/tafsirData.json", stringifyOutput, errFunc);
