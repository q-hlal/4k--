import React, { useEffect, useState } from "react";

const SearchFilter = ({ onSearch, onSelectChange, onDateTimeChange }) => {
  const [fullDate, setFullDate] = useState("");
  const [fullTime, setFullTime] = useState("");

  const updateDateTime = () => {
    const currentDate = new Date();
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeOptions = {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const newFullDate = currentDate.toLocaleDateString("en-US", dateOptions);
    const newFullTime = currentDate.toLocaleTimeString("en-US", timeOptions);

    setFullDate(newFullDate);
    setFullTime(newFullTime);

    onDateTimeChange({
      date: newFullDate,
      time: newFullTime,
    });
  };

  useEffect(() => {
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    onSearch(searchValue);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue);
  };

  return (
    <div className="customer-info">
      <div className="date">
        <span>{fullDate}</span>
        <span>{fullTime}</span>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="ابحث هنا " onChange={handleSearch} />
      </div>
      <div className="name-input">
        <select onChange={handleSelectChange}>
          <option value="نقد">نقد</option>
          <option value="دائن">دائن</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
