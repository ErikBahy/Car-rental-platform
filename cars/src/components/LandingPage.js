import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSectionComponent from "./HeroSection";
import CarDisplay from "./CarDisplay";
import DesktopCarDisplay from "./DesktopCarDisplay";
import carBackground from "../assets/rruga.jpeg";

const PageContainer = styled.div`
  position: relative;
  overflow-y: auto; /* Allow vertical scrolling */
  display: flex;
  flex-direction: column;
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
  opacity: ${(props) => props.opacity};
  transition: opacity 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
  justify-content: center;
  padding-bottom: 10px;
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
      <Background opacity={opacity} />
      <HeroSectionComponent />
      <ContentWrapper>
        <PromptText>
          Our client's most preferred cars. Click on a car to view details
        </PromptText>
        {isDesktop ? (
          <DesktopCarDisplay cars={favouriteCars} onClick={handleCarClick} />
        ) : (
          <CarDisplay cars={favouriteCars} onClick={handleCarClick} />
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default HomePage;
