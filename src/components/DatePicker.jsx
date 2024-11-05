import React, { useEffect, useState } from "react";

import styled from "styled-components";

const Top = styled.div`
  padding: 10px 0 25px;
`;

const Select = styled.select`
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin: 4px 0;
  color: #333;
`;

const DatePicker = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [daysInMonth, setDaysInMonth] = useState(31);

  // Months array
  const months = React.useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );
  // Generate options for years, hours, and minutes
  const years = Array.from(
    { length: 8 },
    (_, i) => new Date().getFullYear() + i
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // Function to calculate the number of days in the selected month and year
  const calculateDaysInMonth = React.useCallback(
    (month, year) => {
      const monthIndex = months.indexOf(month);
      return new Date(year, monthIndex + 1, 0).getDate(); // last day of the month
    },
    [months]
  );

  // Update days in the month whenever month or year changes
  useEffect(() => {
    setDaysInMonth(calculateDaysInMonth(selectedMonth, selectedYear));
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth); // Adjust if selected day is out of range
    }
  }, [
    selectedYear,
    calculateDaysInMonth,
    selectedMonth,
    daysInMonth,
    selectedDay,
  ]);

  return (
    <div>
      <Top>
        <div className="flex gap-sm">
          <div>
            <Label>Day</Label>
            <Select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
            >
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                )
              )}
            </Select>
          </div>

          <div>
            <Label>Month</Label>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label>Year</Label>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex gap-sm">
          <div>
            <Label>Hour</Label>
            <Select
              value={selectedHour}
              onChange={(e) => setSelectedHour(Number(e.target.value))}
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour < 10 ? `0${hour}` : hour}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label>Minute</Label>
            <Select
              value={selectedMinute}
              onChange={(e) => setSelectedMinute(Number(e.target.value))}
            >
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute < 10 ? `0${minute}` : minute}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Top>
    </div>
  );
};

export default DatePicker;
