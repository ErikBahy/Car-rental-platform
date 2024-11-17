import React, { useState } from "react";
import styled from "styled-components";
import {
  FaCogs,
  FaUsers,
  FaBolt,
  FaGasPump,
  FaCalendarAlt,
} from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import car from "../assets/bmw.png";
import m4 from "../assets/bmwM4.png";

const CarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  overflow: visible; /* Ensure content doesn't overflow */
  padding-bottom: 10px; /* Reduce bottom padding */
`;

const StyledCarousel = styled(Carousel)`
  width: 100%;

  .carousel .slide img {
    height: 250px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    border-radius: 10px;
  }

  .carousel .control-arrow {
    background: none;
    color: #ffd700;
  }

  .carousel .control-dots .dot {
    background: #ccc;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    opacity: 1;
  }

  .carousel .control-dots .dot.selected {
    background: #ffd700;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: #ffd700;
  font-size: 3rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 2;

  &:focus {
    outline: none;
  }

  &.left {
    left: 10px;
    @media (max-width: 768px) {
      left: -20px;
    }
  }

  &.right {
    right: 10px;
    @media (max-width: 768px) {
      right: -20px;
    }
  }

  svg {
    width: 1.5em;
    height: 1.5em;
  }
`;

const ThinArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="1">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ThinArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="1">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ffd700;
  margin: 10px 0; /* Reduce margin */
`;

const OptionDescriptionContainer = styled.div`
  width: 100%;
  overflow: hidden; /* Ensure the sliding content doesn't overflow */
`;

const OptionDescription = styled.div`
  padding: 10px 20px; /* Reduce top and bottom padding */
  text-align: center;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  animation: ${({ direction }) =>
    direction === "left" ? "slideInFromLeft" : "slideInFromRight"}
    0.5s ease-out;
  color: #ffd700;

  span {
    color: white;
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const CarDetailsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const options = [
    { label: "Transmission", value: "Automatic", icon: <FaCogs />, image: m4 },
    { label: "Seating", value: "5 seats", icon: <FaUsers />, image: car },
    { label: "Motor Power", value: "200 HP", icon: <FaBolt />, image: m4 },
    { label: "Fuel Type", value: "Petrol", icon: <FaGasPump />, image: car },
    { label: "Car Year", value: "2020", icon: <FaCalendarAlt />, image: m4 },
  ];

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + options.length) % options.length
    );
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length);
  };

  return (
    <CarContainer>
      <StyledCarousel
        showThumbs={false}
        showStatus={false}
        selectedItem={currentIndex}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <ArrowButton
              className="left"
              onClick={() => {
                onClickHandler();
                handlePrev();
              }}
            >
              <ThinArrowLeft />
            </ArrowButton>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <ArrowButton
              className="right"
              onClick={() => {
                onClickHandler();
                handleNext();
              }}
            >
              <ThinArrowRight />
            </ArrowButton>
          )
        }
      >
        {options.map((option, index) => (
          <div key={index}>
            <img src={option.image} alt={`${option.label} - ${option.value}`} />
          </div>
        ))}
      </StyledCarousel>
      <Divider />
      <OptionDescriptionContainer>
        <OptionDescription key={currentIndex} direction={direction}>
          {options[currentIndex].icon}
          <strong>{options[currentIndex].label}:</strong>{" "}
          <span>{options[currentIndex].value}</span>
        </OptionDescription>
      </OptionDescriptionContainer>
    </CarContainer>
  );
};

export default CarDetailsCarousel;
