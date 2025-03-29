import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Components
import Button from "../components/Button";

// Assets
import CoursePreview from "../assets/CoursePreview.png";

const Thanks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inviteLink = location.state?.inviteLink || "";

  const handleDOWNLOAD = () => {
    if (inviteLink.trim()) {
      window.open(inviteLink, "_blank");
    } else {
      navigate("/");
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

      {inviteLink ? (
        <>
          <p className="text-lg lg:text-xl leading-none lg:leading-normal text-center">
            Congratulations! You have successfully purchased the ebook. Click
            the button below to access the exclusive ebook. Remember, it's a
            one-time link, so be careful. If facing any problem, contact:
            <br />
            <br />
            <a href="mailto:youthphilosophy544@gmail.com" className="underline">
              youthphilosophy544@gmail.com
            </a>
          </p>
          <button onClick={handleDOWNLOAD} className="w-full">
            <Button content="JOIN PRIVATE COMMUNITY" />
          </button>
        </>
      ) : (
        <>
          <p className="text-lg lg:text-xl leading-none lg:leading-normal text-center">
            Looks like you don't puschased the ebook. Click the link below to
            access the ebook, if you're facing any problem, contact:
            <br />
            <br />
            <a href="mailto:youthphilosophy544@gmail.com" className="underline">
              youthphilosophy544@gmail.com
            </a>
          </p>
          <button onClick={handleDOWNLOAD} className="w-full">
            <Button content="PURCHASE THE EBOOK" />
          </button>
        </>
      )}
    </div>
  );
};

export default Thanks;
