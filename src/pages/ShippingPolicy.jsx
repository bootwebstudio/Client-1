import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="w-full min-h-screen p-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col gap-6 font-[SPACEGROTESK] text-white bg-black">
      <h2 className="text-4xl lg:text-5xl leading-tight lowercase text-center font-[DIRTYLINE]">
        SHIPPING POLICY
      </h2>
      <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
        Since this is a digital product, there is no physical shipping.
      </p>
      <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
        Once payment is made, access to the ebook is provided instantly on the
        website.
      </p>
      <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
        A confirmation email with the access link is also sent immediately.
      </p>
    </div>
  );
};

export default ShippingPolicy;
