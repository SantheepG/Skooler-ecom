import React, { useState } from "react";
import "./SearchBar.scss";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <React.Fragment>
      <div class="form-container">
        <div class="form-tab">
          <div class="search-field">
            <i data-feather="search" class="search-icon"></i>
            <p class="search-placeholder">Reports or documents</p>
            <form>
              <input
                type="text"
                className="text-field"
                value={inputValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleInputChange}
              />
            </form>
          </div>
          <div class="search-btn">
            <p>search</p>
          </div>
        </div>
      </div>
      {isFocused && (
        <div class="absolute mt-20 resoult-tab resoult-tab-active">
          <div class="ul-title">
            <p>Recent Search</p>
          </div>
          <div class="ul">
            <div class="li li-1">
              <div class="li-icon">
                <i data-feather="clipboard" class="icon"></i>
              </div>
              <div class="li-text">Traffic report 2020</div>
            </div>
            <div class="li li-2">
              <div class="li-icon">
                <i data-feather="users" class="icon"></i>
              </div>
              <div class="li-text">Data audience February</div>
            </div>
            <div class="li li-3">
              <div class="li-icon">
                <i data-feather="calendar" class="icon"></i>
              </div>
              <div class="li-text">March exhibitions dates</div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default SearchBar;
