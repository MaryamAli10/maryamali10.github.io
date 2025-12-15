import Navbar from "@/components/navigation/Navbar";

function Text({ children }) {
  return (
    <p className="font-[Open_Sans] border-b border-neutral-50 px-3 pb-3 ">
      {children}
    </p>
  );
}

function Title({ children }) {
  return (
    <h1 className="md:text-4xl text-3xl font-semibold font-[Eb_Garmond]">
      {children}
    </h1>
  );
}

function Header({ title, text }) {
  return (
    <>
      <div className="h-13 bg-netural-900"></div>
      <div className=" w-full h-full bg-neutral-900 pb-5 ">
        <div className="flex flex-col gap-4 justify-center text-center text-neutral-50  py-20 p-5">
          {title && <Title>{title}</Title>}
          {text && <Text>{text}</Text>}
        </div>

        {/* breadcrumbs */}
      </div>
    </>
  );
}

export default Header;
