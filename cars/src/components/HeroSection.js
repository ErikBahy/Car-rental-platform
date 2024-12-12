// src/components/HeroSection.js
import React, { useState, useRef } from "react";
import { HeroSection, SearchBar, DateInput, SearchButton } from "../styles";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const HeroSectionComponent = () => {
  const { t } = useTranslation();
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupFocused, setPickupFocused] = useState(false);
  const [dropoffFocused, setDropoffFocused] = useState(false);
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);
  const navigate = useNavigate();

  const handlePickupChange = (e) => {
    const selectedDate = e.target.value;
    setPickupDate(selectedDate);

    if (dropoffDate && new Date(dropoffDate) < new Date(selectedDate)) {
      setDropoffDate("");
    }
  };

  const handleDropoffChange = (e) => {
    setDropoffDate(e.target.value);
  };

  const handleInputClick = (inputRef) => {
    const dateInput = inputRef.current.querySelector('input[type="date"]');
    if (dateInput) {
      dateInput.showPicker();
    }
  };

  const handleAvailableToday = () => {
    const today = new Date();
    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);

    const formattedToday = today.toISOString().split('T')[0];
    const formattedTwoDays = twoDaysLater.toISOString().split('T')[0];

    navigate(`/our-cars?pickup=${formattedToday}&dropoff=${formattedTwoDays}`);
  };

  const handleSearch = () => {
    if (pickupDate && dropoffDate) {
      navigate(`/our-cars?pickup=${pickupDate}&dropoff=${dropoffDate}`);
    }
  };

  return (
    <HeroSection>
      <SearchBar>
        <div ref={pickupInputRef}>
          <DateInput
            type={pickupFocused ? "date" : "text"}
            value={pickupDate}
            onChange={handlePickupChange}
            min={new Date().toISOString().split('T')[0]}
            required
            placeholder={t('search.pickupDate')}
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
        </div>
        <div ref={dropoffInputRef}>
          <DateInput
            type={dropoffFocused ? "date" : "text"}
            value={dropoffDate}
            onChange={handleDropoffChange}
            min={pickupDate || new Date().toISOString().split('T')[0]}
            required
            placeholder={t('search.dropoffDate')}
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
        </div>
        <SearchButton
          onClick={handleSearch}
          disabled={!pickupDate || !dropoffDate}
        >
          {t('search.findCar')}
        </SearchButton>
        <SearchButton onClick={handleAvailableToday} isSecondary>
          {t('search.availableToday')}
        </SearchButton>
      </SearchBar>
    </HeroSection>
  );
};

export default HeroSectionComponent;
