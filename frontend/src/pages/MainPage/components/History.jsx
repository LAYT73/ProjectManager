import React, {useEffect, useState, useRef} from 'react'
import styles from "./History.module.css"
import X from "./../../../assets/x.svg"
import Avatar from './../../../assets/Avatar.png'

const History = ({ isOpen, setIsOpen }) => {
    const dropdownRef = useRef(null);
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

  return (<div ref={dropdownRef}>
 {   isOpen && (
    <div className={styles.history}>
        <div className={styles.history_header}>
            <h2 className={styles.history_header_title}>История изменений</h2>
            <img onClick={()=>setIsOpen(false)} src={X} alt="" />
        </div>
        <div className={styles.history_list}>
            <div className={styles.history_list_el}>
                <img src={Avatar} alt="" />
                <div className={styles.history_list_el_content}>
                    <div className={styles.history_list_el_content_header}>
                        <h4 className={styles.history_list_el_content_header_name}>Петрова А.Г.</h4>
                        <h4 className={styles.history_list_el_content_header_date}>02.11.2023 16:01</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}</div>
  )
}

export default History
