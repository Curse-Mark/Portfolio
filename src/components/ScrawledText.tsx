import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ScrawledText = ({ text, className, position = 'below' }) => {
  const [drawn, setDrawn] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDrawn(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1.5 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };
  
  // Size the SVG based on the text length
  const width = text.length * 20;
  
  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <span className={position === 'below' ? 'mb-2' : 'mt-2'}>
        {text}
      </span>
      {position === 'below' && (
        <motion.svg
          width={width}
          height="15"
          viewBox={`0 0 ${width} 15`}
          initial="hidden"
          animate={drawn ? "visible" : "hidden"}
          className={`absolute ${position === 'below' ? 'top-full -mt-2' : 'bottom-full -mb-2'}`}
        >
          <motion.path
            d={`M5,5 Q${width/4},25 ${width/2},5 Q${width*3/4},-15 ${width-5},5`}
            fill="transparent"
            strokeWidth="2"
            stroke="currentColor"
            className="text-brand-500"
            variants={pathVariants}
            custom={0}
          />
        </motion.svg>
      )}
    </div>
  );
};

ScrawledText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  position: PropTypes.oneOf(['below', 'above'])
};

export default ScrawledText;
