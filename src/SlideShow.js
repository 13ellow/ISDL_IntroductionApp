// SlideShow.js
import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Box, Flex } from "@chakra-ui/react";
import "./style/Slideshow.css"


const variants = {
  initial: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 1,
    };
  },

  animate: {
    x: 0,
    opacity: 1,
    transition: {duration:0.5},
  },

  exit: (direction) => {
    return {
      x: direction > 0 ? -1000 : 1000,
      opacity: 1,
    };
  },
};

const SlideShow = ({ images, index, setIndex, playing }) => {
  const [direction, setDirection] = useState(0);
  const intervalTime = 3000;

  const nextStep = useCallback(() => {
    setDirection(1);
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }, [index, images.length, setIndex]);

  const prevStep = useCallback(() => {
    setDirection(-1);
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(index - 1);
    }
  }, [index, images.length, setIndex]);

  useEffect(() => {
    if (playing) {
      const intervalId = setInterval(() => {
        nextStep();
      }, intervalTime);

      return () => clearInterval(intervalId);
    }
  }, [playing, intervalTime, nextStep]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (playing) {
        if (e.key === "ArrowLeft") {
          prevStep();
        } else if (e.key === "ArrowRight") {
          nextStep();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playing, prevStep, nextStep]);

  return (
    <Box className="content">
      <Flex justify="space-between" alignItems="center">
        <Button
          colorScheme=""
          fontSize="4vw"
          className="prevbutton"
          onClick={prevStep}
        >
          ◀
        </Button>
          <div className="ss" >
            <AnimatePresence initial={false}>
              <motion.img
                initial="initial"
                animate="animate"
                // exit="exit"
                variants={variants}
                src={images[index]}
                alt="slides"
                className="slides"
                key={images[index]}
                custom={direction}
              />
            </AnimatePresence>
          </div>
        <Button
          colorScheme=""
          fontSize="4vw"
          className="nextbutton"
          onClick={nextStep}
        >
          ▶
        </Button>
      </Flex>
    </Box>
  );
};

export default SlideShow;
