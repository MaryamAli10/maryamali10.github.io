import fs from "fs";
import path from "path";

const titlesPath = path.resolve("src/data/chapterNamesKhutbah.json");
const dirPath = path.resolve("public/audio/Khutbah");
const titlesJSON = fs.readFileSync(titlesPath, "utf-8");
const titles = JSON.parse(titlesJSON);

function errFunc(err) {
  if (err) {
    console.log(err);
  }
}

function splitFilename(filename) {
  let [part, date] = filename.split(",");
  let i = part.split(".");
  return [i[0], part, date];
}

function formatDate(date) {
  const [d, m, y] = date.split("-");

  return new Date(y, m, d);
}

function createObject(baseDir) {
  const results = [];
  const parentDir = baseDir;
  const subDirList = fs.readdirSync(baseDir);
  const parentDirName = path.basename(baseDir);
  const parentSrcName = path.join("/audio", parentDirName);

  for (const subDir of subDirList) {
    const subDirPath = path.join(parentDir, subDir);
    const fileList = fs.readdirSync(subDirPath);
    const subSrcName = path.join(parentSrcName, subDir);

    for (const file of fileList) {
      const filePath = path.join(subDirPath, file);
      const fileStats = fs.statSync(filePath);
      const fileName = path.parse(filePath).name;
      const fileSrcName = path.join(subSrcName, file);

      const [i, part, date] = splitFilename(fileName);
      const d = formatDate(date);
      const p = part.split(".");

      const title = titles[subDir][part];
      results.push({
        fileName: fileName,
        src: fileSrcName,
        size: fileStats.size,
        atime: fileStats.atime,
        tags: [fileName, subDir, parentDirName],
        part: part,
        date: d,
        title: title,
      });
    }
  }
  return results;
}

const objectList = await createObject(dirPath);
const stringifyOutput = JSON.stringify(objectList);
const outputPath = path.resolve("src/data/khutbahData.json");
fs.writeFile(outputPath, stringifyOutput, errFunc);
