import { useState, useEffect } from 'react';
import '../assets/DropdownMenu.css';

type DropdownProps = {
  filter: string;
  options: string[];
  isOpen: boolean;
  toggleDropdown: () => void;
};

type ButtonProps = {
  name: string;
  onClick: () => void;
};

function ButtonInside({ name, onClick }: ButtonProps) {
  return (
    <button className="dropdownButtonInside" onClick={onClick}>
      {name}
    </button>
  );
}

function DropdownMenu({
  filter,
  options,
  isOpen,
  toggleDropdown,
}: DropdownProps) {
  const [checkedOption, setCheckedOption] = useState(filter);

  useEffect(() => {
    localStorage.setItem(filter, checkedOption);
  }, [filter, checkedOption]);

  const handleOptionClick = (option: string) => {
    if (option === 'Alle') {
      setCheckedOption(filter);
    } else {
      setCheckedOption(option);
    }

    toggleDropdown();
  };

  const handleDropdown = () => {
    toggleDropdown();
  };

  return (
    <div className="dropdownButtonWrapper">
      <button className="dropdownButton" onClick={handleDropdown}>
        <label className="DdBlabel">{checkedOption}</label>
        <i className="dropdownArrow"></i>
      </button>
      <div className={`dropdown ${isOpen ? 'active' : 'closed'}`}>
        {options.map((option) => {
          if (option !== 'Alle' || checkedOption !== filter) {
            // only show option "Alle" when the user has applied a filter
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