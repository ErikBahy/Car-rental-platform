import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroSection = styled.div`
  background: url("assets/rruga.jpeg") no-repeat center center;
  background-size: cover;
  position: relative;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffd700;

  @media (max-width: 768px) {
    height: auto;
    padding: 20px;
  }
`;

export const OverlayText = styled.h1`
  font-size: 48px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  padding: 0 20px;

  & > div {
    flex: 1;
    min-width: 200px;
    position: relative;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    gap: 10px;
    padding: 0 15px;

    & > div {
      min-width: unset;
    }
  }
`;

export const DateInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  font-size: 16px;
  border: 2px solid #ffd700;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333333;
  transition: all 0.3s ease;
  cursor: pointer;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    padding: 5px;
    filter: invert(0.8) sepia(100%) saturate(1000%) hue-rotate(0deg);
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  &:hover, &:focus {
    background-color: white;
    border-color: #ffed4a;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }

  &::placeholder {
    color: #666;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
    font-size: 14px;
    padding: 12px 15px;
    
    &::-webkit-calendar-picker-indicator {
      scale: 0.8;
      right: 8px;
    }
    
    &::-webkit-datetime-edit {
      font-size: 14px;
    }
    
    &::-webkit-calendar-picker {
      width: 80vw;
      max-height: 300px;
    }
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 13px;
  }
`;

export const SearchButton = styled.button`
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${props => props.isSecondary ? 'rgba(255, 215, 0, 0.8)' : '#ffd700'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #333333;
  transition: all 0.3s ease;
  min-width: 180px;

  &:hover {
    background-color: ${props => props.isSecondary ? '#ffd700' : '#ffed4a'};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
    font-size: 13px;
  }
`;

export const CarDisplayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
  color: white;
  text-align: center;
  width: 100%;
  height: auto; /* Change this to fit the content */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  color: yellow;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  &:focus {
    outline: none;
  }

  &:nth-of-type(1) {
    left: 5%;
    @media (max-width: 768px) {
      left: 20px;
    }
  }

  &:nth-of-type(2) {
    right: 5%;
    @media (max-width: 768px) {
      right: 20px;
    }
  }
`;

export const CarComponentWrapper = styled(motion.div)`
  text-align: center;
  img {
    width: 100%;
    height: auto;
    object-fit: contain;

    @media (max-width: 768px) {
      max-width: 250px; // Mobile size
    }

    @media (min-width: 769px) {
      max-width: 400px; // Desktop size
    }
  }
`;

export const CarInfo = styled.div`
  color: #ffd700;
  margin-top: 10px; // Adjusted for spacing

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const DownArrow = styled.div`
  text-align: center;
  font-size: 2em;
  color: #ffd700;
  margin-top: 5px; // Adjusted for spacing
  animation: bounce 2s infinite;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.3);
  padding: 5px;
  border-radius: 50%;
`;
