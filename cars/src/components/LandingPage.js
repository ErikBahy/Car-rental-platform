import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSectionComponent from "./HeroSection";
import CarDisplay from "./CarDisplay";
import DesktopCarDisplay from "./DesktopCarDisplay";
import { motion } from "framer-motion";
import SpecialOffer from './SpecialOffer';
import CustomerReviews from './CustomerReviews';
import WhyChooseUs from './WhyChooseUs';
import { useTranslation } from 'react-i18next';
import API_BASE_URL from '../config/api';

const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  text-align: center;
  position: relative;
  height: calc(100vh - 60px);
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding-top: 40px;
    justify-content: flex-start;
  }
`;

const MainTitle = styled(motion.h1)`
  font-size: 4rem;
  color: #ffd700;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 30px;
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
  gap: 30px;
  position: absolute;
  bottom: 80px;
  right: 40px;
  margin: 0;
  
  @media (max-width: 768px) {
    position: static;
    flex-wrap: wrap;
    gap: 20px;
    margin: 30px 0 50px;
    padding: 0 20px;
  }

  @media (max-width: 375px) {
    margin: 20px 0 70px;
    gap: 15px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  color: #ffd700;
  
  @media (min-width: 768px) {
    .number {
      font-size: 2rem;
    }
    .label {
      font-size: 0.85rem;
    }
  }
`;

const ScrollPrompt = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffd700;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  opacity: ${props => props.opacity};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ArrowAnimation = styled(motion.span)`
  font-size: 2rem;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: black;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${props => props.opacity};
    filter: blur(${props => props.blur}px);
    transform: scale(1.1);
    transition: opacity 0.3s ease;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, ${props => 0.5 + (1 - props.opacity) * 0.5});
    transition: background-color 0.3s ease;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const PromptText = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1;
`;

const SectionDescription = styled.div`
  text-align: center;
  margin: 40px auto 20px;
  max-width: 800px;
  padding: 0 20px;

  h2 {
    color: #ffd700;
    font-size: 2rem;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }

  p {
    color: white;
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }
`;

const HomePage = () => {
  const { t } = useTranslation();
  const [cars, setCars] = useState([]);
  const [opacity, setOpacity] = useState(0.5);
  const [arrowOpacity, setArrowOpacity] = useState(1);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const navigate = useNavigate();
  const [blur, setBlur] = useState(0);
  const [showArrow, setShowArrow] = useState(true);

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
        const response = await axios.get(`${API_BASE_URL}/cars`);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars data:", error);
      }
    };

    fetchCars();
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const fadeStart = window.innerHeight * 0.3;
    const fadeEnd = window.innerHeight * 0.8;

    setShowArrow(scrollY < 100);

    const opacity = Math.max(0, Math.min(0.5, 
      0.5 - (scrollY - fadeStart) / (fadeEnd - fadeStart) * 0.5
    ));
    
    const blur = Math.min(20, (scrollY / window.innerHeight) * 15);

    setOpacity(opacity);
    setBlur(blur);
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
      <Background opacity={opacity} blur={blur}>
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
          {t('header.title')}
        </MainTitle>
        <Subtitle
          as={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('header.subtitle')}
        </Subtitle>
        <HeroSectionComponent />
        <StatsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <StatItem>
            <div className="number">15+</div>
            <div className="label">{t('stats.vehicles')}</div>
          </StatItem>
          <StatItem>
            <div className="number">500+</div>
            <div className="label">{t('stats.clients')}</div>
          </StatItem>
          <StatItem>
            <div className="number">24/7</div>
            <div className="label">{t('stats.support')}</div>
          </StatItem>
        </StatsContainer>
        <ScrollPrompt
          opacity={showArrow ? 1 : 0}
          style={{ 
            visibility: showArrow ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease'
          }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ArrowAnimation
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ↓
          </ArrowAnimation>
        </ScrollPrompt>
      </HeroContent>
      <ContentWrapper>
        {/* <PromptText>
          {t('specialOffer.title')}
        </PromptText> */}
        <DesktopCarDisplay cars={favouriteCars} onClick={handleCarClick} />
        <SpecialOffer />
        <WhyChooseUs />
        <CustomerReviews />
      </ContentWrapper>
    </PageContainer>
  );
};

export default HomePage;

