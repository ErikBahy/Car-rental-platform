import React, { memo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CarDisplayWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  padding: 40px 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const CarCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  width: 280px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const CarInfo = styled.div`
  color: white;
  text-align: left;

  h3 {
    color: #ffd700;
    margin: 0 0 10px 0;
    font-size: 1.2rem;
  }

  p {
    margin: 5px 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const PriceTag = styled.div`
  color: #ffd700;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 15px;
  text-align: right;
`;

const DesktopCarDisplay = ({ cars, onClick }) => {
  return (
    <CarDisplayWrapper>
      {cars.map((car) => (
        <CarCard
          key={car._id}
          onClick={() => onClick(car._id)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <CarImage src={car.favouriteImag || 'https://i.imgur.com/CiYQhnU.png'} alt={car.model} />
          <CarInfo>
            <h3>{car.model}</h3>
            <p>{car.make} • {car.registrationYear}</p>
            <p>{car.transmission} • {car.fuelType}</p>
            <p>{car.seating} Seats • {car.motorPower}</p>
            <PriceTag>${car.price}/day</PriceTag>
          </CarInfo>
        </CarCard>
      ))}
    </CarDisplayWrapper>
  );
};

export default memo(DesktopCarDisplay);
