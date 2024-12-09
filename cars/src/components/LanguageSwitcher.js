import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const SwitcherButton = styled.button`
  background: transparent;
  border: 1px solid #ffd700;
  color: #ffd700;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 215, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

const LanguageIcon = styled.span`
  font-size: 16px;
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sq' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <SwitcherButton onClick={toggleLanguage}>
      <LanguageIcon>🌐</LanguageIcon>
      {i18n.language === 'en' ? 'AL' : 'EN'}
    </SwitcherButton>
  );
};

export default LanguageSwitcher; 