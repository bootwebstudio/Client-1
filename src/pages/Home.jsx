import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

import EBOOK_DATA from "../ebookData";

// Icons
import { Mail } from "lucide-react";
import { BookOpenText } from "lucide-react";
import { BadgePercent } from "lucide-react";

// Components
import FAQs from "../components/FAQs";
import Button from "../components/Button";

// Assets
import Quotation from "../assets/Quotation.svg";
import EbookCover from "../assets/EbookCover.png";
import CoursePreview from "../assets/CoursePreview.png";

const Home = () => {
  const inviteLink =
    location.state?.inviteLink || localStorage.getItem("inviteLink") || "";

  const EBOOK_DEAL_VERSION = "v1.1";
  const EBOOK_PRICE = import.meta.env.VITE_EBOOK_PRICE;
  const EBOOK_DEAL_COUNT = import.meta.env.VITE_EBOOK_DEAL_COUNT;
  const MIN_EBOOKS = 0;

  const [EXPANDED, SET_EXPANDED] = useState(false);
  const [ebookCount, setEbookCount] = useState(() => {
    const saved = localStorage.getItem("ebookCount");
    return saved ? parseInt(saved) : Math.floor(Math.random() * 20) + 475;
  });

  // Countdown calculation
  const GET_TIME_REMAINING = (endTime) => {
    const TOTAL = Date.parse(endTime) - Date.now();
    const SECONDS = Math.floor((TOTAL / 1000) % 60);
    const MINUTES = Math.floor((TOTAL / 1000 / 60) % 60);
    const HOURS = Math.floor((TOTAL / 1000 / 60 / 60) % 24);
    const DAYS = Math.floor(TOTAL / (1000 * 60 * 60 * 24));
    return { TOTAL, DAYS, HOURS, MINUTES, SECONDS };
  };

  const [TIME_LEFT, SET_TIME_LEFT] = useState(
    GET_TIME_REMAINING(localStorage.getItem("countdownEnd") || EBOOK_DEAL_COUNT)
  );

  // Initialize or update ebook deal version & countdown and count
  useEffect(() => {
    const storedVersion = localStorage.getItem("ebookDealVersion");
    const storedCountdown = localStorage.getItem("countdownEnd");

    if (storedVersion !== EBOOK_DEAL_VERSION || !storedCountdown) {
      const newCount = Math.floor(Math.random() * 20) + 475;
      localStorage.setItem("ebookCount", newCount.toString());
      localStorage.setItem("countdownEnd", EBOOK_DEAL_COUNT);
      localStorage.setItem("ebookDealVersion", EBOOK_DEAL_VERSION);
      localStorage.setItem("lastDecreaseTime", Date.now().toString());
      setEbookCount(newCount);
    }

    const now = Date.now();
    const savedCount =
      parseInt(localStorage.getItem("ebookCount")) || ebookCount;
    const lastUpdate =
      parseInt(localStorage.getItem("lastDecreaseTime")) || now;

    const hoursPassed = (now - lastUpdate) / (1000 * 60 * 60);
    let newCount = savedCount;

    if (hoursPassed >= 1) {
      const decreaseBy = Math.floor(Math.random() * 10) + 5;
      newCount = Math.max(savedCount - decreaseBy, MIN_EBOOKS);
      localStorage.setItem("ebookCount", newCount.toString());
      localStorage.setItem("lastDecreaseTime", now.toString());
      setEbookCount(newCount);
    }

    // Auto-decrease ebook count every 5–15 seconds while user is on page
    const interval = setInterval(() => {
      setEbookCount((prevCount) => {
        if (prevCount <= MIN_EBOOKS) return prevCount;
        const newCount = prevCount - 1;
        localStorage.setItem("ebookCount", newCount.toString());
        localStorage.setItem("lastDecreaseTime", Date.now().toString());
        return newCount;
      });
    }, Math.floor(Math.random() * 10000) + 5000);

    return () => clearInterval(interval);
  }, []);

  // Countdown timer update every second
  useEffect(() => {
    const INTERVAL = setInterval(() => {
      const NEW_TIME_LEFT = GET_TIME_REMAINING(
        localStorage.getItem("countdownEnd")
      );
      if (NEW_TIME_LEFT.TOTAL <= 0) {
        setEbookCount(0);
        localStorage.setItem("ebookCount", "0");
        clearInterval(INTERVAL);
      }
      SET_TIME_LEFT(NEW_TIME_LEFT);
    }, 1000);

    return () => clearInterval(INTERVAL);
  }, []);

  // Shortcut expansion
  useEffect(() => {
    const showTimer = setTimeout(() => SET_EXPANDED(true), 5000);
    const hideTimer = setTimeout(() => SET_EXPANDED(false), 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const toggleShortcut = () => {
    SET_EXPANDED(true);
    setTimeout(() => SET_EXPANDED(false), 3000);
  };

  const EBOOK_CTA = [
    { label: "DAY", value: TIME_LEFT.DAYS },
    { label: "HOUR", value: TIME_LEFT.HOURS },
    { label: "MIN", value: TIME_LEFT.MINUTES },
    { label: "SEC", value: TIME_LEFT.SECONDS },
  ];

  const isOfferExpired = ebookCount <= 0 || TIME_LEFT.TOTAL <= 0;

  return (
    <div className="w-full h-full relative font-[SPACEGROTESK] text-white bg-black">
      {/* SHORTCUT */}
      {inviteLink ? (
        <Link to="/thanks">
          <div
            onClick={toggleShortcut}
            className="p-4 fixed bottom-6 right-6 xl:bottom-12 xl:right-12 bg-[#E30A03] rounded-full flex items-center transition-all duration-1000 ease-in-out overflow-hidden z-50"
          >
            <BookOpenText size="28px" />
            <span
              className={`text-lg font-medium whitespace-nowrap transform transition-all duration-1000 ease-in-out 
          ${
            EXPANDED
              ? "opacity-100 translate-x-0 max-w-xs ml-2"
              : "opacity-0 -translate-x-2 max-w-0 overflow-hidden"
          }
        `}
            >
              Here is the ebook link!
            </span>
          </div>
        </Link>
      ) : (
        <div
          onClick={toggleShortcut}
          className="p-4 fixed bottom-6 right-6 xl:bottom-12 xl:right-12 bg-[#E30A03] rounded-full flex items-center transition-all duration-1000 ease-in-out overflow-hidden z-50"
        >
          <BadgePercent size="28px" />
          <span
            className={`text-lg font-medium whitespace-nowrap transform transition-all duration-1000 ease-in-out 
          ${
            EXPANDED
              ? "opacity-100 translate-x-0 max-w-xs ml-2"
              : "opacity-0 -translate-x-2 max-w-0 overflow-hidden"
          }
        `}
          >
            {!isOfferExpired
              ? `Only ${ebookCount} ebooks left!`
              : "Offer Expired"}
          </span>
        </div>
      )}

      {/* HERO */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <figure>
          <img
            src={CoursePreview}
            alt="Course preview image showcasing transformation from addiction to self-control"
            className="w-full rounded"
            loading="lazy"
          />
        </figure>
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          ARE YOU <span className="text-[#E30A03]">TRAPPED</span> IN THE{" "}
          <span className="text-[#E30A03]">CYCLE</span> OF{" "}
          <span className="text-[#E30A03]">MASTURBATION & PORN</span> ADDICTION?
        </h2>
        <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center">
          This isn't just another self-help ebook. This is your ultimate
          step-by-step guide to reclaiming your self-control, building
          unstoppable willpower, and transforming your life.
        </p>
        <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center">
          No more urges. No more guilt. Just a clear, focused, and powerful YOU.
        </p>
        <Link
          to="/form"
          state={{ ebookPrice: isOfferExpired ? 499 : EBOOK_PRICE }}
          className="w-full"
        >
          <Button content="GET THE EBOOK NOW" />
        </Link>
      </section>

      {/* WHY THIS EBOOK? */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          WHY THIS <span className="text-[#E30A03]">EBOOK?</span>
        </h2>

        <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center">
          This ebook is written by <strong>Suraj Yadav</strong>, the creator of
          the YouTube channel <strong>Youth Philosophy.</strong>
        </p>

        <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center">
          He was trapped in this cycle for <strong>8 years</strong>, struggling
          to break free. After deep research, personal experiments, and
          self-observation, he finally escaped this addiction. Now, he's sharing
          everything he learned so that you can break free too—
          <strong>permanently</strong>.
        </p>
      </section>

      {/* CHAPTERS */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          WHAT YOU'LL <span className="text-[#E30A03]">LEARN?</span>
        </h2>

        <figure>
          <img
            src={EbookCover}
            alt="Course preview image showcasing transformation from addiction to self-control"
            className="w-full rounded"
            loading="lazy"
          />
        </figure>

        <ul className="flex gap-6 flex-col">
          {EBOOK_DATA.features.map((feature, index) => (
            <li
              key={index}
              className="text-lg lg:text-xl leading-tight lg:leading-normal"
            >
              <span className="">
                📖 <strong>{feature.title}:</strong> {feature.description}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center">
          Each chapter includes homework assignments to help you apply what you
          learn and make lasting changes.
        </p>
      </section>

      {/* EBOOK */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          GRAB THE <span className="text-[#E30A03]">EBOOK</span>
        </h2>
        <div className="w-full flex flex-col rounded bg-[#1A1A1A]">
          {/* Image */}
          <figure>
            <img
              src={CoursePreview}
              alt="Course preview image showcasing transformation from addiction to self-control"
              className="w-full rounded"
              loading="lazy"
            />
          </figure>
          {/* Content */}
          <div className="p-6 flex flex-col gap-6">
            <h3 className="text-2xl lg:text-3xl leading-tight text-center lowercase font-[DIRTYLINE]">
              The Ultimate NoFap Guide — Quit Masturbation & Porn Forever!
            </h3>
            <ul className="flex flex-col gap-6">
              {EBOOK_DATA.details.map((detail, index) => (
                <li
                  key={index}
                  className="text-lg lg:text-xl leading-tight lg:leading-normal flex items-start"
                >
                  <span className="mr-2">✅</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/form"
              state={{ ebookPrice: isOfferExpired ? 499 : EBOOK_PRICE }}
              className="w-full"
            >
              <Button content="Grab the ultimate guide" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          REAL <span className="text-[#E30A03]">STORIES</span>
        </h2>

        {EBOOK_DATA.testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-full p-6 flex gap-6 rounded overflow-hidden bg-[#1A1A1A]"
          >
            {/* Quote Icon */}
            <img src={Quotation} alt="Quote Icon" className="h-4" />

            {/* Testimonial Content */}
            <div className="w-full flex flex-col gap-4">
              <p className="text-lg lg:text-xl leading-tight lg:leading-normal">
                {testimonial.content}
              </p>
              <cite className="text-lg lg:text-xl leading-tight lg:leading-normal">
                — {testimonial.name}
              </cite>
            </div>
          </div>
        ))}
      </section>

      {/* FAQs */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          MOST <span className="text-[#E30A03]">FAQs</span>
        </h2>
        <div className="w-full flex flex-col gap-6">
          <FAQs Data={EBOOK_DATA.faqs} />
        </div>
      </section>

      {/* WHO I AM? */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          WHO <span className="text-[#E30A03]">I AM?</span>
        </h2>
        <div className="flex flex-col text-lg lg:text-xl text-center leading-tight lg:leading-normal gap-6">
          <p>
            I'm Suraj Yadav, the creator of <strong>Youth Philosophy</strong>, a
            YouTube channel dedicated to helping the youth break free from bad
            habits and unlock their true potential.
          </p>
          <p>
            I know the struggles—endless urges, wasted time, and the frustration
            of feeling stuck. I've been there. That's why I created this
            practical, no-fluff ebook—to give you the exact roadmap that changed
            my life and the lives of thousands of others.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          GRAB THE <span className="text-[#E30A03]">DEAL</span>
        </h2>

        <div className="w-full p-6 flex gap-6 flex-col items-center rounded bg-[#1A1A1A]">
          <figure>
            <img
              src={EbookCover}
              alt="ebook"
              className="w-full"
              loading="lazy"
            />
          </figure>

          <div className="w-full flex gap-6 items-center justify-evenly">
            {EBOOK_CTA.map((cta, index) => (
              <div
                key={index}
                className="w-full text-2xl lg:text-3xl leading-tight lowercase flex gap-6 flex-col items-center"
              >
                <div className="w-full p-6 sm:p-8 px-0 text-center font-bold rounded text-[#1A1A1A] bg-white">
                  {!isOfferExpired ? cta.value : "0"}
                </div>
                <h2 className="font-[DIRTYLINE]">{cta.label}</h2>
              </div>
            ))}
          </div>

          <Link
            to="/form"
            state={{ ebookPrice: isOfferExpired ? 499 : EBOOK_PRICE }}
            className="w-full"
          >
            <button className="w-full p-4 text-lg lg:text-xl font-medium lowercase rounded font-[DIRTYLINE] bg-[#E30A03] hover:bg-[#620905] transition-all duration-400 ease-in-out">
              Get the Ebook at{" "}
              <span
                className={`${
                  !isOfferExpired ? "" : "hidden"
                } font-semibold font-[SPACEGROTESK]`}
              >
                ₹{EBOOK_PRICE}
              </span>{" "}
              <span
                className={`font-semibold ${
                  !isOfferExpired ? "line-through" : ""
                } font-[SPACEGROTESK]`}
              >
                ₹499
              </span>
            </button>
          </Link>

          <p className="text-lg lg:text-xl leading-tight lg:leading-normal text-center font-semibold">
            <AnimatePresence mode="wait">
              <motion.span
                key={ebookCount}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {!isOfferExpired
                  ? `Only ${ebookCount} ebooks Left at this price — Hurry up!`
                  : "Offer Expired - Full Price Now!"}
              </motion.span>
            </AnimatePresence>
          </p>
        </div>
      </section>

      {/* FREE RESOURCE */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          FREE <span className="text-[#E30A03]">RESOURCE</span>
        </h2>
        <figure>
          <img
            src={EbookCover}
            alt="Course preview image showcasing transformation from addiction to self-control"
            className="w-full rounded"
            loading="lazy"
          />
        </figure>
        <a
          href="./FREE_RESOURCE.zip"
          download
          className="w-full mt-2 mx-0 p-4 text-lg lg:text-xl font-medium text-center lowercase rounded font-[DIRTYLINE] bg-[#E30A03] hover:bg-[#620905] transition-all duration-400 ease-in-out"
        >
          TRY CHAPTER 1 FOR FREE
        </a>
      </section>

      {/* FOOTER */}
      <footer className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-80 flex flex-col items-center gap-4">
        <div className="w-full pt-4 px-0 lg:text-lg leading-tight uppercase border-t-2 border-white flex flex-col gap-4">
          {/* CONTACT */}
          <div className="w-full flex flex-col items-center">
            <h4 className="pb-2 text-lg lg:text-xl leading-tight uppercase font-bold">
              CONTACT US
            </h4>
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <a
                href="mailto:youthphilosophy544@gmail.com"
                className="text-lg lg:text-xl lowercase"
              >
                youthphilosophy544@gmail.com
              </a>
            </div>
          </div>
          {/* SOCIAL LINKS */}
          <div className="w-full flex flex-col items-center">
            <h4 className="pb-2 text-lg lg:text-xl leading-tight uppercase font-bold">
              COMPANY
            </h4>
            <Link to="/help-support">Help & Support</Link>
            <Link to="/privacy-policies">Privacy Policies</Link>
            <Link
              to="/terms-conditions"
              state={{ ebookPrice: isOfferExpired ? 499 : EBOOK_PRICE }}
            >
              Terms & Conditions
            </Link>
            <Link to="/refund-policy">Refund Policy</Link>
            <Link to="/shipping-policy">Shipping Policy</Link>
          </div>
        </div>
        <h4 className="w-full p-4 px-0 lg:text-lg leading-tight text-center uppercase border-t-2 border-white">
          Designed by{" "}
          <a
            href="https://bootwebstudio.github.io/Portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Bootweb Studio
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
