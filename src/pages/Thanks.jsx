import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import Button from "../components/Button";
import Message from "../components/Message";

// Assets
import CoursePreview from "../assets/CoursePreview.png";

const Thanks = () => {
  const location = useLocation();
  const inviteLink = location.state?.inviteLink || "";
  const [showMessage, setShowMessage] = useState(false);

  const handleDownloadClick = () => {
    if (inviteLink.trim()) {
      window.open(inviteLink, "_blank");
    } else {
      setShowMessage(true);
    }
  };

  return (
    <div className="w-full min-h-screen p-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6 font-[SPACEGROTESK] text-white bg-black">
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
      <p className="text-lg lg:text-xl leading-none lg:leading-normal text-center">
        Successfully ebook purchased! Click the button below or check your email
        for the ebook link. Remember, it's a one-time link, so be careful. If
        facing any problems, contact:
        <br />
        <a href="mailto:youthphilosophy544@gmail.com" className="underline">
          youthphilosophy544@gmail.com
        </a>
      </p>

      <button onClick={handleDownloadClick} className="w-full">
        <Button content="Download Ebook" />
      </button>

      {showMessage && (
        <Message
          showMessage={showMessage}
          setShowMessage={setShowMessage}
          message="Oops! No download link found. Please check your email or contact support."
        />
      )}
    </div>
  );
};

export default Thanks;
