import React, { useState, useEffect, useRef } from 'react';
import styles from "./CalendarDropdown.module.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Calendar = ({isOpen, setIsOpen, isUpdate, setIsUpdate}) => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const dropdownRef = useRef(null);
    const { id } = useParams();

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(()=>{
        axios
            .get(import.meta.env.VITE_API_URL+"project/"+id,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    Accept: "application/json",
                },
            }
            )
            .then((res)=>{
                setEndDate(new Date(res.data.statuses.endDate));
                setStartDate(new Date(res.data.statuses.startDate));
            })
            .catch((err)=>{
                console.error(err);
            })

    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const handleSetDate = (date) => {
        if(!startDate) {
            setStartDate(date);
        } else if (startDate && !endDate && (startDate.getTime() < date.getTime())) {
            setEndDate(date)
        } else if (startDate && endDate) {
            setStartDate(date);
            setEndDate(null);
        } else {
            setStartDate(date);
        }
    }

    function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
    }

    useEffect(()=>{
        if (endDate && startDate) {
            let date1 = new Date(startDate);
            let date2 = new Date(endDate);

            // Функция, чтобы добавить ведущий ноль к числам меньше 10
            // Формирование строки в новом формате
            let formattedDate1 = date1.getFullYear() + '-' +
                                pad(date1.getMonth() + 1) + '-' +
                                pad(date1.getDate()) + ' ' +
                                pad(date1.getHours()) + ':' +
                                pad(date1.getMinutes()) + ':' +
                                pad(date1.getSeconds()) + '.' +
                                date1.getMilliseconds();
            let formattedDate2 = date2.getFullYear() + '-' +
                                pad(date2.getMonth() + 1) + '-' +
                                pad(date2.getDate()) + ' ' +
                                pad(date2.getHours()) + ':' +
                                pad(date2.getMinutes()) + ':' +
                                pad(date2.getSeconds()) + '.' +
                                date2.getMilliseconds();
            const body = {
                startDate: formattedDate1,
                endDate: formattedDate2,
                accessToken: localStorage.getItem('accessToken'),
            }
            axios.put(import.meta.env.VITE_API_URL+"project-status/date/"+id, body)
                .then((res)=>{
                    console.log(res);
                    setIsUpdate(!isUpdate);
                }).catch((err)=>{
                    console.error(err);
                })
        }
    }, [endDate, startDate])

    const renderCalendar = () => {
        const totalDays = daysInMonth(year, month);
        const startingDay = firstDayOfMonth(year, month);

        const days = [];
        for (let i = 1; i < startingDay; i++) {
            days.push(<div key={`empty-${i}`} className={styles.day_empty}></div>);
        }

        for (let i = 1; i <= totalDays; i++) {
            const currentDate = new Date(year, month, i);
            days.push(<div onClick={()=>{handleSetDate(currentDate)}} key={i} className={
                startDate && endDate ? 
                    (startDate.getTime() < currentDate.getTime() && currentDate.getTime() < endDate.getTime() ? 
                        styles.day_between : 
                        (currentDate.getTime()==startDate.getTime() || currentDate.getTime() == endDate.getTime()) ? 
                            styles.day_endpoint : styles.day) :
                    (startDate?.getTime()==currentDate.getTime() || endDate?.getTime()==currentDate.getTime() ?
                        styles.day_endpoint :
                        styles.day
                    ) 
                }>{i}</div>);
        }

        return days;
    };

    const goToPreviousMonth = () => {
        setMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
        setYear(prevYear => (month === 0 ? prevYear - 1 : prevYear));
    };

    const goToNextMonth = () => {
        setMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
        setYear(prevYear => (month === 11 ? prevYear + 1 : prevYear));
    };

    return (
    <div ref={dropdownRef} className={styles.calendar}>
        { isOpen && (
        <div className={styles.calendar_content}>
            <div className={styles.header}>
                <button onClick={()=>goToPreviousMonth()}>{"<"}</button>
                <h2>{months[month]} {year}</h2>
                <button onClick={()=>goToNextMonth()}>{">"}</button>
            </div>
            <hr />
            <div className={styles.body}>
                <div className={styles.days}>
                    <div className={styles.day_main}>Пн</div>
                    <div className={styles.day_main}>Вт</div>
                    <div className={styles.day_main}>Ср</div>
                    <div className={styles.day_main}>Чт</div>
                    <div className={styles.day_main}>Пт</div>
                    <div className={styles.day_main}>Сб</div>
                    <div className={styles.day_main}>Вс</div>
                </div>
                <div className={styles.dates}>
                    {renderCalendar()}
                </div>
            </div>
        </div> )
        }   
    </div>
    );
};

export default Calendar;
