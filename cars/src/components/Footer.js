import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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
  grid-template-columns: 2fr 1fr 1fr;
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

const ContactAndSocial = styled(FooterSection)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo>{t('footer.company')}</Logo>
          <FooterText>
            {t('footer.description')}
          </FooterText>
        </FooterSection>

        <FooterSection>
          <h3>{t('footer.quickLinks.title')}</h3>
          <FooterLinks>
            <FooterLink to="/">{t('footer.quickLinks.home')}</FooterLink>
            <FooterLink to="/our-cars">{t('footer.quickLinks.cars')}</FooterLink>
          </FooterLinks>
        </FooterSection>

        <ContactAndSocial>
          <div>
            <h3>{t('footer.contact.title')}</h3>
            <ContactInfo>
              <ContactItem>
                <FaMapMarkerAlt />
                {t('footer.contact.address')}
              </ContactItem>
              <ContactItem>
                <FaPhone />
                {t('footer.contact.phone')}
              </ContactItem>
              <ContactItem>
                <FaEnvelope />
                {t('footer.contact.email')}
              </ContactItem>
            </ContactInfo>
          </div>
          <div>
            <h3>{t('footer.social.followUs')}</h3>
            <SocialLinks>
              <SocialIcon href="https://facebook.com" target="_blank" aria-label="Facebook">
                <FaFacebook />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialIcon>
            </SocialLinks>
          </div>
        </ContactAndSocial>
      </FooterContent>
      <Copyright>
        &copy; {new Date().getFullYear()} {t('footer.company')}. {t('footer.copyright')}
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 