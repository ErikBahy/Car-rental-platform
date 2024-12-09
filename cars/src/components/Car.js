import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CarDetailsCarousel from "./CarDetailsCarousel";
import { FaInfoCircle, FaCheckCircle, FaUsers, FaTachometerAlt, FaBolt, FaGasPump, FaCalendarAlt } from "react-icons/fa";
import showroomBackground from "../assets/showroom.jpg"; // Update the path as needed
import ReserveModal from "./ReserveModal";
import axios from "axios";
import { useTranslation } from "react-i18next";

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: fixed;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background:url('/luxurycar1.jpg') no-repeat center center fixed;
    background-size: cover;
    filter: blur(15px);
    z-index: -1;
    transform: scale(1.1);
  }
`;

const ContentContainer = styled.div`
  width: 65%;
  margin: 40px auto 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  gap: 40px;

  @media (max-width: 768px) {
    width: 90%;
    gap: 30px;
  }
`;

const CarInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BookNowButton = styled.button`
  background: linear-gradient(135deg, #ffd700 0%, #ffed4a 100%);
  color: black;
  padding: 12px 30px;
  min-width: 200px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
    width: calc(100% - 20px);
    border-radius: 8px;
    padding: 20px;
    z-index: 100;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 20px;
  width: 100%;
  color: white;
  margin: 0;

  h3 {
    color: #ffd700;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      margin: 5px 0;

      svg {
        margin-right: 10px;
      }
    }
  }
`;

const Price = styled.div`
  font-size: 2em;
  color: #ffd700;
  font-weight: bold;
  margin-bottom: 10px;
`;

const pricingConditions = [
  "Must be 21 years old or above",
  "Valid driver's license required",
  "Insurance included",
];


const SpecsContainer = styled(Card)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  padding: 20px;
  margin: 0;
  border-radius: 10px 10px 0 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  svg {
    color: #ffd700;
    font-size: 1.5em;
    margin-bottom: 8px;
  }
  
  span {
    color: white;
    font-size: 0.9em;
    text-align: center;
  }
`;

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`;

const LoadingSpinner = styled.div`
  // Add your loading spinner styles
`;

const CarHeader = styled.div`
  width: 100%;
  padding: 20px 0;
  position: relative;
  z-index: 10;
`;

const HeaderContent = styled.div`
  width: 65%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const CarInfo = styled.div`
  h2 {
    color: white;
    margin: 0;
    font-size: 2em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    
    span {
      color: #ffd700;
    }
  }
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 15px;
  
  .spec-item {
    display: flex;
    align-items: center;
    gap: 8px;
    
    svg {
      color: #ffd700;
    }
  }
`;

const Car = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [width, setWidth] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) return <LoadingSpinner>{t('carsPage.loading')}</LoadingSpinner>;
  if (error) return <div>{t('errors.general')}: {error}</div>;
  if (!car) return <div>{t('errors.notFound')}</div>;

  const pricingConditions = [
    t('carDetails.pricing.conditions.age'),
    t('carDetails.pricing.conditions.license'),
    t('carDetails.pricing.conditions.insurance'),
  ];

  return (
    <PageContainer>
      <CarHeader>
        <HeaderContent>
          <CarInfo>
            <h2>
              {car.make} <span>{car.model}</span>
            </h2>
          </CarInfo>
          <BookNowButton onClick={openModal}>
            {t('carDetails.bookNow')}
          </BookNowButton>
        </HeaderContent>
      </CarHeader>

      <ContentContainer>
        <CarInfoContainer>
          <SpecsContainer>
            <SpecItem>
              <FaUsers />
              <span>{car.seating} {t('carDetails.specs.seats')}</span>
            </SpecItem>
            <SpecItem>
              <FaTachometerAlt />
              <span>{car.transmission}</span>
            </SpecItem>
            <SpecItem>
              <FaGasPump />
              <span>{car.fuelType}</span>
            </SpecItem>
            <SpecItem>
              <FaBolt />
              <span>{car.motorPower} {t('carDetails.specs.power')}</span>
            </SpecItem>
            <SpecItem>
              <FaCalendarAlt />
              <span>{car.registrationYear}</span>
            </SpecItem>
          </SpecsContainer>

          <CarouselWrapper>
            <CarDetailsCarousel images={car.photos} hideInfo={true} />
          </CarouselWrapper>
        </CarInfoContainer>

        <Card>
          <h3>{t('carDetails.pricing.title')}</h3>
          <Price>${car.price} {t('carDetails.pricing.perDay')}</Price>
          <ul>
            {pricingConditions.map((condition, index) => (
              <li key={index}>
                <FaInfoCircle color="#ffd700" size="1.2em" />
                {condition}
              </li>
            ))}
          </ul>
        </Card>

        <Card
          isMobile={width < 768}
          style={{ marginBottom: width < 768 ? 90 : 0 }}
        >
          <h3>{t('carDetails.features.title')}</h3>
          <ul>
            {car.features.map((feature, index) => (
              <li key={index}>
                <FaCheckCircle color="#ffd700" size="1.2em" />
                {feature}
              </li>
            ))}
          </ul>
        </Card>
      </ContentContainer>
      
      <ReserveModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        disabled={false}
        car={car}
      />
    </PageContainer>
  );
};

export default Car;
