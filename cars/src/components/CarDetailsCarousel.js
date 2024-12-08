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
  background: rgba(0, 0, 0, 0.5);
  box-shadow: none;
  backdrop-filter: none;
  overflow: hidden;
`;

const StyledCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;

  .carousel .slide {
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .carousel .slide img {
    max-height: 70vh;
    width: 100%;
    object-fit: cover;
    background: none;
  }

  @media (max-width: 768px) {
    .carousel .slide img {
      max-height: 50vh;
    }
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

const CarDetailsCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  return (
    <CarContainer>
      <StyledCarousel
        showThumbs={false}
        showStatus={false}
        selectedItem={currentIndex}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <ArrowButton className="left" onClick={onClickHandler}>
              <ThinArrowLeft />
            </ArrowButton>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <ArrowButton className="right" onClick={onClickHandler}>
              <ThinArrowRight />
            </ArrowButton>
          )
        }
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.url} alt={`Car view ${index + 1}`} />
          </div>
        ))}
      </StyledCarousel>
    </CarContainer>
  );
};

export default CarDetailsCarousel;
