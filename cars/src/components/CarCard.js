import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  position: relative;
  width: 100%;
  max-width: 280px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CarImageContainer = styled.div`
  position: relative;
  height: 180px;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  padding: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.02);
  }
`;

const CarDetails = styled.div`
  padding: 15px;
  color: white;
`;

const CarName = styled.h3`
  font-size: 1.2rem;
  color: #ffd700;
  margin: 0 0 10px 0;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 10px 0;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  
  svg {
    color: #ffd700;
    margin-right: 5px;
  }
`;

const BookNowButton = styled.button`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background-color: #ffd700;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ffed4a;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  }

  svg {
    font-size: 0.9rem;
  }
`;

const Price = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  font-size: 1.3rem;
  color: #ffd700;
  font-weight: bold;
`;

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/car/${car.id}`);
  };

  return (
    <Card>
      <CarImageContainer>
        <img src={'https://i.imgur.com/CiYQhnU.png'} alt={car.model} />
      </CarImageContainer>
      <CarDetails>
        <CarName>{car.model}</CarName>
        <OptionsGrid>
          <Option>
            <FaCogs />
            {car.transmission}
          </Option>
          <Option>
            <FaUsers />
            {car.seating} seats
          </Option>
          <Option>
            <FaBolt />
            {car.motorPower}
          </Option>
          <Option>
            <FaGasPump />
            {car.fuelType}
          </Option>
          <Option>
            <FaCalendarAlt />
            {car.registrationYear}
          </Option>
        </OptionsGrid>
        <Price>${car.price} / day</Price>
        <BookNowButton onClick={handleBookNow}>
          Book Now <FaArrowRight />
        </BookNowButton>
      </CarDetails>
    </Card>
  );
};

export default CarCard;
