import React from "react";

// Components
import Button from "./Button";

const Message = ({ message, showMessage, setShowMessage }) => {
  return (
    <div
      className={`w-screen h-screen p-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex items-center justify-center top-0 left-0 fixed font-[SPACEGROTESK] text-white bg-black/60 ${
        showMessage ? "" : "hidden"
      }`}
    >
      <div className="w-full p-6 flex gap-6 flex-col rounded bg-zinc-800">
        <p className="text-lg lg:text-xl leading-none lg:leading-normal text-center">
          {message}
        </p>
        <div onClick={() => setShowMessage(!showMessage)}>
          <Button content="CLOSE" />
        </div>
      </div>
    </div>
  );
};

export default Message;
