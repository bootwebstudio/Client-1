import React from "react";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import DropDown from "../components/DropDown";

// Assets
import BrandLogo from "../assets/BrandLogo.png";
import CoursePreview from "../assets/CoursePreview.png";

const Form = () => {
  const [showMessage, setShowMessage] = useState(false);

  const EBOOK_PRICE = import.meta.env.VITE_EBOOK_PRICE;
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TELEGRAM_DATABASE_CHAT_ID = import.meta.env
    .VITE_TELEGRAM_DATABASE_CHAT_ID;
  const TELEGRAM_INVITE_LINK_CHAT_ID = import.meta.env
    .VITE_TELEGRAM_INVITE_LINK_CHAT_ID;
  const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;

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
    document.body.appendChild(script);
  }, []);

  const handleCHANGE = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFORM = async (e) => {
    e.preventDefault();
    setShowMessage(true);
  };

  const handlePAYMENT = async () => {
    setShowMessage(false);

    try {
      const options = {
        key: RAZORPAY_KEY,
        amount: EBOOK_PRICE * 100,
        currency: "INR",
        capture: "automatic",
        capture_options: {
          automatic_expiry_period: 12,
          manual_expiry_period: 7200,
          refund_speed: "optimum",
        },
        name: "YOUTH PHILOSOPHY",
        description: "Your Favorite Poison Ebook",
        image: BrandLogo,
        handler: async (response) => {
          await sendUSERDATA(response);
          const inviteLink = await generateINVITELINK();
          if (inviteLink) {
            localStorage.setItem("inviteLink", inviteLink);
            navigate("/thanks", { state: { inviteLink } });
            setTimeout(() => {
              sendEmail(inviteLink, response.razorpay_payment_id);
            }, 1000);
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
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const sendUSERDATA = async (paymentDetails) => {
    try {
      const messageContent = `📩 New User Data:\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone}\n🎂 Age: ${formData.age}\n📢 Referral: ${formData.referral}\n💳 Payment ID: ${paymentDetails.razorpay_payment_id}`;

      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_DATABASE_CHAT_ID,
          text: messageContent,
        }
      );
    } catch (error) {
      console.error("Error sending user data to Telegram:", error);
    }
  };

  const generateINVITELINK = async () => {
    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/createChatInviteLink`,
        {
          chat_id: TELEGRAM_INVITE_LINK_CHAT_ID,
          expire_date: Math.floor(Date.now() / 1000) + 86400,
          member_limit: 1,
        }
      );
      return response.data.result?.invite_link || null;
    } catch (error) {
      console.error("Error generating invite link:", error);
      return null;
    }
  };

  const sendEmail = async (inviteLink, paymentId) => {
    try {
      await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: { email: "pvt.suraj37@gmail.com", name: "YOUTH PHILOSOPHY" },
          to: [{ email: formData.email, name: formData.name }],
          subject: `Your Favorite Poison Ebook for ${formData.name}!`,
          htmlContent: `
          <p><strong>Hello ${formData.name},</strong></p>
          <p>Welcome to a life-changing experience! 🚀 You've successfully purchased, and your journey starts now.</p>
          <p>Here's your exclusive ebook access:</p>
          <p><a href="${inviteLink}">Download Now</a></p>
          <p>Payment ID: <strong>${paymentId}</strong></p>
          <p>If you face any issues, we're here to help! Just reach out, and we'll make it right.</p>
          <p>Best regards,<br><strong>Youth Philosophy</strong></p>
        `,
        },
        {
          headers: {
            "api-key": BREVO_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error sending email:", error);
    }
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
          type="submit"
          className="w-full p-4 text-lg lg:text-xl font-medium lowercase rounded font-[DIRTYLINE] bg-[#E30A03] hover:bg-[#620905] transition-all duration-400 ease-in-out"
        >
          PROCEED TO PAYMENT
        </button>
        {showMessage && (
          <div className="w-screen h-screen p-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex items-center justify-center top-0 left-0 fixed font-[SPACEGROTESK] text-white bg-black/60">
            <div className="w-full p-6 flex gap-4 flex-col rounded bg-zinc-800">
              <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
                IMPORTANT
              </h2>
              <p className="text-lg lg:text-xl leading-none lg:leading-normal text-center">
                Please make your payment via UPI or other available options.
                Kindly avoid using PhonePe and the QR code at the moment, as
                it's currently not working.
              </p>
              <button
                type="button"
                className="w-full mt-2 p-4 text-lg lg:text-xl font-medium lowercase rounded font-[DIRTYLINE] bg-[#E30A03] hover:bg-[#620905] transition-all duration-400 ease-in-out"
                onClick={handlePAYMENT}
              >
                Get the Ebook at{" "}
                <span className="font-semibold font-[SPACEGROTESK]">
                  ₹{EBOOK_PRICE}
                </span>{" "}
                <span className="font-semibold line-through font-[SPACEGROTESK]">
                  ₹499
                </span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
