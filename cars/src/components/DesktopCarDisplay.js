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
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

const CarContainer = styled(motion.div)`
  position: relative;
  width: 300px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 90%;
    max-width: 300px;
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: center 30%;
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
            src={car.favouriteImage?.url || car.photos[0]?.url || 'default-car-image.jpg'} 
            alt={`${car.make} ${car.model}`}
            loading="lazy"
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
