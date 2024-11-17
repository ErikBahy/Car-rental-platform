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
  gap: 10px;
  margin-top: 20px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1;
  }

  button {
    padding: 10px 20px;
    background-color: #ffd700;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #333333;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    input {
      margin-bottom: 10px;
    }

    button {
      width: 100%;
    }
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
