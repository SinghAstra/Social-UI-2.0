import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const RegistrationStage2 = ({ onNext, onBack }) => {
  const [months] = useState([
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
  ]);
  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Populate days (1-31)
    setDays(Array.from({ length: 31 }, (_, i) => i + 1));

    // Populate years (from 1919 to current year)
    const currentYear = new Date().getFullYear();
    setYears(
      Array.from({ length: currentYear - 1918 }, (_, i) => currentYear - i)
    );
  }, []);

  useEffect(() => {
    // Update days based on month and year
    if (selectedMonth && selectedYear) {
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      if (daysInMonth < selectedDay) {
        setSelectedDay(daysInMonth);
      }
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    }
  }, [selectedDay, selectedMonth, selectedYear]);

  useEffect(() => {
    // Validate if all fields are selected and are not very recent.
    const today = new Date();
    const fourYearsAgo = new Date(
      today.getFullYear() - 4,
      today.getMonth(),
      today.getDate()
    );
    if (selectedMonth && selectedDay && selectedYear) {
      const selectedDate = new Date(
        selectedYear,
        selectedMonth - 1,
        selectedDay
      );

      if (selectedDate < fourYearsAgo) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  }, [selectedMonth, selectedDay, selectedYear]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onNext();
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <img src="/birthday.png" alt="birthday" className="birthday-icon" />
      <div className="title-container">
        <span className="title">Date of Birth</span>
        <span className="subtitle">
          This won't be part of your public profile.
        </span>
      </div>
      <div className="date-picker-container">
        <select
          className="date-picker-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="" disabled>
            Month
          </option>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        <select
          className="date-picker-select"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="" disabled>
            Day
          </option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          className="date-picker-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="" disabled>
            Year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <span className="subtitle">
        You need to enter the date you were born on.
      </span>
      <span className="subtitle">
        Use your own date of birth, even if this account is <br /> for a
        business, pet or something else
      </span>
      <button
        type="submit"
        className={`block-level-button ${
          isValid ? "blue-button" : "disabled-blue-button"
        }`}
        disabled={!isValid}
      >
        Next
      </button>
      <button className="back-button" onClick={onBack}>
        <IoMdArrowRoundBack />
      </button>
    </form>
  );
};

export default RegistrationStage2;
