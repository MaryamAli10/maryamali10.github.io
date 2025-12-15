import Banner from "@/components/common/Banner";
import generateAudioCards from "@/components/common/generateAudioCards.jsx";
import objectJSON from "@/data/khutbahData.json" with { type: "json" };



function descendingPart(a, b) {
  a = parseFloat(a.part);
  b = parseFloat(b.part);
  return b - a;
}
const objectList = objectJSON.sort(descendingPart);

function Content({ objList }) {
  return <div> {generateAudioCards(objList)}</div>;
}

function ContentSection() {
  return (
    <div>
      <h2 className="text-neutral-50 font-[Eb_Garmond] border-b border-neutral-50 mx-auto text-center text-2xl p-1 pt-2 w-fit my-8">Latest Khutbahs</h2>
      <Content objList={objectList} />
    </div>
  );
}

function Khutbah() {
  return (
    <div className="bg-neutral-800 min-h-screen">
      <Banner>Khutbah</Banner>
      <ContentSection />
    </div>
  );
}

export default Khutbah;
