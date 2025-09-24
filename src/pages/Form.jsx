import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Components
import DropDown from "../components/DropDown";

// Assets
import BrandLogo from "../assets/BrandLogo.png";
import CoursePreview from "../assets/CoursePreview.png";

const Form = () => {
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState({
    title: "IMPORTANT",
    body: "After payment, you'll be redirected to the website. The ebook link will be there—just wait a few seconds.",
    isError: false,
  });
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const EBOOK_PRICE = location.state?.ebookPrice ?? 499;
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    referral: "",
  });

  const navigate = useNavigate();
  const formContainerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      setRazorpayLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      setRazorpayLoaded(false);
      setMessageContent({
        title: "PAYMENT ERROR",
        body: "Failed to load payment system. Please refresh the page or try again later.",
        isError: true,
      });
      setShowMessage(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCHANGE = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFORM = async (e) => {
    e.preventDefault();
  };

  const handlePAYMENT = async () => {
    setShowMessage(false);

    if (!razorpayLoaded) {
      setMessageContent({
        title: "PAYMENT ERROR",
        body: "Payment system is still loading. Please wait a moment and try again.",
        isError: true,
      });
      setShowMessage(true);
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: EBOOK_PRICE * 100,
      currency: "INR",
      name: "YOUTH PHILOSOPHY",
      description: "Your Favorite Poison Ebook",
      image: BrandLogo,
      handler: async function (response) {
        setMessageContent({
          title: "Attention",
          body: "Please just wait a few seconds to get your ebook access link.",
          isError: false,
        });
        setShowMessage(true);

        try {
          const { razorpay_payment_id } = response;

          // Step 1: Send user data to Telegram via backend
          await axios.post(
            "https://youthphilosophy.vercel.app/api/sendUserData",
            {
              ...formData,
              paymentId: razorpay_payment_id,
            }
          );

          // Step 2: Generate invite link
          const linkRes = await axios.post(
            "https://youthphilosophy.vercel.app/api/generateInviteLink"
          );
          const inviteLink = linkRes.data.inviteLink;

          if (!inviteLink) {
            throw new Error("Failed to generate invite link");
          }

          // Step 3: Store + navigate to thank you
          localStorage.setItem("inviteLink", inviteLink);
          navigate("/thanks", { state: { inviteLink } });

          // Step 4: Send email with access link
          await axios.post("https://youthphilosophy.vercel.app/api/sendEmail", {
            name: formData.name,
            email: formData.email,
            inviteLink,
            paymentId: razorpay_payment_id,
          });
        } catch (err) {
          console.error("Post-payment error:", err.message);
          setMessageContent({
            title: "Oops!",
            body: "Payment was successful, but we failed to process your access. Please send us an email and you will get your ebook access link.",
            isError: true,
          });
          setShowMessage(true);
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#E30A03",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div
      ref={formContainerRef}
      className="w-full min-h-screen p-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6 font-[SPACEGROTESK] text-white bg-black"
    >
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
      <form onSubmit={handleFORM} className="w-full flex flex-col gap-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleCHANGE}
          required
          autoComplete="off"
          className="p-4 w-full rounded outline-none border-none bg-zinc-800"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleCHANGE}
          required
          autoComplete="off"
          className="p-4 w-full rounded outline-none border-none bg-zinc-800"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleCHANGE}
          required
          autoComplete="off"
          className="p-4 w-full rounded outline-none border-none bg-zinc-800"
        />
        <DropDown
          label="Select Your Age"
          name="age"
          options={["Under 18", "18-24", "25-34", "35+"]}
          value={formData.age}
          onChange={handleCHANGE}
          onToggle={(isOpen) => {
            if (formContainerRef.current) {
              formContainerRef.current.style.minHeight = isOpen
                ? "120vh"
                : "100vh";
            }
          }}
        />
        <DropDown
          label="How Did You Hear About Us?"
          name="referral"
          options={["YouTube", "Instagram", "A Friend", "Other"]}
          value={formData.referral}
          onChange={handleCHANGE}
          onToggle={(isOpen) => {
            if (formContainerRef.current) {
              formContainerRef.current.style.minHeight = isOpen
                ? "120vh"
                : "100vh";
            }
          }}
        />
        <button
          onClick={handlePAYMENT}
          className="w-full p-4 text-lg lg:text-xl font-medium lowercase rounded font-[DIRTYLINE] bg-[#E30A03] hover:bg-[#620905] transition-all duration-400 ease-in-out"
        >
          PROCEED TO PAYMENT
        </button>
        {showMessage && (
          <div className="w-screen h-screen p-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex items-center justify-center top-0 left-0 fixed font-[SPACEGROTESK] text-white bg-black/80">
            <div className="w-full p-6 flex gap-4 flex-col rounded bg-zinc-800">
              <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
                {messageContent.title}
              </h2>
              <p className="text-lg lg:text-xl leading-none lg:leading-normal text-center">
                {messageContent.body}
              </p>
              {messageContent.isError ? (
                <a
                  href="mailto:youthphilosophy544@gmail.com"
                  className="w-full mt-2 p-4 text-lg lg:text-xl font-medium text-center lowercase rounded font-[DIRTYLINE] bg-[#E30A03] hover:bg-[#620905] transition-all duration-400 ease-in-out"
                  onClick={() => setShowMessage(false)}
                >
                  CONTACT TO SUPPORT
                </a>
              ) : (
                <a
                  className="w-full mt-2 p-4 text-lg lg:text-xl font-medium text-center lowercase rounded font-[DIRTYLINE] bg-[#E30A03] hover:bg-[#620905] transition-all duration-400 ease-in-out"
                  onClick={() => setShowMessage(false)}
                >
                  OKAY
                </a>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
