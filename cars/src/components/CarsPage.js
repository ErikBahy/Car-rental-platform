import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import CarCard from "./CarCard";
import { motion } from "framer-motion";
import Footer from './Footer';
import showroomImage from '../assets/showroom.jpg';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import DateRangeFilter from './DateRangeFilter';
import { toast } from 'react-toastify';
import API_BASE_URL from '../config/api';

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
  max-width: 1800px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  position: relative;
`;

const CarsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  justify-items: center;
`;

const FilterCard = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease;
  min-width: 280px;
  max-width: 350px;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState({ pickup: '', dropoff: '' });
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pickup = params.get('pickup');
    const dropoff = params.get('dropoff');
    
    if (pickup && dropoff) {
      const pickupDate = new Date(pickup);
      const dropoffDate = new Date(dropoff);
      const daysDifference = Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24));
      
      if (daysDifference >= 2) {
        setDateFilter({ pickup, dropoff });
      } else {
        toast.error(t('carsPage.minimumDaysError'), {
          position: "top-center",
          theme: "dark"
        });
      }
    }
  }, [location, t]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        let url = `${API_BASE_URL}/cars`;
        
        if (dateFilter.pickup && dateFilter.dropoff) {
          url = `${API_BASE_URL}/reservations/available-cars?startDate=${dateFilter.pickup}&endDate=${dateFilter.dropoff}`;
        }
        
        const response = await axios.get(url);
        setCars(response.data);
        setError(null);
      } catch (err) {
        setError(t('carsPage.error'));
        toast.error(t('carsPage.error'), {
          position: "top-center",
          theme: "dark"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [dateFilter, t]);

  const handleFilterChange = (newDates) => {
    if (!newDates.pickup || !newDates.dropoff) {
      setDateFilter({ pickup: '', dropoff: '' });
      return;
    }

    const pickupDate = new Date(newDates.pickup);
    const dropoffDate = new Date(newDates.dropoff);
    const daysDifference = Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24));

    if (daysDifference >= 2) {
      setDateFilter(newDates);
    } else {
      toast.error(t('carsPage.minimumDaysError'), {
        position: "top-center",
        theme: "dark"
      });
    }
  };

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Background />
      <Header>
        <Title>{t('carsPage.title')}</Title>
      </Header>
      
      <ContentWrapper>
        <CarsGrid
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FilterCard>
            <DateRangeFilter 
              initialDates={dateFilter}
              onFilterChange={handleFilterChange}
            />
          </FilterCard>
          
          {!loading && !error && cars.length > 0 && 
            cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))
          }
        </CarsGrid>
        
        {loading && <LoadingState>{t('carsPage.loading')}</LoadingState>}
        {error && <ErrorState>{error}</ErrorState>}
        {!loading && !error && cars.length === 0 && (
          <LoadingState>{t('carsPage.noCars')}</LoadingState>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default CarsPage;
