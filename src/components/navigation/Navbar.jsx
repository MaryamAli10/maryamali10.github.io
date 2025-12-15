import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar({ setPage }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(page) {
    setPage(page);
    setIsOpen(false);
  }

  const sideBar = (
    <div
      id="sideBar"
      className="flex absolute z-50 fixed bg-neutral-800 text-neutral-50 w-3/4 min-h-screen overflow-y-auto transition-transform transform ease-in-out duration-300 translate-x-0 "
    >
      <div className="flex flex-col items-center p-4 w-full items-end">
        <button
          className="flex justify-self-end items-end "
          onClick={() => setIsOpen(false)}
        >
          <X color="#fafafa" size={38} />
        </button>
        <ul className="flex flex-col divide-y divide-neutral-700 w-full text-2xl w-full font-[Eb-Garmond] ">
          <li className="mb-2 ">
            <button onClick={() => handleClick("home")}>Home</button>
          </li>
          <li className="mb-2">
            <button onClick={() => handleClick("tafsir")}>Tafsir</button>
          </li>
          <li className="mb-2">
            <button onClick={() => handleClick("riyadUsSaliheen")}>
              Riyad-Us-Saliheen
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => handleClick("kitabAtTawhid")}>
              Kitab-At-Tawhid
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => handleClick("khutbah")}>Khutbah</button>
          </li>
          <li className="mb-2">
            <button onClick={() => handleClick("contact")}>Contact</button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && sideBar}
      <div className="fixed top-0  w-full bg-neutral-900 border-b border-neutral-800 ">
        <div
          className="container mx-auto justify-end
       flex items-center justify-between p-4"
        >
          <nav className="hidden md:flex space-x-4 text-neutral-50 max-w-1100">
            <ul className="flex space-x-4">
              <li>
                <button
                  className="text-neutral-50 hover:text-violet-600"
                  onClick={() => handleClick("home")}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className="text-neutral-50 hover:text-violet-600"
                  onClick={() => handleClick("tafsir")}
                >
                  Tafsir
                </button>
              </li>
              <li>
                <button
                  className="text-neutral-50 hover:text-violet-600"
                  onClick={() => handleClick("riyadUsSaliheen")}
                >
                  Riyad-Us-Saliheen
                </button>
              </li>
              <li>
                <button
                  className="text-neutral-50 hover:text-violet-600"
                  onClick={() => handleClick("kitabAtTawhid")}
                >
                  Kitab-At-Tawhid
                </button>
              </li>
              <li>
                <button
                  className="text-neutral-50 hover:text-violet-600"
                  onClick={() => handleClick("khutbah")}
                >
                  Khutbah
                </button>
              </li>
              <li>
                <button
                  className="text-neutral-50 hover:text-violet-600"
                  onClick={() => handleClick("contact")}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <Menu color="#fafafa" size={38} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
