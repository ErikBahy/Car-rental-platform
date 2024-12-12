import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FilterContainer = styled.div`
  padding: 20px;
`;

const DateInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #ffd700;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const DateInput = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1) sepia(100%) saturate(10000%) hue-rotate(300deg);
    cursor: pointer;
  }
`;

const FilterButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4a 100%);
  color: black;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const ClearButton = styled(FilterButton)`
  background: transparent;
  border: 1px solid #ffd700;
  color: #ffd700;

  &:hover {
    background: rgba(255, 215, 0, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const DateRangeFilter = ({ initialDates, onFilterChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dates, setDates] = useState({
    pickup: initialDates?.pickup || '',
    dropoff: initialDates?.dropoff || ''
  });

  useEffect(() => {
    setDates({
      pickup: initialDates?.pickup || '',
      dropoff: initialDates?.dropoff || ''
    });
  }, [initialDates]);

  const handleDateChange = (field) => (e) => {
    const newDates = { ...dates, [field]: e.target.value };
    setDates(newDates);

    // If pickup date is changed, clear dropoff date if it's before pickup
    if (field === 'pickup' && dates.dropoff && new Date(dates.dropoff) < new Date(e.target.value)) {
      setDates(prev => ({ ...prev, dropoff: '' }));
    }
  };

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (dates.pickup) params.set('pickup', dates.pickup);
    if (dates.dropoff) params.set('dropoff', dates.dropoff);
    navigate(`/our-cars?${params.toString()}`);
    onFilterChange(dates);
  };

  const clearFilter = () => {
    setDates({ pickup: '', dropoff: '' });
    navigate('/our-cars');
    onFilterChange({ pickup: '', dropoff: '' });
  };

  const today = new Date().toISOString().split('T')[0];
  const isFilterValid = dates.pickup && dates.dropoff && 
    new Date(dates.dropoff) >= new Date(dates.pickup);

  return (
    <FilterContainer>
      <DateInputsWrapper>
        <InputGroup>
          <Label>{t('search.pickupDate')}</Label>
          <DateInput
            type="date"
            value={dates.pickup}
            onChange={handleDateChange('pickup')}
            min={today}
          />
        </InputGroup>

        <InputGroup>
          <Label>{t('search.dropoffDate')}</Label>
          <DateInput
            type="date"
            value={dates.dropoff}
            onChange={handleDateChange('dropoff')}
            min={dates.pickup || today}
          />
        </InputGroup>

        <ButtonGroup>
          <FilterButton 
            onClick={handleFilter}
            disabled={!isFilterValid}
          >
            {t('search.filter')}
          </FilterButton>
          <ClearButton onClick={clearFilter}>
            {t('search.clear')}
          </ClearButton>
        </ButtonGroup>
      </DateInputsWrapper>
    </FilterContainer>
  );
};

export default DateRangeFilter; 