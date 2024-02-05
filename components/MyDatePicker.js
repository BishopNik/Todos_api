import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;  
`;

const CustomDatePicker = styled(DatePicker)`
  /* Стилі для DatePicker */
  width: 200px;
  margin-top: 10px;
  border: none;
  color: #BEDBB0;
  background-color: transparent;
`;

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <DatePickerContainer>
      <CustomDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={new Date()}
        dateFormat={`'Today, 'MMMM d \u02C5`}
      />
    </DatePickerContainer>
  );
};

export default MyDatePicker;