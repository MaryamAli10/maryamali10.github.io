function Banner({ children }) {
  return (
    <>
      <div className="h-13 bg-netural-900"></div>
      <div className=" w-full h-40 bg-neutral-900 flex items-center justify-center">
        <h1 className="text-white text-3xl font-[Eb-Garmond] p-1 border-b border-neutral-50">
          {children}
        </h1>
      </div>
    </>
  );
}

export default Banner;
