import fs from "fs/promises";
import path from "path";

const dirPath = path.resolve("public/audio/Riyard_us_Saliheen");
// "/home/maryam10/husnaa-gardens-website/";

function errFunc(err) {
  if (err) {
    console.log(err);
  }
}

function splitFilenameRSS(filename) {
  let [part, h, date] = filename.split(",");
  let i = part.split(".");
  return [i[0], part, h, date];
}

function formatDate(date) {
  const [d, m, y] = date.split("-");
  return new Date(y, m, d);
}

async function createObject(dirPath) {
  const results = [];
  const subDirList = await fs.readdir(dirPath);
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
      const [i, part, h, d] = splitFilenameRSS(fileName);
      const titleEnd = h.includes("-") ? "s" : "";

      let title = `Chapter ${i}${h === "0" ? "" : `- Hadith${titleEnd} ${h}`}`;
      let date = formatDate(d);

      results.push({
        fileName: fileName,
        src: srcPath,
        size: fileStats.size,
        atime: fileStats.atime,
        tags: [fileName, subDir, parentDirName],
        title: title,
        part: part,
        date: date,
        hadith: h,
      });
    }
  }

  return results;
}

const objectList = await createObject(dirPath);

const stringifyOutput = JSON.stringify(objectList);
const outputPath = path.resolve("src/data/RSSData.json");
fs.writeFile(outputPath, stringifyOutput, errFunc);
