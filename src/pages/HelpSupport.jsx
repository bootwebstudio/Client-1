import React from "react";
import { Link } from "react-router-dom";

// Components
import Button from "../components/Button";

const HelpSupport = () => {
  return (
    <div className="w-full min-h-screen pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col gap-6 font-[SPACEGROTESK] text-white bg-black">
      <h2 className="text-4xl lg:text-5xl leading-tight lowercase text-center font-[DIRTYLINE]">
        HELP & SUPPORT
      </h2>
      <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
        If you have already purchased the ebook but haven't received the access
        link, click the{" "}
        <Link to="/thanks">
          <strong className="underline">JOIN NOW</strong>
        </Link>{" "}
        button to retrieve it.
      </p>
      <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
        If you're facing any issues related to the ebook, feel free to reach out
        to us. We're here to help and will resolve your issue as soon as
        possible.
      </p>
      <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
        <strong>Response Time:</strong> We typically reply within 24 hours.
        Please be patient and avoid unnecessary stress—we assure you that your
        issue will be resolved promptly.
      </p>

      <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
        <strong>Business Address:</strong>
        <br />
        292, Mhow Goan,
        <br />
        Madhya Pradesh - 453441, India
      </p>

      <a
        href="mailto:youthphilosophy544@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <Button content="CONTACT TO SUPPORT TEAM" />
      </a>
    </div>
  );
};

export default HelpSupport;
