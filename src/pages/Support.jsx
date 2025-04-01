import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MessageSquareOff } from "lucide-react";
import EBOOK_DATA from "../ebookData";

// Components
import FAQs from "../components/FAQs";
import Button from "../components/Button";

const Support = () => {
  const location = useLocation();
  const returnPath = location.state?.from || "/";

  return (
    <div className="w-full font-[SPACEGROTESK] text-white bg-black">
      <Link to={returnPath}>
        <div className="p-4 text-lg rounded-full fixed bottom-6 right-6 xl:bottom-12 xl:right-12 bg-[#E30A03] cursor-pointer">
          <MessageSquareOff />
        </div>
      </Link>

      <div className="pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-tight lowercase text-center font-[DIRTYLINE]">
          HELP & SUPPORT
        </h2>
        <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center">
          Click{" "}
          <Link to="/thanks">
            <strong className="underline">JOIN NOW</strong>
          </Link>{" "}
          if you already purchased the ebook but don't receive the link.
        </p>
        <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center">
          If you're facing any issue related to ebook, feel free to contact us.
          We're here to help you and resolve your problems, usually we reply
          within 24 hours.
        </p>
        <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center">
          So kindly, wait and don't be panic or tensed, we'll resolve your issue
          as soon as possible.
        </p>
        <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center">
          Contact us on: youthphilosophy544@gmail.com
        </p>
        <a
          href="https://www.instagram.com/direct/t/17842385087999992"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button content="CHAT TO SUPPORT TEAM" />
        </a>
      </div>

      <div className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-tight lowercase text-center font-[DIRTYLINE]">
          MOST <span className="text-[#E30A03]">FAQs</span>
        </h2>
        <div className="w-full flex flex-col gap-6">
          <FAQs Data={EBOOK_DATA.support} />
        </div>
      </div>

      <footer className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <h4 className="w-full p-4 px-0 lg:text-lg leading-tight text-center uppercase border-t-2 border-white">
          © {new Date().getFullYear()} Youth Philosophy. All Rights Reserved.
        </h4>
      </footer>
    </div>
  );
};

export default Support;
