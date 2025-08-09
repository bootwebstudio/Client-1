import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Components
import Button from "../components/Button";

// Assets
import CoursePreview from "../assets/CoursePreview.png";

const Thanks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inviteLink =
    location.state?.inviteLink || localStorage.getItem("inviteLink") || "";

  const handleDOWNLOAD = () => {
    if (inviteLink.trim()) {
      window.open(inviteLink, "_blank");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full min-h-screen p-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6 font-[SPACEGROTESK] text-white bg-black">
      <figure>
        <img
          src={CoursePreview}
          alt="Your favorite poison ebook"
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
          <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center">
            You have successfully purchased the ebook. Remember, it's a one-time
            link, so be careful. If you're facing any problem, contact us.
          </p>
          <Button content="GET THE EBOOK" onClick={handleDOWNLOAD} />
        </>
      ) : (
        <>
          <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center">
            Looks like you don't puschased the ebook. Click the link below to
            access the ebook, if you're facing any problem, contact us.
          </p>
          <Button content="PURCHASE THE EBOOK" onClick={handleDOWNLOAD} />
        </>
      )}
    </div>
  );
};

export default Thanks;
