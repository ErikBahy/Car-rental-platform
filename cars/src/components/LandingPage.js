import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSectionComponent from "./HeroSection";
import CarDisplay from "./CarDisplay";
import DesktopCarDisplay from "./DesktopCarDisplay";
import { motion } from "framer-motion";

const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HeroContent = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 20px;
  text-align: center;
  position: relative;
`;

const MainTitle = styled(motion.h1)`
  font-size: 4rem;
  color: #ffd700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 40px;
  max-width: 600px;
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  color: #ffd700;
  
  .number {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .label {
    font-size: 1rem;
    color: white;
  }
`;

const ScrollPrompt = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffd700;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  
  span {
    margin-bottom: 5px;
  }

  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.1);
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.4;
  }

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
      background-color: rgba(0, 0, 0, 0.83);
    }
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PromptText = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 1.2em;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
  border-radius: 5px;
`;

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [opacity, setOpacity] = useState(1);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const newOpacity = Math.max(1 - scrollY / windowHeight, 0);
    setOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCarClick = (id) => {
    navigate(`/car/${id}`);
  };

  const favouriteCars = cars.filter(car => car.isFavourite);

  return (
    <PageContainer>
      <Background opacity={opacity}>
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/carsthumb1.mp4"
        >
          Your browser does not support the video tag.
        </video>
      </Background>
      <HeroContent>
        <MainTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Premium Car Rental Experience
        </MainTitle>
        <Subtitle
          as={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Discover our exclusive collection of luxury vehicles for your perfect journey.
          From sports cars to elegant sedans, we have the perfect match for you.
        </Subtitle>
        <HeroSectionComponent />
        <StatsContainer
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <StatItem>
            <div className="number">50+</div>
            <div className="label">Luxury Cars</div>
          </StatItem>
          <StatItem>
            <div className="number">1000+</div>
            <div className="label">Happy Clients</div>
          </StatItem>
          <StatItem>
            <div className="number">24/7</div>
            <div className="label">Support</div>
          </StatItem>
        </StatsContainer>
        <ScrollPrompt onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <span>Discover Our Fleet</span>
          <span style={{ fontSize: '2rem' }}>↓</span>
        </ScrollPrompt>
      </HeroContent>
      <ContentWrapper>
        {/* <PromptText>
          Our client's most preferred cars. Click on a car to view details
        </PromptText> */}
        {/* {isDesktop ? (
          <DesktopCarDisplay cars={favouriteCars} onClick={handleCarClick} />
        ) : (
          <CarDisplay cars={favouriteCars} onClick={handleCarClick} />
        )} */}
      </ContentWrapper>
    </PageContainer>
  );
};

export default HomePage;

