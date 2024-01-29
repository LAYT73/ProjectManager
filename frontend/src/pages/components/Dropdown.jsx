import React, { useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({isOpen, setIsOpen, elems}) => {
    const dropdownRef = useRef(null);

    const handleItemClick = (item) => {
        console.log(`Выбран элемент: ${item}`);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

return (<>
    <div ref={dropdownRef} className={styles.dropdownWrapper}>
        {isOpen && (
            <div className={styles.dropdownContent}>
                {elems?.map((el,i)=>{
                    return (
                        <div onClick={() => el.action()}>
                            <span role="img" aria-label="icon">
                                <img src={el.picture} alt="" />
                            </span>
                            {el.title}
                        </div>
                    )
                    })
                }
            </div>
        )}
    </div>  
</>);
};

export default Dropdown;
