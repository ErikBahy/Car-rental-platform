import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import CarCard from "./CarCard";
import { motion } from "framer-motion";
import carBackground from "../assets/rruga.jpeg";

const PageContainer = styled(motion.div)`
  position: relative;
  min-height: 100vh;
  padding: 20px;
  overflow-y: auto;
  z-index: 1;
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
  background-attachment: fixed;
  z-index: -1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 30px;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffd700;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CarsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  padding: 20px;
  justify-items: center;
`;

const LoadingState = styled(motion.div)`
  text-align: center;
  color: #ffd700;
  padding: 50px;
  font-size: 1.2rem;
`;

const ErrorState = styled(motion.div)`
  text-align: center;
  color: #ff4444;
  padding: 50px;
  font-size: 1.2rem;
`;

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/cars");
        setCars(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Background />
      <ContentWrapper>
        <Header>
          <Title>Our Fleet</Title>
        </Header>

        {loading && <LoadingState>Loading our fleet...</LoadingState>}
        {error && <ErrorState>{error}</ErrorState>}
        {!loading && !error && (
          <CarsGrid
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </CarsGrid>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default CarsPage;
