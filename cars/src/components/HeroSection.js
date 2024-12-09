// src/components/HeroSection.js
import React, { useState, useRef } from "react";
import { HeroSection, SearchBar, DateInput, SearchButton } from "../styles";
import { useTranslation } from 'react-i18next';

const HeroSectionComponent = () => {
  const { t } = useTranslation();
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupFocused, setPickupFocused] = useState(false);
  const [dropoffFocused, setDropoffFocused] = useState(false);
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);

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
    const today = new Date().toISOString().split('T')[0];
    setPickupDate(today);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDropoffDate(tomorrow.toISOString().split('T')[0]);
  };

  const handleSearch = () => {
    console.log("Search with dates:", { pickupDate, dropoffDate });
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
