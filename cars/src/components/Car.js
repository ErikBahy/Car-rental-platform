import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CarDetailsCarousel from "./CarDetailsCarousel";
import { FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import showroomBackground from "../assets/showroom.jpg"; // Update the path as needed
import ReserveModal from "./ReserveModal";

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

const Car = () => {
  const { carId } = useParams();
  const [width, setWidth] = useState(window.innerWidth);
  const [isModalOpen, setisModalOpen] = useState(false)
  

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

  const openModal = () => setisModalOpen(true);
  const closeModal = () => setisModalOpen(false);



  return (
    <PageContainer>
      <ContentContainer>
        <CarDetailsCarousel />
        <Card>
          <h3>Pricing</h3>
          <Price>$150 / day</Price>
          <ul>
            {pricingConditions.map((condition, index) => (
              <li key={index}>
                <FaInfoCircle color="#ffd700" size="1.5em" />
                {condition}
              </li>
            ))}
          </ul>
        </Card>
        <Card
          isMobile={width < 768}
          removeMarginTop
          style={{ marginBottom: width < 768 ? 90 : 20 }}
        >
          <h3>Features</h3>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>
                <FaCheckCircle color="#ffd700" size="1.5em" />
                {feature}
              </li>
            ))}
          </ul>
        </Card>
        <BookNowButton onClick={openModal}>Book Now</BookNowButton>

      <ReserveModal isOpen={isModalOpen} onClose={closeModal} disabled={false} />
      </ContentContainer>
    </PageContainer>
  );
};

export default Car;
