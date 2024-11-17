import React, { useEffect, useRef } from "react";
import { CarComponentWrapper, CarInfo } from "../styles";
import { motion, useAnimation } from "framer-motion";

const CarComponent = ({ car, direction, onClick }) => {
  const controls = useAnimation();
  const isMounted = useRef(true);

  const carVariants = {
    hidden: { opacity: 0, x: direction === 'left' ? -200 : 200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    isMounted.current = true;

    const bounceAnimation = {
      y: ["0%", "-3%", "0%", "-3%", "0%", "-1%", "0%", "-1%", "0%", "-1%"],
      transition: { duration: 2, ease: "easeInOut" },
    };

    let bounceInterval;

    const sequence = async () => {
      if (isMounted.current) {
        await controls.start("visible");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        bounceInterval = setInterval(() => {
          if (isMounted.current) {
            controls.start(bounceAnimation);
          }
        }, 8000);
      }
    };

    sequence();

    return () => {
      isMounted.current = false;
      controls.stop();
      clearInterval(bounceInterval);
    };
  }, [controls, car]);

  return (
    <CarComponentWrapper
      as={motion.div}
      initial="hidden"
      animate={controls}
      variants={carVariants}
      transition={{ duration: 1 }}
      onClick={() => onClick(car._id)}
    >
      <motion.img
        src={'https://i.imgur.com/CiYQhnU.png'}
        alt={car.model}
        style={{
          maxWidth: "400px", // Larger size for desktop
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />
      <CarInfo>
        <h2>{car.model}</h2>
        <p>{car.make}</p>
        {/* <p>Registration Year: {car.registrationYear}</p>
        <p>Price: {car.price}</p>
        <p>Transmission: {car.transmission}</p>
        <p>Fuel Type: {car.fuelType}</p>
        <p>Seating: {car.seating}</p>
        <p>Motor Power: {car.motorPower}</p> */}
      </CarInfo>
    </CarComponentWrapper>
  );
};

export default CarComponent;
