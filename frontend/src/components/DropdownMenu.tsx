import { useState, useEffect } from 'react';
import '../assets/DropdownMenu.css';
import ClearIcon from '../assets/images/clear-icon.png';

type DropdownProps = {
  filter: string;
  options: string[];
  isOpen: boolean;
  updateOptionCounter: boolean;
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
    <div className="dropdown-button-inside-wrapper">
      <button className="dropdown-button-inside" onClick={onClick}>
        <span style={{ color: name == checkedOption ? 'red' : '' }}>
          {name}
        </span>
      </button>
    </div>
  );
}

function DropdownMenu({
  filter,
  options,
  isOpen,
  updateOptionCounter,
  toggleDropdown,
  onSelect,
}: DropdownProps) {
  const [checkedOption, setCheckedOption] = useState(filter);
  const [initialLoad, setInitialLoad] = useState(true);
  const [filterApplied, setFilterApplied] = useState(false);
  const [optionsCounter, setOptionsCounter] = useState(10);

  // Set checked option to the option that was selected last time, if there is one, otherwise set it to "All"
  useEffect(() => {
    if (initialLoad) {
      const storedFilterOption = sessionStorage.getItem(filter);
      if (storedFilterOption !== null) {
        if (storedFilterOption !== 'All') {
          setCheckedOption(storedFilterOption);
          onSelect(storedFilterOption, true);
          setFilterApplied(true);
        } else {
          setCheckedOption(filter);
          onSelect(storedFilterOption, true);
          setFilterApplied(false);
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

  useEffect(() => {
    if (updateOptionCounter) {
      setOptionsCounter(10);
    }
  }, [updateOptionCounter]);

  // Set checked option to the selected option and close the dropdown
  const handleOptionClick = (option: string) => {
    if (option !== checkedOption) {
      setFilterApplied(true);
      setCheckedOption(option);
      onSelect(option, false);
    }
    toggleDropdown();
  };

  const handleDropdown = () => {
    toggleDropdown();
  };

  const handleClear = () => {
    setFilterApplied(false);
    onSelect('All', false);
    setCheckedOption(filter);
    if (isOpen) {
      toggleDropdown();
    }
  };

  return (
    <div className="dropdown-button-wrapper">
      <button
        className={`dropdown-button ${isOpen ? 'active' : 'closed'}`}
        onClick={handleDropdown}
        data-testid="drop-down"
      >
        <label className="ddb-label">{checkedOption}</label>
        <i className="dropdown-arrow"></i>
      </button>
      <div className={`dropdown ${isOpen ? 'active' : 'closed'}`}>
        <menu className="options-wrapper">
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
        </menu>
        <div className="arrow-wrapper" style={{ justifyContent: 'center' }}>
          {optionsCounter > 10 && (
            <div className="arrow-button-wrapper">
              <button
                className="dropdown-arrow-button arrow-button-left"
                onClick={() =>
                  setOptionsCounter((prevCounter) => prevCounter - 10)
                }
                aria-label="arrow-button"
              >
                <i className="arrow-left"></i>
              </button>
            </div>
          )}
          {optionsCounter < options.length && (
            <div className="arrow-button-wrapper">
              <button
                className="dropdown-arrow-button arrow-button-right"
                onClick={() =>
                  setOptionsCounter((prevCounter) => prevCounter + 10)
                }
                aria-label="arrow-button"
              >
                <i className="arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      {filterApplied && (
        <button className="clear-button" onClick={handleClear}>
          <img src={ClearIcon}></img>
        </button>
      )}
    </div>
  );
}

export default DropdownMenu;
