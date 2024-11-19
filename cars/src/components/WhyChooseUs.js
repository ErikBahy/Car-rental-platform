import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCar, FaMoneyBillWave, FaClock, FaMapMarkedAlt, FaHeadset } from 'react-icons/fa';

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
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Full Insurance Coverage",
      description: "Drive with peace of mind knowing you're fully covered with our comprehensive insurance package."
    },
    {
      icon: <FaCar />,
      title: "Premium Fleet",
      description: "Choose from our carefully maintained collection of luxury and reliable vehicles."
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Best Price Guarantee",
      description: "We offer competitive rates and transparent pricing with no hidden fees."
    },
    {
      icon: <FaClock />,
      title: "Flexible Rental Terms",
      description: "From short trips to extended stays, we accommodate your schedule with flexible rental periods."
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Convenient Locations",
      description: "Pick up and drop off your vehicle at locations across Albania's major cities and airports."
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Our dedicated customer service team is always ready to assist you whenever you need help."
    }
  ];

  return (
    <Section>
      <Container>
        <Title>Why Choose Us</Title>
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