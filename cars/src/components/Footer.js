import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  color: white;
  padding: 40px 20px;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 15px;
`;

const FooterText = styled.p`
  color: #999;
  line-height: 1.6;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ffd700;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 20px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ffd700;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #999;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #666;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo>CarRental</Logo>
          <FooterText>
            Experience luxury and comfort with our premium car rental service in Albania.
            We offer a wide range of vehicles to meet your travel needs.
          </FooterText>
          <SocialLinks>
            <SocialIcon href="https://facebook.com" target="_blank"><FaFacebook /></SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank"><FaInstagram /></SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank"><FaTwitter /></SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank"><FaLinkedin /></SocialIcon>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
      <Copyright>
        &copy; {new Date().getFullYear()} CarRental. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 