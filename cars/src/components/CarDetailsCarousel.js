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
import showroom from '../assets/showroom.jpg'

const CarContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 0;
  background: none;
  box-shadow: none;
  backdrop-filter: none;
  overflow: hidden;
`;

const StyledCarousel = styled(Carousel)`
  width: 100%;

  .carousel .slide {
    background: none;
  }

  .carousel .slide img {
    height: 400px;
    width: 100%;
    object-fit: cover;
    border-radius: 0;
  }

  .carousel .control-dots {
    bottom: 20px;
    margin: 0;
  }

  .carousel .control-dots .dot {
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    width: 8px;
    height: 8px;
    margin: 0 4px;
  }

  .carousel .control-dots .dot.selected {
    background: #ffd700;
  }
`;

const ArrowButton = styled.button`
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 50%;
  color: #fff;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 2;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    outline: none;
  }

  &.left {
    left: 20px;
  }

  &.right {
    right: 20px;
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

const CarDetailsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const options = [
    { label: "Transmission", value: "Automatic", icon: <FaCogs />, image: showroom },
    { label: "Seating", value: "5 seats", icon: <FaUsers />, image: "/showroom.jpg" },
    { label: "Motor Power", value: "200 HP", icon: <FaBolt />, image: showroom },
    { label: "Fuel Type", value: "Petrol", icon: <FaGasPump />, image: "/showroom1.jpg" },
    { label: "Car Year", value: "2020", icon: <FaCalendarAlt />, image: "/showroom2.jpg" },
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
    </CarContainer>
  );
};

export default CarDetailsCarousel;
