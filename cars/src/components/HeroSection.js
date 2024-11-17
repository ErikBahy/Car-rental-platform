// src/components/HeroSection.js
import React from "react";
import { HeroSection, OverlayText, SearchBar } from "../styles";

const HeroSectionComponent = () => {
  return (
    <HeroSection>
      <OverlayText>Take it easy</OverlayText>
      <SearchBar>
        <input type="text" placeholder="Pick-up location" />
        <input type="text" placeholder="Drop-off location" />
        <input type="date" />
        <button>Find Your Car</button>
      </SearchBar>
    </HeroSection>
  );
};

export default HeroSectionComponent;
