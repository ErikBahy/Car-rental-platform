// src/components/HeroSection.js
import React, { useState, useRef } from "react";
import { HeroSection, SearchBar, DateInput, SearchButton } from "../styles";

const HeroSectionComponent = () => {
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
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
        <div ref={pickupInputRef} onClick={() => handleInputClick(pickupInputRef)}>
          <DateInput
            type="date"
            value={pickupDate}
            onChange={handlePickupChange}
            min={new Date().toISOString().split('T')[0]}
            required
            placeholder="Pick-up Date"
          />
        </div>
        <div ref={dropoffInputRef} onClick={() => handleInputClick(dropoffInputRef)}>
          <DateInput
            type="date"
            value={dropoffDate}
            onChange={handleDropoffChange}
            min={pickupDate || new Date().toISOString().split('T')[0]}
            required
            placeholder="Drop-off Date"
          />
        </div>
        <SearchButton onClick={handleSearch}>
          Find Your Car
        </SearchButton>
        <SearchButton onClick={handleAvailableToday} isSecondary>
          Available Cars Today
        </SearchButton>
      </SearchBar>
    </HeroSection>
  );
};

export default HeroSectionComponent;
