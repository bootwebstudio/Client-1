import React from "react";
import EBOOK_DATA from "../ebookData";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

// Components
import Button from "../components/Button";

// Assets
import Quotation from "../assets/Quotation.svg";
import EbookCover from "../assets/EbookCover2.png";
import CoursePreview from "../assets/CoursePreview.png";

const Home = () => {
  const EBOOK_PRICE = import.meta.env.VITE_EBOOK_PRICE;
  const EBOOK_DEAL_COUNT = import.meta.env.VITE_EBOOK_DEAL_COUNT;

  const [OPEN_INDEX, SET_OPEN_INDEX] = useState(null);

  const TOGGLE_FAQ = (index) => {
    SET_OPEN_INDEX(OPEN_INDEX === index ? null : index);
  };

  const GET_TIME_REMAINING = (endTime) => {
    const TOTAL = Date.parse(endTime) - Date.now();
    const SECONDS = Math.floor((TOTAL / 1000) % 60);
    const MINUTES = Math.floor((TOTAL / 1000 / 60) % 60);
    const HOURS = Math.floor((TOTAL / 1000 / 60 / 60) % 24);
    const DAYS = Math.floor(TOTAL / (1000 * 60 * 60 * 24));
    return { TOTAL, DAYS, HOURS, MINUTES, SECONDS };
  };

  useEffect(() => {
    const COUNTDOWN = localStorage.getItem("countdownEnd");

    if (COUNTDOWN !== EBOOK_DEAL_COUNT) {
      localStorage.setItem("countdownEnd", EBOOK_DEAL_COUNT);
    }
  }, [EBOOK_DEAL_COUNT]);

  const [TIME_LEFT, SET_TIME_LEFT] = useState(
    GET_TIME_REMAINING(localStorage.getItem("countdownEnd") || EBOOK_PRICE)
  );

  useEffect(() => {
    const INTERVAL = setInterval(() => {
      const NEW_TIME_LEFT = GET_TIME_REMAINING(
        localStorage.getItem("countdownEnd")
      );
      if (NEW_TIME_LEFT.TOTAL <= 0) {
        clearInterval(INTERVAL);
      }
      SET_TIME_LEFT(NEW_TIME_LEFT);
    }, 1000);

    return () => clearInterval(INTERVAL);
  }, []);

  const EBOOK_CTA = [
    { label: "DAY", value: TIME_LEFT.DAYS },
    { label: "HOUR", value: TIME_LEFT.HOURS },
    { label: "MIN", value: TIME_LEFT.MINUTES },
    { label: "SEC", value: TIME_LEFT.SECONDS },
  ];

  return (
    <div className="w-full h-full font-[SPACEGROTESK] text-white bg-black">
      {/* HERO */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6">
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
        <p className="text-lg lg:text-xl leading-none lg:leading-normal text-center">
          This isn't just another self-help e-book. This is your ultimate
          step-by-step guide to reclaiming your self-control, building
          unstoppable willpower, and transforming your life.
        </p>
        <p className="text-lg lg:text-xl leading-none lg:leading-normal text-center">
          No more urges. No more guilt. Just a clear, focused, and powerful YOU.
        </p>
        <Link to="/form" className="w-full">
          <Button content="GET THE EBOOK NOW" />
        </Link>
      </section>

      {/* WHY THIS EBOOK? */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          WHY THIS <span className="text-[#E30A03]">EBOOK?</span>
        </h2>

        <p className="text-lg lg:text-xl leading-none lg:leading-normal text-center">
          This ebook is written by <strong>Suraj Yadav</strong>, the creator of
          the YouTube channel <strong>Youth Philosophy.</strong>
        </p>

        <p className="text-lg lg:text-xl leading-none lg:leading-normal text-center">
          He was trapped in this cycle for <strong>8 years</strong>, struggling
          to break free. After deep research, personal experiments, and
          self-observation, he finally escaped this addiction. Now, he's sharing
          everything he learned so that you can break free too—
          <strong>permanently</strong>.
        </p>
      </section>

      {/* CHAPTERS */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6">
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
              className="text-lg lg:text-xl leading-none lg:leading-normal"
            >
              <span className="">
                📖 <strong>{feature.title}:</strong> {feature.description}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-lg lg:text-xl leading-none lg:leading-normal text-center">
          Each chapter includes homework assignments to help you apply what you
          learn and make lasting changes.
        </p>
      </section>

      {/* EBOOK */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6">
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
            <h3 className="text-2xl lg:text-3xl leading-none text-center lowercase font-[DIRTYLINE]">
              The Ultimate NoFap Guide — Quit Masturbation & Porn Forever!
            </h3>
            <ul className="flex flex-col gap-6">
              {EBOOK_DATA.details.map((detail, index) => (
                <li
                  key={index}
                  className="text-lg lg:text-xl leading-none lg:leading-normal flex items-start"
                >
                  <span className="mr-2">✅</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <Link to="/form" className="w-full">
              <Button content="Grab the ultimate guide" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6">
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
              <p className="text-lg lg:text-xl leading-none lg:leading-normal">
                {testimonial.content}
              </p>
              <cite className="text-lg lg:text-xl leading-none lg:leading-normal">
                — {testimonial.name}
              </cite>
            </div>
          </div>
        ))}
      </section>

      {/* FAQs */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          MOST <span className="text-[#E30A03]">FAQs</span>
        </h2>
        <div className="w-full flex flex-col gap-6">
          {EBOOK_DATA.faqs.map((faq, index) => (
            <div
              key={index}
              className="w-full p-6 rounded text-lg lg:text-xl leading-none lg:leading-normal bg-[#1A1A1A]"
              onClick={() => TOGGLE_FAQ(index)}
            >
              {/* Question Section */}
              <div className="flex items-center">
                <h4 className="w-full">{faq.question}</h4>
                {OPEN_INDEX === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {/* Answer Section */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  OPEN_INDEX === index
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="mt-6 ">{faq.answer}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* WHO I AM? */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          WHO <span className="text-[#E30A03]">I AM?</span>
        </h2>
        <div className="flex flex-col text-lg lg:text-xl text-center leading-none lg:leading-normal gap-6">
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
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6">
        <h2 className="text-4xl lg:text-5xl leading-none lowercase text-center font-[DIRTYLINE]">
          GRAB THE <span className="text-[#E30A03]">DEAL</span>
        </h2>
        <div className="w-full p-6 flex gap-6 flex-col items-center rounded bg-[#1A1A1A]">
          <figure>
            <img
              src={EbookCover}
              alt="Course preview image showcasing transformation from addiction to self-control"
              className="w-full rounded"
              loading="lazy"
            />
          </figure>
          <div className="w-full flex gap-6 items-center justify-evenly">
            {EBOOK_CTA.map((cta, index) => (
              <div
                key={index}
                className="w-full text-2xl lg:text-3xl leading-none lowercase flex gap-6 flex-col items-center"
              >
                <div className="w-full p-6 sm:p-8 px-0 text-center font-bold rounded text-[#1A1A1A] bg-white">
                  {cta.value}
                </div>
                <h2 className="font-[DIRTYLINE]">{cta.label}</h2>
              </div>
            ))}
          </div>
          <Link to="/form" className="w-full">
            <button className="w-full p-4 text-lg lg:text-xl font-medium lowercase rounded font-[DIRTYLINE] bg-[#E30A03] hover:bg-[#620905] transition-all duration-400 ease-in-out">
              Get the Ebook at{" "}
              <span className="font-semibold font-[SPACEGROTESK]">
                ₹{EBOOK_PRICE}
              </span>{" "}
              <span className="font-semibold line-through font-[SPACEGROTESK]">
                ₹1799
              </span>
            </button>
          </Link>
        </div>
      </section>

      {/* FREE RESOURCE */}
      <section className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6">
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
          className="w-full"
          download="Free Resource"
        >
          <Button content="READ 1ST CHAPTER — FREE" />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="w-full pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-64 flex flex-col items-center gap-6">
        <h4 className="w-full p-4 px-0 lg:text-lg leading-none text-center uppercase border-t-2 border-white">
          © {new Date().getFullYear()} Youth Philosophy. All Rights Reserved.
        </h4>
      </footer>
    </div>
  );
};

export default Home;
