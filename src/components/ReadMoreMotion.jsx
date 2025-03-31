"use client"
import { useState } from "react";
import { motion } from "framer-motion";

const ReadMoreMotion = ({ text, maxLength = 140 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="text-body text-description my-3 ">
      <motion.p
        initial={{ opacity: 1 }}
        animate={{ opacity: isExpanded ? 1 : 0.8 }}
        transition={{ duration: 0.4 }}
      >
        {isExpanded ? text : text.slice(0, maxLength) }
      </motion.p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-500  mt-2"
      >
        {isExpanded ? "អានតិច" : "អានបន្ថែម"}
      </button>
    </div>
  );
};

export default ReadMoreMotion;
