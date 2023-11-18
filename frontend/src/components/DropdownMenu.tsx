import { useState, useEffect } from 'react';
import '../assets/DropdownMenu.css';
import ClearIcon from '../assets/images/clear-icon.png'

type DropdownProps = {
  filter: string;
  options: string[];
  isOpen: boolean;
  toggleDropdown: () => void;
  onSelect: (option: string, initialLoad: boolean) => void;
};

type ButtonProps = {
  name: string;
  onClick: () => void;
  checkedOption: string;
};

function ButtonInside({ name, onClick, checkedOption }: ButtonProps) {
  return (
    <div className="dropdownButtonInsideWrapper">
      <button className="dropdownButtonInside" onClick={onClick}>
        <span style={{ color: name == checkedOption ? '#00CC00' : '' }}>{name}</span>
      </button>
    </div>
  );
}

function DropdownMenu({
  filter,
  options,
  isOpen,
  toggleDropdown,
  onSelect,
}: DropdownProps) {
  const [checkedOption, setCheckedOption] = useState(filter);
  const [initialLoad, setInitialLoad] = useState(true);
  const [filterApplied, setFilterApplied] = useState(false);
  const [optionsCounter, setOptionsCounter] = useState(10)

  // Set checked option to the option that was selected last time, if there is one, otherwise set it to "All"
  useEffect(() => {
    if (initialLoad) {
      const storedFilterOption = sessionStorage.getItem(filter);
      if (storedFilterOption !== null) {
        if (storedFilterOption !== 'All') {
          setCheckedOption(storedFilterOption);
          onSelect(storedFilterOption, true);
          setFilterApplied(true)
        } else {
          setCheckedOption(filter);
          onSelect(storedFilterOption, true);
          setFilterApplied(false)
        }
      }
      setInitialLoad(false);
    } else {
      if (checkedOption == filter) {
        sessionStorage.setItem(filter, 'All');
      } else {
        sessionStorage.setItem(filter, checkedOption);
      }
    }
  }, [onSelect, checkedOption, filter, initialLoad]);

  // Set checked option to the selected option and close the dropdown
  const handleOptionClick = (option: string) => {
    if (option !== checkedOption) {
      setFilterApplied(true)
      setCheckedOption(option);
      onSelect(option, false);
    }
    toggleDropdown();
  };

  const handleDropdown = () => {
    toggleDropdown();
  };

  const handleClear = () => {
    setFilterApplied(false)
    onSelect("All", false)
    setCheckedOption(filter)
    if (isOpen) {
      toggleDropdown()
    }
  }

  return (
    <div className="dropdownButtonWrapper">
      <button className="dropdownButton" onClick={handleDropdown}>
        <label className="DdBlabel">{checkedOption}</label>
        <i className="dropdownArrow"></i>
      </button>
      <div className={`dropdown ${isOpen ? 'active' : 'closed'}`}>
        <div className="optionsWrapper">
          {options.slice(optionsCounter - 10, optionsCounter).map((option) => {
            return (
              <ButtonInside
                key={option}
                name={option}
                checkedOption={checkedOption}
                onClick={() => handleOptionClick(option)}
              />
            );
          })}
        </div>
        {optionsCounter > 10 && (
          <div className="arrowButtonWrapper">
            <button className="arrowButton" onClick={() => setOptionsCounter((prevCounter) => prevCounter - 10)}>
              Left
            </button>
          </div>
        )}
        {optionsCounter < options.length && (
          <div className="arrowButtonWrapper">
            <button className="arrowButton" onClick={() => setOptionsCounter((prevCounter) => prevCounter + 10)}>
              Right
            </button>
          </div>
        )}
      </div>
      {filterApplied && (
        <button className="clearButton" onClick={handleClear}>
          <img src={ClearIcon}></img>
        </button>
      )}
    </div>
  );
}

export default DropdownMenu;
