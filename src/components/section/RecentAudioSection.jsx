import { useState } from "react";
import generateAudioCard from "@/components/common/generateAudioCards.jsx";
import objectList from "@/data/tafsirData.json";
import tafsirTitle from "@/data/chapterNamesTafsir.json";

function RecentAudioSection() {
  const [noOfCards, setNoOfCards] = useState(8);

  function handleLoadMore() {
    setNoOfCards(noOfCards + 4);
  }

  const objListToRender = objectList.slice(-noOfCards).reverse();
  const audioCardList = generateAudioCard(objListToRender, tafsirTitle, 1);

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
    </div>
  );
}

export default RecentAudioSection;
