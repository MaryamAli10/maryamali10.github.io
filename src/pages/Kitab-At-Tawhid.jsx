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

import objectList from "@/data/KATData.json";
import titles from "@/data/chapterNamesKAT.json";

const chapterIndex = [];
for (const obj of objectList) {
  const filename = obj.fileName.split(",");
  const part = filename[0].split(".");
  if (!chapterIndex.includes(part[0])) {
    chapterIndex.push(part[0]);
  }
}

function Content({ chapterIndex, audioObjects, titles }) {
  const sortedObjects = chapterIndex.reduce(
    (acc, curr) => ({ ...acc, [curr.toString()]: [] }),
    {}
  );
  for (const obj of audioObjects) {
    const list = obj.fileName.split(",");
    const part = list[0].split(".");
    sortedObjects[part[0]].push(obj);
  }

  const chapterIndexAscending = chapterIndex.slice().reverse();
  const content = chapterIndexAscending.map((i) => {
    const sortedObjectsAscending = sortedObjects[i.toString()]
      .slice()
      .reverse();
    const results = (
      <AccordionItem key={nanoid()} value={`chapter${i}`}>
        <AccordionTrigger className="text-lg font-normal">
          {`Chapter ${i}- ${titles[i]}`}
        </AccordionTrigger>
        <AccordionContent>
          {generateAudioCards(sortedObjectsAscending, null, 3)}
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

function KitabAtTawhid() {
  return (
    <div className="bg-neutral-800 text-neutral-50 min-h-screen">
      <Banner>Tafsir</Banner>
      <div className="flex flex-col font-[EB-Garmond] ">
        <h2 className="flex w-fit text-3xl border-b border-neutral-50 self-center my-4">
          Chapter List
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

export default KitabAtTawhid;
