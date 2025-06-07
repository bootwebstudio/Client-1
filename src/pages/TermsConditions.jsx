import { useLocation } from "react-router-dom";

const TermsConditions = () => {
  const location = useLocation();
  const ebookPrice = location.state?.ebookPrice;
  const EBOOK_PRICE = ebookPrice || import.meta.env.VITE_EBOOK_PRICE;

  return (
    <div className="w-full min-h-screen p-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col gap-6 font-[SPACEGROTESK] text-white bg-black">
      <h2 className="text-4xl lg:text-5xl leading-tight lowercase text-center font-[DIRTYLINE]">
        TERMS & CONDITIONS
      </h2>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl lg:text-3xl leading-tight uppercase font-bold">
          1. Product & Usage Rules
        </h4>
        <div className="text-lg lg:text-xl leading-tight lg:leading-normal">
          <ul>
            <li className="mx-6 list-disc">
              Our product is a digital ebook on quitting porn addiction.
            </li>
            <li className="mx-6 list-disc">
              <b>One-time payment, one-time access:</b> Once you purchase, you
              will receive an access link via Telegram and email.
            </li>
            <li className="mx-6 list-disc">
              <b>Content Sharing is Strictly Prohibited:</b> Users are not
              allowed to share, distribute, or resell the ebook or access link.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl lg:text-3xl leading-tight uppercase font-bold">
          2. Age Restriction
        </h4>
        <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
          There is no age restriction for purchasing, but the content is
          intended for individuals 13 years and older.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl lg:text-3xl leading-tight uppercase font-bold">
          3. Pricing & Discounts
        </h4>
        <div className="text-lg lg:text-xl leading-tight lg:leading-normal">
          <ul>
            <li className="mx-6 list-disc">
              The actual price of the ebook is ₹499.
            </li>
            {ebookPrice ? (
              ""
            ) : (
              <li className="mx-6 list-disc">
                Currently, we are offering a discounted price of ₹{EBOOK_PRICE}.
              </li>
            )}
            <li className="mx-6 list-disc">
              Prices may change in the future based on promotions.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
