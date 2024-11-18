import React, { memo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaCogs,
  FaUsers,
  FaBolt,
  FaGasPump,
} from "react-icons/fa";

const CarDisplayWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  padding: 40px 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(45deg, transparent 48%, rgba(255, 215, 0, 0.1) 50%, transparent 52%) 0 0 / 30px 30px,
      linear-gradient(-45deg, transparent 48%, rgba(255, 215, 0, 0.1) 50%, transparent 52%) 0 0 / 30px 30px;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.05) 2px, transparent 3px) 0 0 / 40px 40px;
    animation: floatDots 30s linear infinite;
    z-index: -1;
  }

  @keyframes floatDots {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

const AnimatedLine = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
  pointer-events: none;
  z-index: -1;
`;

const CarContainer = styled(motion.div)`
  position: relative;
  width: 300px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    width: 90%;
    max-width: 300px;
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

const BasicInfo = styled.div`
  text-align: center;
  margin-top: 10px;
  
  h3 {
    color: #ffd700;
    margin: 0;
    font-size: 1.2rem;
  }
  
  p {
    color: white;
    margin: 5px 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const HoverInfo = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  gap: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 10px;

  ${CarContainer}:hover & {
    opacity: 1;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 0.9rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);

  svg {
    color: #ffd700;
    font-size: 1.2rem;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5));
  }
`;

const PriceTag = styled.div`
  color: #ffd700;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 10px;
`;

const DesktopCarDisplay = ({ cars, onClick }) => {
  return (
    <CarDisplayWrapper>
      {[...Array(5)].map((_, i) => (
        <AnimatedLine
          key={i}
          initial={{ 
            x: -100, 
            y: i * 200,
            rotate: Math.random() * 45 - 22.5 
          }}
          animate={{ 
            x: ["-100%", "200%"],
            y: [i * 200, i * 200 + Math.random() * 100 - 50]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2
          }}
        />
      ))}
      
      {cars.map((car) => (
        <CarContainer
          key={car._id}
          onClick={() => onClick(car._id)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
        >
          <CarImage 
            src={car.favouriteImag || 'https://i.imgur.com/CiYQhnU.png'} 
            alt={car.model} 
          />
          <BasicInfo>
            <h3>{car.model}</h3>
            <p>{car.make} • {car.registrationYear}</p>
          </BasicInfo>
          
          <HoverInfo>
            <InfoItem>
              <FaCogs />
              <span>{car.transmission}</span>
            </InfoItem>
            <InfoItem>
              <FaUsers />
              <span>{car.seating} Seats</span>
            </InfoItem>
            <InfoItem>
              <FaBolt />
              <span>{car.motorPower}</span>
            </InfoItem>
            <InfoItem>
              <FaGasPump />
              <span>{car.fuelType}</span>
            </InfoItem>
            <PriceTag>${car.price}/day</PriceTag>
          </HoverInfo>
        </CarContainer>
      ))}
    </CarDisplayWrapper>
  );
};

export default memo(DesktopCarDisplay);
