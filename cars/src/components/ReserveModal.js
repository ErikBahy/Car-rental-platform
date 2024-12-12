import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background: rgba(25, 25, 25, 0.95);
  padding: 40px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.15),
              0 0 20px rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.2);
  position: relative;
`;
const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ffd700;
  font-size: 1.5em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #ffed4a;
  }
`;

const Title = styled.h2`
  color: #ffd700;
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  
  span {
    display: block;
    font-size: 0.7em;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 5px;
  }
`;

const DateInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px 0;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 1em;
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
    background: rgba(0, 0, 0, 0.6);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1) sepia(100%) saturate(1000%) hue-rotate(0deg);
    opacity: 0.7;
    cursor: pointer;
  }
`;

const BookNowButton = styled.button`
  background: ${({ disabled }) => 
    disabled 
      ? 'rgba(255, 215, 0, 0.3)' 
      : 'linear-gradient(135deg, #ffd700 0%, #ffed4a 100%)'
  };
  color: ${({ disabled }) => disabled ? '#666' : 'black'};
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  box-shadow: ${({ disabled }) => 
    disabled 
      ? 'none' 
      : '0 4px 15px rgba(0, 0, 0, 0.2)'
  };

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    &:disabled {
      background: rgba(255, 215, 0, 0.3);
      color: #666;
      box-shadow: none;
      border: 1px solid rgba(255, 215, 0, 0.2);
    }
  }
`;

const UserInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1em;
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 0.9em;
  margin-top: 5px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  border: 3px solid rgba(255, 215, 0, 0.1);
  border-top: 3px solid #ffd700;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ReserveModal = ({ isOpen, onClose, disabled, car }) => {
  const { t } = useTranslation();
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupFocused, setPickupFocused] = useState(false);
  const [dropoffFocused, setDropoffFocused] = useState(false);
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const handlePickupChange = (e) => {
    const selectedDate = e.target.value;
    setPickupDate(selectedDate);

    if (dropoffDate && new Date(dropoffDate) < new Date(selectedDate)) {
      setDropoffDate("");
    }

    if (selectedDate && dropoffDate) {
      checkAvailability(selectedDate, dropoffDate);
    }
  };

  const handleDropoffChange = (e) => {
    const selectedDate = e.target.value;
    setDropoffDate(selectedDate);
    
    if (pickupDate && selectedDate) {
      checkAvailability(pickupDate, selectedDate);
    }
  };

  const handleInputClick = (inputRef) => {
    const dateInput = inputRef.current.querySelector('input[type="date"]');
    if (dateInput) {
      dateInput.showPicker();
    }
  };

  const isFormValid = () => {
    return (
      pickupDate && 
      dropoffDate && 
      firstName && 
      lastName && 
      email && 
      phone
    );
  };

  const checkAvailability = async (pickup, dropoff) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/reservations/check-availability/${car._id}`,
        {
          params: {
            startDate: pickup,
            endDate: dropoff
          }
        }
      );
      setIsAvailable(response.data.available);
      if (!response.data.available) {
        setError("This car is not available for the selected dates");
      } else {
        setError("");
      }
    } catch (err) {
      console.error("Error checking availability:", err);
      setError("Error checking availability");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const reservationData = {
        carId: car._id,
        pickupDate,
        dropoffDate,
        customer: {
          firstName,
          lastName,
          email,
          phone
        }
      };

      const response = await axios.post(`${API_BASE_URL}/reservations`, reservationData);
      toast.success(t('reserveModal.success'), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: { 
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff"
        }
      });
      onClose();
    } catch (error) {
      console.error('Error making reservation:', error);
      setError(t('reserveModal.errors.reservation'));
      toast.error(t('reserveModal.errors.reservation'), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: { 
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>
        <CloseIcon onClick={onClose} />
        <Title>
          {t('reserveModal.title')} {car.make} {car.model}
          <span>{t('reserveModal.subtitle')}</span>
        </Title>

        <DateInputsContainer>
          <InputWrapper ref={pickupInputRef}>
            <DateInput
              type={pickupFocused ? "date" : "text"}
              value={pickupDate}
              onChange={handlePickupChange}
              min={new Date().toISOString().split('T')[0]}
              required
              placeholder={t('reserveModal.dates.pickup')}
              onFocus={() => {
                setPickupFocused(true);
                handleInputClick(pickupInputRef);
              }}
              onBlur={() => {
                if (!pickupDate) {
                  setPickupFocused(false);
                }
              }}
            />
          </InputWrapper>
          
          <InputWrapper ref={dropoffInputRef}>
            <DateInput
              type={dropoffFocused ? "date" : "text"}
              value={dropoffDate}
              onChange={handleDropoffChange}
              min={pickupDate || new Date().toISOString().split('T')[0]}
              required
              placeholder={t('reserveModal.dates.dropoff')}
              onFocus={() => {
                setDropoffFocused(true);
                handleInputClick(dropoffInputRef);
              }}
              onBlur={() => {
                if (!dropoffDate) {
                  setDropoffFocused(false);
                }
              }}
            />
          </InputWrapper>
        </DateInputsContainer>

        <UserInfoContainer>
          <Input
            type="text"
            placeholder={t('reserveModal.form.firstName')}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder={t('reserveModal.form.lastName')}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder={t('reserveModal.form.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="tel"
            placeholder={t('reserveModal.form.phone')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </UserInfoContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <BookNowButton 
          disabled={!isFormValid() || disabled || loading || !isAvailable}
          onClick={handleSubmit}
        >
          {loading ? <LoadingSpinner /> : t('reserveModal.confirmBooking')}
        </BookNowButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReserveModal;