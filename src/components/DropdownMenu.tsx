import { useState, useEffect } from "react";
import "../assets/DropdownMenu.css";

type DropdownProps = {
    filter: string;
    options: string[]
}

type ButtonProps = {
    name: string;
    onChange: () => void;
}

function ButtonInside({ name, onChange }: ButtonProps) {
    return (
        <button className="dropdownButtonInside" onClick={onChange}>{name}</button>
    )
}

function DropdownMenu({filter, options}: DropdownProps) {

    const [dropdown, setDropdown] = useState(false)
    const [checkedOption, setCheckedOption] = useState(filter)

    useEffect(() => {
        localStorage.setItem(filter, checkedOption)
    }, [checkedOption])

    const handleOptionClick = (option: string) => {

        if (option === "Alle") {
            setCheckedOption(filter)
        } else {
            setCheckedOption(option)
        }

        setDropdown(false)
    };
    
    const handleDropdown = () => {
        setDropdown(!dropdown)
    }
    
    return (
        <div className="dropdownButtonWrapper">
            <button className="dropdownButton" onClick={handleDropdown}>
                <label className="DdBlabel">{checkedOption}</label>
                <i className="dropdownArrow"></i>
            </button>
            {dropdown ? (
                <div className="dropdown">
                    {options.map((option) => {
                        if (option !== "Alle" || checkedOption !== filter) { // only show option "Alle" when the user has applied a filter
                            return (
                                <ButtonInside 
                                    key={option}
                                    name={option}
                                    onChange={() => handleOptionClick(option)}
                                />
                            );
                        }
                    })}
                </div>
            ): null}
        </div>
    )
}

export default DropdownMenu