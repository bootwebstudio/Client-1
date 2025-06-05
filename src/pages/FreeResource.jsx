import axios from "axios";
import { useRef } from "react";
import { useState } from "react";

// Components
import DropDown from "../components/DropDown";

// Assets
import CoursePreview from "../assets/CoursePreview.png";

const FreeResource = () => {
  const [showMessage, setShowMessage] = useState(false);

  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TELEGRAM_LEADS_CHAT_ID = import.meta.env.VITE_TELEGRAM_LEADS_CHAT_ID;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    referral: "",
  });

  const formContainerRef = useRef(null);

  const handleCHANGE = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFORM = async (e) => {
    e.preventDefault();
    sendUSERDATA();
    const link = document.createElement("a");
    link.href = "./FREE_RESOURCE.zip";
    link.download = "Free Resource";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendUSERDATA = async () => {
    try {
      const messageContent = `📩 New User Lead:\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone}\n🎂 Age: ${formData.age}\n📢 Referral: ${formData.referral}\n`;

      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_LEADS_CHAT_ID,
          text: messageContent,
        }
      );
    } catch (error) {
      console.error("Error sending user data to Telegram:", error);
    }
  };

  return (
    <div
      ref={formContainerRef}
      className="w-full min-h-screen p-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6 font-[SPACEGROTESK] text-white bg-black"
    >
      <figure>
        <img
          src={CoursePreview}
          alt="Course preview image showcasing transformation from addiction to self-control"
          className="w-full rounded"
          loading="lazy"
        />
      </figure>
      <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
        THE ULTIMATE <span className="text-[#E30A03]">NOFAP</span> GUIDE — QUIT{" "}
        <span className="text-[#E30A03]">MASTURBATION & PORN</span> FOREVER!
      </h2>
      <form onSubmit={handleFORM} className="w-full flex flex-col gap-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleCHANGE}
          required
          autoComplete="off"
          className="p-4 w-full rounded outline-none border-none bg-zinc-800"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleCHANGE}
          required
          autoComplete="off"
          className="p-4 w-full rounded outline-none border-none bg-zinc-800"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleCHANGE}
          required
          autoComplete="off"
          className="p-4 w-full rounded outline-none border-none bg-zinc-800"
        />
        <DropDown
          label="Select Your Age"
          name="age"
          options={["Under 18", "18-24", "25-34", "35+"]}
          value={formData.age}
          onChange={handleCHANGE}
          onToggle={(isOpen) => {
            if (formContainerRef.current) {
              formContainerRef.current.style.minHeight = isOpen
                ? "120vh"
                : "100vh";
            }
          }}
        />
        <DropDown
          label="How Did You Hear About Us?"
          name="referral"
          options={["YouTube", "Instagram", "A Friend", "Other"]}
          value={formData.referral}
          onChange={handleCHANGE}
          onToggle={(isOpen) => {
            if (formContainerRef.current) {
              formContainerRef.current.style.minHeight = isOpen
                ? "120vh"
                : "100vh";
            }
          }}
        />
        <button
          type="submit"
          className="w-full p-4 text-lg lg:text-xl font-medium lowercase rounded font-[DIRTYLINE] bg-[#E30A03] hover:bg-[#620905] transition-all duration-400 ease-in-out"
        >
          TRY CHAPTER 1 NOW
        </button>
      </form>
    </div>
  );
};

export default FreeResource;
