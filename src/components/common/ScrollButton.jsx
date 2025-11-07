import { useState } from "react";
import { ChevronUp } from "lucide-react";

function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  function toggleVisiblity() {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 1200) {
      setIsVisible(true);
    } else if (scrolled <= 1200) {
      setIsVisible(false);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.addEventListener("scroll", toggleVisiblity);

  return (
    <button>
      <ChevronUp
        onClick={scrollToTop}
        style={{ display: isVisible ? "inline" : "none" }}
        className="flex absolute z-50 bottom-10 right-10 fixed bg-neutral-700 text-neutral-50 rounded-full hover:bg-neutral-600 transition p-2 h-10 w-10"
        strokeWidth={2.5}
        size={25}
      />
    </button>
  );
}

export default ScrollButton;
