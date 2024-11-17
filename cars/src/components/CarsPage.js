import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import CarCard from "./CarCard";
import carBackground from "../assets/rruga.jpeg"; // Update the path as needed

// Styled Components
const PageContainer = styled.div`
  position: relative;
  min-height: 100vh; /* Ensure it takes full viewport height */
  padding: 16px;
  overflow-y: auto; /* Ensure vertical scrolling */
  z-index: 1; /* Ensure it's above the background */
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${carBackground});
  background-size: cover;
  background-position: center;
  z-index: -1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 0.3s ease;
  }

  @media (min-width: 768px) {
    &::before {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

const Heading = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 16px;
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  justify-items: center;
`;

const CarsPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars data:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <PageContainer>
      <Background />
      <Heading>Available Cars</Heading>
      <CarsGrid>
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </CarsGrid>
    </PageContainer>
  );
};

export default CarsPage;
