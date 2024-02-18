import React, { useState, useEffect, useRef } from 'react';
import styles from './DropdownRow.module.css';
import Bold from './../../assets/bold-01.svg'
import Italics from './../../assets/italics-01.svg'
import Underline from './../../assets/underline-01.svg'
import Typestrike from './../../assets/type-strike-02.svg'
import Dot from './../../assets/more-vertical.svg'

const DropdownRow = ({isOpen, setIsOpen, index, length}) => {
    const dropdownRef = useRef(null);

    const handleItemClick = (item) => {
        console.log(`Выбран элемент: ${item}`);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            event.target.tagName !== 'SELECT' &&
            event.target.tagName !== 'IMG' &&
            event.target.id !== 'dropdownContent' // Игнорировать клики на select элементе
        ) {
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
                <div id='dropdownContent' className={styles.dropdownContent} onClick={(e) => e.stopPropagation()}>
                    <select onClick={(e) => e.stopPropagation()} name="visibility2" value="me" id="visibility">
                        <option id='option' value="me">Заголовок</option>
                        <option id='option' value="team">Что то еще</option>
                    </select>
                    <div className={styles.dropdownContent_vr}></div>
                    <img onClick={(e) => e.stopPropagation()} src={Bold} alt="" />
                    <img onClick={(e) => e.stopPropagation()} src={Italics} alt="" />
                    <img onClick={(e) => e.stopPropagation()} src={Underline} alt="" />
                    <img onClick={(e) => e.stopPropagation()} src={Typestrike} alt="" />
                    <div className={styles.dropdownContent_vr}></div>
                    <img onClick={(e) => e.stopPropagation()} src={Dot} alt="" />
                </div>
            )}
        </div> 
    </>);
};

export default DropdownRow;
