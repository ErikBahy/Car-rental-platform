import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import CarCard from "./CarCard";
import { motion } from "framer-motion";
import Footer from './Footer';
import showroomImage from '../assets/showroom.jpg';
import { useTranslation } from 'react-i18next';

const PageContainer = styled(motion.div)`
  position: relative;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/showroom2.jpg');
  background-color: #000;
  background-size: cover;
  background-position: 30% center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: -1;

  @media (max-width: 768px) {
    background-position: 20% center;
    background-attachment: scroll;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 60px;
  position: relative;
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
  max-width: 1400px;
  margin: 0 auto;
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
  const { t } = useTranslation();
  const [cars, setCars] = useState([]);
  console.log(cars);
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
        setError(t('carsPage.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [t]);

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Background />
      <ContentWrapper>
        <Header>
          <Title>{t('carsPage.title')}</Title>
        </Header>

        {loading && <LoadingState>{t('carsPage.loading')}</LoadingState>}
        {error && <ErrorState>{error}</ErrorState>}
        {!loading && !error && cars.length === 0 && (
          <LoadingState>{t('carsPage.noCars')}</LoadingState>
        )}
        {!loading && !error && cars.length > 0 && (
          <CarsGrid
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </CarsGrid>
        )}
      </ContentWrapper>
      {/* <Footer /> */}
    </PageContainer>
  );
};

export default CarsPage;
