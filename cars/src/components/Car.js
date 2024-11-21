import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CarDetailsCarousel from "./CarDetailsCarousel";
import { FaInfoCircle, FaCheckCircle, FaUsers, FaTachometerAlt } from "react-icons/fa";
import showroomBackground from "../assets/showroom.jpg"; // Update the path as needed
import ReserveModal from "./ReserveModal";
import axios from "axios";

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
    background:url('/wallp2.jpg') no-repeat center center fixed;
    background-size: cover;
    filter: blur(2px);
    z-index: -1;
    transform: scale(1.1);
  }
`;

const ContentContainer = styled.div`
  width: 60%;
  margin: 80px auto 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const BookNowButton = styled.button`
  width: 100%;
  max-width: 600px;
  background-color: rgba(255, 215, 0, 0.8);
  color: black;
  padding: 15px;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 10px;
  margin-bottom: 40px;

  &:hover {
    background-color: rgba(230, 194, 0, 0.8);
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px 0;
    margin: 0;
    border-radius: 0;
    z-index: 3;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 20px;
  margin: 20px 0; /* Ensure consistent margin */
  width: 100%;
  max-width: 600px; /* Match the carousel width */
  color: white;

  ${({ removeMarginTop }) =>
    removeMarginTop &&
    `
    margin-top: 0;
  `}

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

const features = [
  "Air Conditioning",
  "GPS Navigation",
  "Bluetooth Connectivity",
  "Heated Seats",
  "Backup Camera",
  "Leather Seats",
  "Sunroof",
  "Blind Spot Monitoring",
  "Keyless Entry",
  "Adaptive Cruise Control",
  "Automatic Emergency Braking",
  "Lane Keeping Assist",
  "Parking Sensors",
  "Rain Sensing Wipers",
  "Automatic Headlights",
  "Remote Start",
  "Apple CarPlay",
  "Android Auto",
  "Wi-Fi Hotspot",
  "Wireless Charging",
  "Rear Cross-Traffic Alert",
  "Driver Attention Monitor",
  "Head-Up Display",
  "Premium Sound System",
  "Multi-Zone Climate Control",
  "Power Liftgate",
  "Ambient Lighting",
  "Heated Steering Wheel",
  "Voice Recognition",
  "Satellite Radio",
];

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
`;

const LoadingSpinner = styled.div`
  // Add your loading spinner styles
`;

const CarHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
  
  h2 {
    color: #ffd700;
    font-size: 2.4em;
    margin: 0;
    margin-bottom: 10px;
  }
  
  .car-subtitle {
    color: #ffffff;
    font-size: 1.2em;
    display: flex;
    justify-content: center;
    gap: 15px;
    
    span {
      display: flex;
      align-items: center;
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

  if (loading) return <LoadingSpinner>Loading...</LoadingSpinner>;
  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>Car not found</div>;

  return (
    <PageContainer>
      <ContentContainer>
        <CarHeader>
          <h2>{car.make} {car.model}</h2>
          <div className="car-subtitle">
            <span>{car.registrationYear}</span>
            <span>•</span>
            <span>{car.transmission}</span>
            <span>•</span>
            <span>{car.fuelType}</span>
          </div>
        </CarHeader>

        <CarouselWrapper>
          <CarDetailsCarousel images={car.photos} />
        </CarouselWrapper>

        <Card>
          <h3>Pricing</h3>
          <Price>${car.price} / day</Price>
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
          style={{ marginBottom: width < 768 ? 90 : 20 }}
        >
          <h3>Features</h3>
          <ul>
            {car.features.map((feature, index) => (
              <li key={index}>
                <FaCheckCircle color="#ffd700" size="1.2em" />
                {feature}
              </li>
            ))}
          </ul>
        </Card>

        <BookNowButton onClick={openModal}>Book Now</BookNowButton>
        
        <ReserveModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          disabled={false}
          car={car}
        />
      </ContentContainer>
    </PageContainer>
  );
};

export default Car;
