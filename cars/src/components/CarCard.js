import React, { useState } from "react";
import styled from "styled-components";
import {
  FaCogs,
  FaUsers,
  FaBolt,
  FaGasPump,
  FaCalendarAlt,
  FaArrowLeft,
  FaArrowRight,
  FaShoppingCart,
} from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 16px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 320px;
  height: 500px;

  @media (hover: hover) {
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const CarImageCarousel = styled(Carousel)`
  .carousel .slide img {
    border-radius: 10px;
    height: 200px;
    width: 100%;
    object-fit: contain;
  }

  .carousel .control-arrow {
    display: none;
  }
`;

const CarDetails = styled.div`
  padding: 16px 0;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const CarName = styled.h3`
  flex: 1;
  text-align: center;
  font-size: 1em;
  color: white;
  margin: 0;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Arrow = styled.div`
  color: #ffd700;
  cursor: pointer;
  z-index: 2;
  font-size: 1.2em;
  padding: 0 10px;
`;

const CarPrice = styled.p`
  font-size: 1.2em;
  color: #ffd700;
  font-weight: bold;
  margin: 16px 0 0;
  text-align: center;
`;

const OptionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  padding: 8px 0;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  color: #fff;
`;

const OptionIcon = styled.div`
  margin-right: 4px;
`;

const BookNowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #ffd700;
    color: white;
  }

  svg {
    margin-right: 8px;
  }
`;

const CarCard = ({ car }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? car.photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === car.photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card>
      <CarImageCarousel
        selectedItem={currentSlide}
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        showArrows={false}
      >
        {car.photos.map((photo, index) => (
          <div key={index}>
            <img src={'https://i.imgur.com/CiYQhnU.png'} alt={`${car.model} ${index + 1}`} />
          </div>
        ))}
      </CarImageCarousel>
      <CarDetails>
        <NavigationContainer>
          <Arrow onClick={handlePrev}>
            <FaArrowLeft />
          </Arrow>
          <CarName>{car.model}</CarName>
          <Arrow onClick={handleNext}>
            <FaArrowRight />
          </Arrow>
        </NavigationContainer>
        <OptionsRow>
          <Option>
            <OptionIcon>
              <FaCogs />
            </OptionIcon>
            {car.transmission}
          </Option>
          <Option>
            <OptionIcon>
              <FaUsers />
            </OptionIcon>
            {car.seating} seats
          </Option>
          <Option>
            <OptionIcon>
              <FaBolt />
            </OptionIcon>
            {car.motorPower}
          </Option>
          <Option>
            <OptionIcon>
              <FaGasPump />
            </OptionIcon>
            {car.fuelType}
          </Option>
          <Option>
            <OptionIcon>
              <FaCalendarAlt />
            </OptionIcon>
            {car.registrationYear}
          </Option>
        </OptionsRow>
        <CarPrice>${car.price} / day</CarPrice>
        <BookNowButton>
          <FaShoppingCart />
          Book Now
        </BookNowButton>
      </CarDetails>
    </Card>
  );
};

export default CarCard;
