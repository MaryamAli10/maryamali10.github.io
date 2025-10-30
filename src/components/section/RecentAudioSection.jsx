import { useState } from "react";
import { generateAudioCard } from "@/components/common/generateAudioCards.jsx";
import tafsirObjects from "@/data/tafsirData.json";
import RSSobjects from "@/data/RSSData.json";
import KATobjects from "@/data/KATData.json";
import tafsirTitle from "@/data/chapterNamesTafsir.json";
import RSStitle from "@/data/chapterNamesRSS.json";
import KATtitle from "@/data/chapterNamesKAT.json";
import ScrollButton from "@common/ScrollButton";

function descendingPart(a, b) {
  a = parseFloat(a.part);
  b = parseFloat(b.part);
  return b - a;
}
const sortedTafsirObjects = tafsirObjects.sort(descendingPart);
const sortedRSSObjects = RSSobjects.sort(descendingPart);
const sortedKATObjects = KATobjects.sort(descendingPart);

function RecentAudioSection() {
  const [noOfCards, setNoOfCards] = useState(3);

  function handleLoadMore() {
    setNoOfCards(noOfCards + 4);
  }
  const audioCardList = [];
  for (let i = 0; i < noOfCards; i++) {
    audioCardList.push(generateAudioCard(sortedTafsirObjects[i], null, 1));
    audioCardList.push(generateAudioCard(sortedRSSObjects[i], RSStitle, 2));
    audioCardList.push(generateAudioCard(sortedKATObjects[i], KATtitle, 3));
  }

  return (
    <div className="bg-neutral-800 text-neutral-50 w-full pb-8 px-6 lg:px-30 2xl:px-60">
      <h1 className="font-[Eb_Garmond] border-b border-neutral-50 mx-auto text-center text-2xl p-1 pt-2 w-fit my-8">
        Latest Classes
      </h1>
      <div className="flex flex-col gap-4 " id="latest-classes">
        <ul className="list-none">{audioCardList}</ul>
        <button
          className="bg-neutral-700 text-neutral-50 rounded w-auto px-4 py-2 mx-auto hover:bg-neutral-600 transition"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>
      <ScrollButton />
    </div>
  );
}

export default RecentAudioSection;
