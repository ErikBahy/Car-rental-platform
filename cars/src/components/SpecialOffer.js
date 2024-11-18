import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const OfferSection = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 60px 20px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.5)
    ), url('/luxurycar.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    z-index: -1;
  }
`;

const ContentContainer = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  color: white;
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #ffd700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HighlightBox = styled.div`
  display: inline-block;
  padding: 15px 30px;
  background: rgba(255, 215, 0, 0.9);
  color: black;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 10px;
  margin: 20px 0;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 12px 24px;
  }
`;

const LearnMoreButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #ffd700;
  color: #ffd700;
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: #ffd700;
    color: black;
  }
`;

const SpecialOffer = () => {
  return (
    <OfferSection>
      <ContentContainer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Title>Extended Stay Special Offer</Title>
        <Description>
          Experience luxury for longer and save more. Book any of our premium vehicles
          for 10 days or more and unlock exclusive benefits and substantial savings
          on your rental.
        </Description>
        <HighlightBox>
          Save up to 25% on 10+ day rentals
        </HighlightBox>
        <Description>
          Includes complimentary premium insurance package, unlimited mileage,
          and priority customer support.
        </Description>
        <LearnMoreButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </LearnMoreButton>
      </ContentContainer>
    </OfferSection>
  );
};

export default SpecialOffer; 