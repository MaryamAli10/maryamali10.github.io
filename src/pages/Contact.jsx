import Banner from "@/components/common/Banner";
import { MessageCircle, Mail, MapPinHouse } from "lucide-react";

function Contact() {
  return (
    <div className="bg-neutral-800 min-h-screen">
      <Banner>Contact</Banner>
      <div className="text-neutral-50 p-6 divide-y divide-neutral-700">
        <div className="p-8 flex flex-col gap-4 ">
          <span>
            <h2>
              <MessageCircle className="inline" /> Phone
            </h2>
            <p className="text-neutral-400">1 (868) 123-4567</p>
          </span>

          <span>
            <h2>
              <Mail className="inline" /> Email
            </h2>
            <p className="text-neutral-400">info@example.com</p>
          </span>

          <span>
            <h2>
              <MapPinHouse className="inline" /> Location
            </h2>
            <p className="text-neutral-400">
              Husnaa Gardens Masjid, La Cuesa Rd, Freeport
            </p>
          </span>
        </div>

        <div className="p-8 flex flex-col gap-4">
          <h2 className="font-[Gb-Garmoned] font-medium text-2xl">
            Books covered in Class:
          </h2>
          <ul
            className="font-[Open_Sans] gap-1 flex flex-col"
            style={{ listStyleType: "disc" }}
          >
            <li>
              <a
                className="underline hover:text-purple-600"
                href="/en_Riyad_us_Saliheen_231008_184441.pdf"
                download="riyad-us-saliheen"
              >
                Riyad-Us-Saliheen
              </a>
            </li>
            <li>
              <a
                className=" underline hover:text-purple-600"
                href="/كتاب التوحيد .pdf"
                download
              >
                Kitab-At-Tawhid (arabic ver)
              </a>
            </li>
            <li>
              <a
                className="underline hover:text-purple-600"
                href="/kitab-at-tawhid.pdf"
                download
              >
                Kitab-At-Tawhid (english ver)
              </a>
            </li>
          </ul>
        </div>

        <div className="" id="contact-info">
          {" "}
        </div>
      </div>
    </div>
  );
}

export default Contact;
