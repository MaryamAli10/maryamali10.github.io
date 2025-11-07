import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { nanoid } from "nanoid";

import AudioCard from "@/components/common/AudioCard";
import Banner from "@/components/common/Banner";
import generateAudioCards from "@/components/common/generateAudioCards.jsx";

import objectList from "@/data/tafsirData.json";
import titles from "@/data/chapterNamesTafsir.json";

const chapterIndex = [];
for (const obj of objectList) {
  const filename = obj.fileName.split(",");
  const part = filename[0].split(".");
  if (!chapterIndex.includes(part[0])) {
    chapterIndex.push(part[0]);
  }
}
console.log("Chapter Index:" + chapterIndex);

function AscendingPart(a, b) {
  a = parseFloat(a.part);
  b = parseFloat(b.part);
  return a - b;
}

function Content({ chapterIndex, audioObjects, titles }) {
  const sortedObjects = chapterIndex.reduce(
    (acc, curr) => ({ ...acc, [curr.toString()]: [] }),
    {}
  );
  for (const obj of audioObjects) {
    const part = obj.part.split(".");
    sortedObjects[part[0]].push(obj);
  }

  const chapterIndexAscending = chapterIndex.slice().reverse();
  const content = chapterIndexAscending.map((i) => {
    const sortedObjectsAscending =
      sortedObjects[i.toString()].sort(AscendingPart);
    const results = (
      <AccordionItem key={nanoid()} value={`surah${i}`}>
        <AccordionTrigger className="text-lg font-normal">
          {`${i}. Surah ${titles[i - 1]}`}
        </AccordionTrigger>
        <AccordionContent>
          {generateAudioCards(sortedObjectsAscending, null, 1)}
        </AccordionContent>
      </AccordionItem>
    );
    return results;
  });
  return (
    <div>
      <Accordion type="single" collapsible className="mx-4 my-4 ">
        <ul className="list-none">{content}</ul>
      </Accordion>
    </div>
  );
}

function Tafsir() {
  return (
    <div className="bg-neutral-800 text-neutral-50 min-h-screen">
      <Banner>Tafsir</Banner>
      <div className="flex flex-col font-[EB-Garmond] ">
        <h2 className="flex w-fit text-3xl border-b border-neutral-50 self-center my-4">
          Surah List
        </h2>

        <Content
          chapterIndex={chapterIndex}
          audioObjects={objectList}
          titles={titles}
        />
      </div>
    </div>
  );
}

export default Tafsir;
