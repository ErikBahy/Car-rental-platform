import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const DisplayWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  overflow: hidden;
`;

const CarCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 350px;
  margin: 0 auto;
`;

const CarImage = styled.img`
  width: 100%;
  height: 200px;
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

const NavigationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#ffd700' : 'rgba(255, 215, 0, 0.3)'};
  cursor: pointer;
`;

const CarDisplay = ({ cars, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = cars.length - 1;
      if (nextIndex >= cars.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <DisplayWrapper>
      <AnimatePresence initial={false} custom={currentIndex}>
        <CarCard
          key={currentIndex}
          custom={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          onClick={() => onClick(cars[currentIndex]._id)}
        >
          <CarImage 
            src={cars[currentIndex]?.favouriteImag || 'https://i.imgur.com/CiYQhnU.png'} 
            alt={cars[currentIndex]?.model} 
          />
          <CarInfo>
            <h3>{cars[currentIndex]?.model}</h3>
            <p>{cars[currentIndex]?.make} • {cars[currentIndex]?.registrationYear}</p>
            <p>{cars[currentIndex]?.transmission} • {cars[currentIndex]?.fuelType}</p>
            <p>{cars[currentIndex]?.seating} Seats • {cars[currentIndex]?.motorPower}</p>
            <PriceTag>${cars[currentIndex]?.price}/day</PriceTag>
          </CarInfo>
        </CarCard>
      </AnimatePresence>
      <NavigationDots>
        {cars.map((_, index) => (
          <Dot 
            key={index} 
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </NavigationDots>
    </DisplayWrapper>
  );
};

export default CarDisplay;
