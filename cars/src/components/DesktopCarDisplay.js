import React, { memo } from "react";
import styled from "styled-components";

const DesktopCarDisplay = ({ cars, onClick }) => {
  console.log("🚀 ~ DesktopCarDisplay ~ cars:", cars)
  return (
    <CarDisplayWrapper>
      {cars.slice(0, 5).map((car) => (
        <CarContainer key={car._id} onClick={() => onClick(car._id)}>
          <CarInner>
            <CarFront
              src={'https://i.imgur.com/CiYQhnU.png'} // Assuming the first photo is the main image
              alt={car.model}
            />
            <CarBack>
              <h3>{car.model}</h3>
              <p>{car.make}</p>
              <p>Registration Year: {car.registrationYear}</p>
              <p>Price: {car.price}</p>
              <p>Transmission: {car.transmission}</p>
              <p>Fuel Type: {car.fuelType}</p>
              <p>Seating: {car.seating}</p>
              <p>Motor Power: {car.motorPower}</p>
            </CarBack>
          </CarInner>
        </CarContainer>
      ))}
    </CarDisplayWrapper>
  );
};

export default memo(DesktopCarDisplay);

const CarDisplayWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-top: 2rem;
`;

const CarContainer = styled.div`
  perspective: 1000px;
  width: 15%;
  position: relative;
  cursor: pointer;
`;

const CarInner = styled.div`
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  ${CarContainer}:hover & {
    transform: rotateY(180deg);
  }
`;

const CarFront = styled.img`
  backface-visibility: hidden;
  width: 100%;
  height: auto;
  border-radius: 15px; // Rounding the corners
  opacity: 0.8; // Making it more transparent
`;

const CarBack = styled.div`
  backface-visibility: hidden;
  background-color: rgba(255, 215, 0, 0.8);  /* Yellowish color with transparency */
  color: #000;  /* Black text */
  transform: rotateY(180deg);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  font-weight: bold;
  border-radius: 15px; // Rounding the corners
  opacity: 0.8; // Making it more transparent
`;
