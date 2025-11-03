import { useState } from 'react';
import './dropDown.css';
import { TiTick } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";

const DropDown = ({ className, options, selectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={`dropdown ${className}`}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                {selectedOption} <span style={{paddingLeft:"10px"}}>{isOpen ? <IoIosArrowDown style={{ transform: 'rotate(180deg) translateY(-2px)'  }} /> : <IoIosArrowDown style={{ transform: 'translateY(2px)'}}/>}</span>
            </button>
            {isOpen && <div className="dropdown-menu">
                {options.map((option) => (
                    <div
                        key={option}
                        className={`dropdown-item ${option === selectedOption ? 'active' : ''}`}
                        onClick={() => onSelect(option)}
                    >
                        {option === selectedOption && <TiTick />} <span>{option}</span>
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default DropDown;
