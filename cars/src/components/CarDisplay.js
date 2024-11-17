import React, { useState } from "react";
import { CarDisplayWrapper, ArrowButton } from "../styles";
import CarComponent from "./CarComponent";
import { AnimatePresence } from "framer-motion";

const CarDisplay = ({ cars, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('');

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? cars.length - 1 : currentIndex - 1);
    setDirection('left');
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === cars.length - 1 ? 0 : currentIndex + 1);
    setDirection('right');
  };

  // If cars is empty, render a fallback UI
  if (!cars || cars.length === 0) {
    return <p>No cars available</p>;
  }

  return (
    <CarDisplayWrapper>
      <ArrowButton left onClick={handlePrev}>
        ‹
      </ArrowButton>
      <AnimatePresence mode="wait">
        <CarComponent
          direction={direction}
          key={cars[currentIndex]._id}
          car={cars[currentIndex]}
          onClick={onClick}
        />
      </AnimatePresence>
      <ArrowButton right onClick={handleNext}>
        ›
      </ArrowButton>
    </CarDisplayWrapper>
  );
};

export default CarDisplay;
