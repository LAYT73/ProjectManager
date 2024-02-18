import React, {useEffect, useState, useRef} from 'react'
import styles from "./Task.module.css"
import X from "./../../../assets/x.svg"
import Briefcase from './../../../assets/briefcase_w.svg'
import Slash from './../../../assets/slash.svg'
import TaskIcon from './../../../assets/task.svg'
import Calendar from './../../../assets/task/calendar.svg'
import User from './../../../assets/task/user.svg'
import Parrent from './../../../assets/task/parrent.svg'
import Flag from './../../../assets/task/flag.svg'
import Timer from './../../../assets/task/timer.svg'
import File from './../../../assets/task/file-text.svg'
import Avatar from './../../../assets/Avatar.svg'

const Task = ({ isOpen, setIsOpen }) => {
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
    <div className={styles.task}>
        <div className={styles.task_header}>
            <div className={styles.task_header_info}>
                <div className={styles.task_header_info_icon}><img src={Briefcase} alt="" /></div>
                <h4 className={styles.task_header_info_title}>Корпоративный спор</h4>
                <img className={styles.task_header_info_slash} src={Slash} alt="" />
                <div className={styles.task_header_info_icon}><img src={TaskIcon} alt="" /></div>
                <h5 className={styles.task_header_info_task}>#232</h5>
            </div>
            <img className={styles.task_header_close} onClick={()=>setIsOpen(false)} src={X} alt="" />
        </div>
        <div className={styles.task_body}>
            <h1 className={styles.task_body_title}>Создание счета</h1>
            <div className={styles.task_body_statuses}>
                <select name="visibility" value={'me'} id="visibility">
                    <option id='option' value="me">Статус</option>
                    <option id='option' value="team">Моя команда</option>
                </select>
                <select name="visibility" value={'me'}  id="visibility">
                    <option id='option' value="me">Тип</option>
                    <option id='option' value="team">Моя команда</option>
                </select>
                <button className={styles.task_body_statuses_timer}>
                    <img src={Timer} alt="" /><h4>Таймер</h4>
                </button>
            </div>
            <div className={styles.task_body_info}>
                <div className={styles.task_body_info_left}>
                    <div className={styles.task_body_info_left_el}>
                        <img src={Calendar} alt="" />
                        <h4>Дата</h4>
                    </div>
                    <div className={styles.task_body_info_left_el}>
                        <img src={User} alt="" />
                        <h4>Исполнители</h4>
                    </div>
                    <div className={styles.task_body_info_left_el}>
                        <img src={User} alt="" />
                        <h4>Ответственный</h4>
                    </div>
                    <div className={styles.task_body_info_left_el}>
                        <img src={Parrent} alt="" />
                        <h4>Родительский проект</h4>
                    </div>
                    <div className={styles.task_body_info_left_el}>
                        <img src={Flag} alt="" />
                        <h4>Приоритет</h4>
                    </div>
                </div>
                <div className={styles.task_body_info_right}>
                    <div className={styles.task_body_info_right_el}>
                        <img src={Calendar} alt="" />
                        <h4>Дата</h4>
                    </div>
                    <div className={styles.task_body_info_right_avatar}>
                        <img src={Avatar} alt="" />
                    </div>
                    <div className={styles.task_body_info_right_avatar}>
                        <img src={Avatar} alt="" />
                    </div>
                    <div className={styles.task_body_info_right_el}>
                        <img src={File} alt="" />
                        <h4>Проект</h4>
                    </div>
                    <div className={styles.task_body_info_right_el}>
                        <h4>Высокий</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}</div>
  )
}

export default Task