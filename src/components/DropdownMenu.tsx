import { useState, useEffect } from "react";
import "../assets/DropdownMenu.css";

type DropdownProps = {
    filter: string;
    options: string[]
}

type CheckBoxProps = {
    name: string;
    checked: boolean;
    onChange: () => void;
}

function CheckBox({ name, checked, onChange}: CheckBoxProps) {
    return (
        <label>
            <input type="checkbox" checked={checked} onChange={onChange} />
            {name}
        </label>
    )
}

function DropdownMenu({filter, options}: DropdownProps) {

    const [dropdown, setDropdown] = useState(false)
    const [optionStates, setOptionStates] = useState(
        options.reduce((acc, option) => {
            acc[option] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );
    const [checkedOption, setCheckedOption] = useState(filter)

    useEffect(() => {
        localStorage.setItem(filter, checkedOption)
    }, [checkedOption])

    const handleOptionClick = (option: string) => {
        const isChecked = optionStates[option]

        setCheckedToFalse()

        setOptionStates((prevOptionStates) => {
            return {
                ...prevOptionStates,
                [option]: !isChecked,
            };
        });

        if (isChecked === true) {
            setCheckedOption(filter)
        } else {
            setCheckedOption(option)
        }

        setDropdown(false)
    };
    
    const handleDropdown = () => {
        setDropdown(!dropdown)
    }
    
    const setCheckedToFalse = () => {
        setOptionStates(
            options.reduce((acc, option) => {
                acc[option] = false;
                return acc;
            }, {} as Record<string, boolean>)
        );
    }


    const getCheckedOption = () => {
        return checkedOption
    }

    return (
        <div className="dropdownButtonWrapper">
            <button className="dropdownButton" onClick={handleDropdown}>
                <label className="DdBlabel">{getCheckedOption()}</label>
                <i className="dropdownArrow"></i>
            </button>
            {dropdown ? (
                <div className="dropdown">
                    {options.map((option) => {
                        return (
                            <CheckBox 
                                key={option}
                                name={option}
                                checked={optionStates[option]}
                                onChange={() => handleOptionClick(option)}
                            />
                        )
                    })}
                </div>
            ): null}
        </div>
    )
}

export default DropdownMenu