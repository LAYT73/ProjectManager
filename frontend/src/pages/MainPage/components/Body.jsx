import React, { useEffect, useState } from 'react'
import styles from './Body.module.css';
import Dropdown from '../../components/Dropdown';
import Briefcase from './../../../assets/briefcase_w.svg';
import Dot from './../../../assets/dot.svg';
import Users from './../../../assets/users.svg';
import Messages from './../../../assets/message-square.svg';
import Clock from './../../../assets/clock.svg';
import Calendar from './../../../assets/calendar.svg';
import Flag from './../../../assets/flag.svg';
import Clipboard from './../../../assets/clipboard.svg';
import List from './../../../assets/list.svg';
import Grid from './../../../assets/grid.svg';
import Bar from './../../../assets/bar-chart.svg';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import Description from '../../SubPages/Description';
import History from './History';
const Body = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const { id } = useParams();
    const currentPath = window.location.pathname;
    // Разбиваем путь на части и берем последнюю часть
    const lastPathSegment = "/"+currentPath.split('/').pop();
    useEffect(()=>{
        console.log(lastPathSegment);
    },[])

    const toggleHistory = () => {
        setIsHistoryOpen(!isHistoryOpen);

    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdownPriority = () => {
        setIsPriorityOpen(!isPriorityOpen);
    };


    const changeStatus = (id) => {
        console.log(id);
        setIsOpen(!isOpen)
    }

    const changeStatusPriority = (id) => {
        console.log(id);
        setIsPriorityOpen(!isPriorityOpen)
    }


    const elems = [
        {
            title: "Новый",
            picture: Dot,
            action: ()=>changeStatus(1),
        },
        {
            title: "В работе",
            picture: Dot,
            action: ()=>changeStatus(2),
        },
        {
            title: "Отложен",
            picture: Dot,
            action: ()=>changeStatus(3),
        },
        {
            title: "Завершен",
            picture: Dot,
            action: ()=>changeStatus(4),
        },
    ]
    const elemsPriority = [
        {
            title: "Срочный",
            picture: Flag,
            action: ()=>changeStatusPriority(1),
        },
        {
            title: "Высокий",
            picture: Flag,
            action: ()=>changeStatusPriority(2),
        },
        {
            title: "Средний",
            picture: Flag,
            action: ()=>changeStatusPriority(3),
        },
        {
            title: "Низкий",
            picture: Flag,
            action: ()=>changeStatusPriority(4),
        },
        {
            title: "Незначительный",
            picture: Flag,
            action: ()=>changeStatusPriority(5),
        },

    ]

  return (<>
    <div className={styles.body}>
        <div className={styles.body_header}>
            <div className={styles.body_header_info}>
                <div className={styles.body_header_info_brief}><img src={Briefcase} alt="" /></div>
                <h1>Заголовок проекта</h1>
                <div onClick={()=>{toggleDropdown()}} className={styles.body_header_info_status}><img src={Dot} alt="" />Новый</div>
                <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} elems={elems}/>
            </div>
            <div className={styles.body_header_action}>
                <button className={styles.body_header_action_low}><img src={Users} alt="" /></button>
                <button className={styles.body_header_action_low}><img src={Messages} alt="" /></button>
                <button onClick={()=>{toggleHistory()}} className={styles.body_header_action_low} ><img src={Clock} alt="" /></button>
                <History isOpen={isHistoryOpen} setIsOpen={setIsHistoryOpen}></History>
                <button className={styles.body_header_action_create}>Создать задачу</button>
            </div>
        </div>
        <div className={styles.body_info}>
            <div className={styles.body_info_button}><img src={Calendar} alt="" />Сроки</div>
            <div onClick={()=>{toggleDropdownPriority()}} className={styles.body_info_button}><img src={Flag} alt="" />Нормальный</div>
            <Dropdown isOpen={isPriorityOpen} setIsOpen={setIsPriorityOpen} elems={elemsPriority}/>
            <div className={styles.body_info_progress}>
                <div className={styles.body_info_progress_bar}></div>
            </div>
            <h4>0 / 0</h4>
        </div>
        <div className={styles.body_nav}>
            <Link to={'/main/'+id+'/description'}>
                <div className={styles.body_nav_el}>
                    <div className={styles.body_nav_el_title}>
                        <img src={Clipboard} alt="" />
                        <h4>Описание</h4>
                    </div>
                    {
                        lastPathSegment == '/description' ?
                        <hr />
                        :
                        <></>
                    }
                </div>
            </Link>
            <Link to={'/main/'+id+'/list'}>
                <div className={styles.body_nav_el}>
                    <div className={styles.body_nav_el_title}>
                        <img src={List} alt="" />
                        <h4>Список</h4>
                    </div>
                    {
                        lastPathSegment == '/list' ?
                        <hr />
                        :
                        <></>
                    }
                </div>
            </Link>
            <Link to={'/main/'+id+'/board'}>
                <div className={styles.body_nav_el}>
                    <div className={styles.body_nav_el_title}>
                        <img src={Grid} alt="" />
                        <h4>Доска</h4>
                    </div>
                    {
                        lastPathSegment == '/board' ?
                        <hr />
                        :
                        <></>
                    }
                </div>
            </Link>
            <Link to={'/main/'+id+'/calendar'}>
                <div className={styles.body_nav_el}>
                    <div className={styles.body_nav_el_title}>
                        <img src={Calendar} alt="" />
                        <h4>Календарь</h4>
                    </div>
                    {
                        lastPathSegment == '/calendar' ?
                        <hr />
                        :
                        <></>
                    }
                </div>
            </Link>
            <Link to={'/main/'+id+'/analytic'}>
                <div className={styles.body_nav_el}>
                    <div className={styles.body_nav_el_title}>
                        <img src={Bar} alt="" />
                        <h4>Аналитика</h4>
                    </div>
                    {
                        lastPathSegment == '/analytic' ?
                        <hr />
                        :
                        <></>
                    }
                </div>
            </Link>
        </div>
    </div>
        <Routes>
            <Route path='/description/*' element={<Description/>}/>
        </Routes>
    </>
  )
}

export default Body