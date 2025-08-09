import React from "react";

const RefundPolicy = () => {
  return (
    <div className="w-full min-h-screen p-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col gap-6 font-[SPACEGROTESK] text-white bg-black">
      <h2 className="text-4xl lg:text-5xl leading-tight lowercase text-center font-[DIRTYLINE]">
        REFUND POLICY
      </h2>
      <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
        No Refunds for the ebook once purchased.
      </p>
      <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
        If a customer does not receive access, we will verify the payment and
        provide the link again.
      </p>
      <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
        If a customer accidentally pays more than once, a refund will be
        processed via Razorpay within 5-7 days.
      </p>
    </div>
  );
};

export default RefundPolicy;
