import { nanoid } from "nanoid";
import AudioCard from "./AudioCard";

function formatSize(size) {
  const sizeMB = (parseInt(size) / 1024 ** 2).toFixed(1);
  return `${sizeMB}MB`;
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const d = date.toDateString().split(" ");
  return `${d[1]}-${d[2]}-${d[3]}`;
}

function generateAudioCards(audioFiles, titles, option) {
  const cards = audioFiles.map((audio) => {
    let title = "Unknown Title";

    if (titles) {
      if (option === 1) {
        title = audio.title;
      } else if (option === 2) {
        let p = audio.part.split(".");
        let i = parseInt(p[0]);
        let h = audio.hadith;
        title = `Riyad-us-Saliheen Chapter${i}- ${title[i]}, Hadith${
          h.includes("-") ? "s" : ""
        } ${h}`;
      } else if (option === 3) {
        let [p1, p2] = audio.part.split(".");
        let i = parseInt(p1);
        title = `Kitab-at-Tawhid Chapter ${i}- ${titles[i]}- part${p2}`;
      }
    } else {
      title = audio.title;
    }

    const size = formatSize(audio.size);
    const date = formatDate(audio.date);
    const src = audio.src;
    return (
      <li key={nanoid()} className="my-6 mx-2">
        <AudioCard
          src={src}
          title={title}
          part={audio.part}
          size={size}
          date={date}
          key={nanoid()}
        />
      </li>
    );
  });

  return cards;
}

function generateAudioCard(audio, titles, option) {
  let title = "Unknown Title";

  if (titles) {
    if (option === 1) {
      title = audio.title;
    } else if (option === 2) {
      let p = audio.part.split(".");
      let i = parseInt(p[0]);
      let h = audio.hadith;
      title = `Riyad-us-Saliheen Chapter ${i}- ${titles[i]}, Hadith${
        h.includes("-") ? "s" : ""
      } ${h}`;
    } else if (option === 3) {
      let [p1, p2] = audio.part.split(".");
      let i = parseInt(p1);
      title = `Kitab-at-Tawhid Chapter ${i}- ${titles[i]}- part${p2}`;
    }
  } else {
    title = audio.title;
  }

  const size = formatSize(audio.size);
  const date = formatDate(audio.date);
  const src = audio.src;

  return (
    <li key={nanoid()} className="my-6 mx-2">
      <AudioCard
        src={src}
        title={title}
        part={audio.part}
        size={size}
        date={date}
        key={nanoid()}
      />
    </li>
  );
}

export default generateAudioCards;
export { generateAudioCard };
