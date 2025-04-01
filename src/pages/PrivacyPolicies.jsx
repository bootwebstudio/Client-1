import React from "react";

const PrivacyPolicies = () => {
  return (
    <div className="w-full min-h-screen p-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col gap-6 font-[SPACEGROTESK] text-white bg-black">
      <h2 className="text-4xl lg:text-5xl leading-tight lowercase text-center font-[DIRTYLINE]">
        PRIVACY POLICIES
      </h2>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl lg:text-3xl leading-tight uppercase font-bold">
          1. Information We Collect
        </h4>
        <div className="text-lg lg:text-xl leading-tight lg:leading-normal">
          <p>We collect the following details from our users:</p>
          <ul>
            <li className="mx-6 list-disc">
              <b>Personal Information:</b> Name, email, phone number, and age.
            </li>
            <li className="mx-6 list-disc">
              <b>Referral Information:</b> How the user discovered our website
              (YouTube, Instagram ads, a friend, or other).
            </li>
            <li className="mx-6 list-disc">
              <b>Payment Information:</b> Payment ID for order verification.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl lg:text-3xl leading-tight uppercase font-bold">
          2. Why We Collect This Data?
        </h4>
        <div className="text-lg lg:text-xl leading-tight lg:leading-normal">
          <ul>
            <li className="mx-6 list-disc">
              To verify payments and grant access if any issue occurs.
            </li>
            <li className="mx-6 list-disc">
              To understand our audience demographics.
            </li>
            <li className="mx-6 list-disc">
              To analyze marketing performance through referral tracking.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl lg:text-3xl leading-tight uppercase font-bold">
          3. Third-Party Services We Use
        </h4>
        <div className="text-lg lg:text-xl leading-tight lg:leading-normal">
          <p>
            We use the following third-party services to operate our business:
          </p>
          <ul>
            <li className="mx-6 list-disc">
              <b>Razorpay:</b> Secure payment processing.
            </li>
            <li className="mx-6 list-disc">
              <b>Telegram:</b> Automated delivery of access links.
            </li>
            <li className="mx-6 list-disc">
              <b>Brevo:</b> Sending confirmation emails with product access.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl lg:text-3xl leading-tight uppercase font-bold">
          4. Data Storage & Security
        </h4>
        <div className="text-lg lg:text-xl leading-tight lg:leading-normal">
          <ul>
            <li className="mx-6 list-disc">
              We store user data indefinitely to ensure continued access
              support.
            </li>
            <li className="mx-6 list-disc">
              We do not sell or share personal data with third parties.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicies;
