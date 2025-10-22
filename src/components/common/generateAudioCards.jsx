import { nanoid } from "nanoid";
import AudioCard from "./AudioCard";

function formatSize(size) {
  const sizeMB = (parseInt(size) / 1024 ** 2).toFixed(1);
  return `${sizeMB}MB`;
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

function splitFilenameRSS(filename) {
  let [part, h, date] = filename.split(",");
  let i = part.split(".");
  return [i[0], part, h, date];
}

function splitFilenameKAT(filename) {
  let [part, date] = filename.split(",");
  let i = part.split(".");
  return [i[0], part, date];
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const d = date.toDateString().split(" ");
  return `${d[1]}-${d[2]}-${d[3]}`;
}

function generateAudioCard(audioFiles, titles, option) {
  const cards = audioFiles.map((audio) => {
    let title = "Unknown Title";
    let part = "0.0";

    if (option === 1) {
      let [i, verse, part, datef] = splitFilenameTafsir(audio.fileName);
      if (Array.isArray(i)) {
        title = `Surah ${titles[i[0]]}- ayahs ${verse[0]}, Surah ${
          titles[i[1]]
        }- ayahs ${verse[1]}`;
      } else {
        title = `Surah ${titles[i]}- ayahs ${verse}`;
      }
    } else if (option === 2) {
      let [i, part, h, date] = splitFilenameRSS(audio.fileName);
      //i = part.split(".");
      title = `Chapter ${i}- Hadith${h.includes("-") ? "s" : ""} ${h}`;
    } else if (option === 3) {
      let [i, part, date] = splitFilenameKAT(audio.fileName);
      let p = part.split(".");
      title = `Chapter ${i}- part${p[1]}`;
    }

    const size = formatSize(audio.size);
    const atime = formatDate(audio.date);
    const src = audio.src;
    return (
      <li key={nanoid()} className="my-6 mx-2">
        <AudioCard
          src={src}
          title={title}
          part={part}
          size={size}
          date={atime}
          key={nanoid()}
        />
      </li>
    );
  });

  return cards;
}
export default generateAudioCard;
