import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); /* Dark background with opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;
const ModalContent = styled.div`
  background: rgba(5, 6, 6, 0.7); /* Dark background with transparency */
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  position: relative;
`;
const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 15px;
  right: 15px;
  color: #ffd700; /* Yellowish color */
  font-size: 1.5em;
  cursor: pointer;

  &:hover {
    color: rgba(255, 215, 0, 0.8);
  }
`;

const Title = styled.h2`
  color: #ffd700; /* Yellowish color */
  text-align: center;
  margin-bottom: 20px;
`;

const DateInput = styled.input`
  width: calc(50% - 10px);
  padding: 10px;
  margin: 10px 5px;
  font-size: 1em;
  border: 1px solid #ffd700;
  border-radius: 5px;
  background: #333;
  color: white;

  &::placeholder {
    color: #ccc;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const BookNowButton = styled.button`
  background-color: ${({ disabled }) =>
    disabled ? "rgba(255, 215, 0, 0.5)" : "rgba(255, 215, 0, 0.8)"};
  color: black;
  padding: 15px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 10px;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "rgba(255, 215, 0, 0.5)" : "rgba(230, 194, 0, 0.8)"};
  }
`;

const ReserveModal = ({ isOpen, onClose, disabled }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent>
        <CloseIcon onClick={onClose} />
        <Title>Reserve Your Car</Title>
        <DateInput type="date" placeholder="Pickup Date" />
        <DateInput type="date" placeholder="Dropoff Date" />
        <ButtonContainer>
          <BookNowButton disabled={disabled}>Book Now</BookNowButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReserveModal;