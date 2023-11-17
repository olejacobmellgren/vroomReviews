import { useState, useEffect } from 'react';
import '../assets/DropdownMenu.css';

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
};

function ButtonInside({ name, onClick }: ButtonProps) {
  const [isAll] = useState(name == 'All');
  return (
    <div className="dropdownButtonInsideWrapper">
      <button className="dropdownButtonInside" onClick={onClick}>
        <span style={{ color: isAll ? '#00CC00' : '' }}>{name}</span>
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

  // Set checked option to the option that was selected last time, if there is one, otherwise set it to "All"
  useEffect(() => {
    if (initialLoad) {
      const storedFilterOption = sessionStorage.getItem(filter);
      if (storedFilterOption !== null) {
        if (storedFilterOption !== 'All') {
          setCheckedOption(storedFilterOption);
          onSelect(storedFilterOption, true);
        } else {
          setCheckedOption(filter);
          onSelect(storedFilterOption, true);
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
      if (option === 'All') {
        setCheckedOption(filter);
      } else {
        setCheckedOption(option);
      }

      onSelect(option, false);
    }
    toggleDropdown();
  };

  const handleDropdown = () => {
    toggleDropdown();
  };

  return (
    <div className="dropdownButtonWrapper">
      <button
        className="dropdownButton"
        onClick={handleDropdown}
        data-testid="drop-down"
      >
        <label className="DdBlabel">{checkedOption}</label>
        <i className="dropdownArrow"></i>
      </button>
      <div className={`dropdown ${isOpen ? 'active' : 'closed'}`}>
        {options.map((option) => {
          if (option !== 'All' || checkedOption !== filter) {
            // Only show option "All" when the user has applied a filter
            return (
              <ButtonInside
                key={option}
                name={option}
                onClick={() => handleOptionClick(option)}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default DropdownMenu;
