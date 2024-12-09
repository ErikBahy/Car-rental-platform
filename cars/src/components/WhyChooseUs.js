import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCar, FaMoneyBillWave, FaClock, FaMapMarkedAlt, FaHeadset } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Section = styled.div`
  padding: 80px 20px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #ffd700;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  color: #ffd700;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  color: #ffd700;
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const CardText = styled.p`
  color: white;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaShieldAlt />,
      title: t('whyChooseUs.features.insurance.title'),
      description: t('whyChooseUs.features.insurance.description')
    },
    {
      icon: <FaCar />,
      title: t('whyChooseUs.features.fleet.title'),
      description: t('whyChooseUs.features.fleet.description')
    },
    {
      icon: <FaMoneyBillWave />,
      title: t('whyChooseUs.features.price.title'),
      description: t('whyChooseUs.features.price.description')
    },
    {
      icon: <FaClock />,
      title: t('whyChooseUs.features.rental.title'),
      description: t('whyChooseUs.features.rental.description')
    },
    {
      icon: <FaMapMarkedAlt />,
      title: t('whyChooseUs.features.locations.title'),
      description: t('whyChooseUs.features.locations.description')
    },
    {
      icon: <FaHeadset />,
      title: t('whyChooseUs.features.support.title'),
      description: t('whyChooseUs.features.support.description')
    }
  ];

  return (
    <Section>
      <Container>
        <Title>{t('whyChooseUs.title')}</Title>
        <Grid>
          {features.map((feature, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <IconWrapper>{feature.icon}</IconWrapper>
              <CardTitle>{feature.title}</CardTitle>
              <CardText>{feature.description}</CardText>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default WhyChooseUs; 