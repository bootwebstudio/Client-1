import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";

const FAQs = ({ Data }) => {
  const [OPEN_INDEX, SET_OPEN_INDEX] = useState(null);

  const toggleFAQ = (index) => {
    SET_OPEN_INDEX(OPEN_INDEX === index ? null : index);
  };

  return (
    <div className="w-full flex gap-6 flex-col">
      {Data.map((faq, index) => (
        <div
          key={index}
          className="w-full p-6 rounded text-lg lg:text-xl leading-tight lg:leading-normal bg-[#1A1A1A] cursor-pointer"
          onClick={() => toggleFAQ(index)}
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
            <p className="mt-6">{faq.answer}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
