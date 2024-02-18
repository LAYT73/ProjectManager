import React, { useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';

const DropdownList = ({isOpen, setIsOpen, elems, index, length}) => {
    const dropdownRef = useRef(null);

    const handleItemClick = (item) => {
        console.log(`Выбран элемент: ${item}`);
        const array = [...isOpen];
        const element = array[index]
        array[index] = {
            isOpen: !element,
        }
        setIsOpen(array)
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            const array = [];
            for (let i = 0; i < length; i++) {
                array[i] = {
                    isOpen: false,
                }
            }
            setIsOpen(array);
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
        { isOpen[index]?.isOpen && (
            <div className={styles.dropdownContent}>
                {elems?.map((el,i)=>{
                    return (
                        <div className={styles.dropdownContent_element} onClick={() => el.action()}>
                            <span role="img" aria-label="icon">
                                <img src={el.picture} alt="" />
                            </span>
                            <h4>
                                {el.title}
                            </h4>
                        </div>
                    )
                    })
                }
            </div>
        )}
    </div>  
</>);
};

export default DropdownList;
