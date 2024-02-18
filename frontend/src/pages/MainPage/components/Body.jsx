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
import Rocket from '../../../assets/rocket-w.svg'
import axios from 'axios';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import Description from '../../SubPages/Description';
import ListPage from '../../SubPages/List';

import History from './History';
import CalendarDropdown from '../../components/CalendarDropdown';

const Body = ({setActiveProject, activeProject}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [project, setProject] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false);

    const { id } = useParams();
    const currentPath = window.location.pathname;
    // Разбиваем путь на части и берем последнюю часть
    const lastPathSegment = "/"+currentPath.split('/').pop();
    const statuses = {
        1: 'Новый',
        2: 'В работе',
        3: 'Отложен',
        4: 'Завершен',
    }
    const priority = {
        1: 'Срочный',
        2: 'Высокий',
        3: 'Средний',
        4: 'Низкий',
        5: 'Незначительный',
    }

    useEffect(()=>{
        if (!activeProject) {
            return
        }
        const accessToken = localStorage.getItem("accessToken");
        axios
            .get(import.meta.env.VITE_API_URL+"project/"+activeProject,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            }
            )
            .then((res)=>{
                console.log(res.data);
                setProject(res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
    },[activeProject, isUpdate])

    const toggleHistory = () => {
        setIsHistoryOpen(!isHistoryOpen);
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdownPriority = () => {
        setIsPriorityOpen(!isPriorityOpen);
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    }

    const changeStatus = (index) => {
        axios.put(import.meta.env.VITE_API_URL+"project-status/status/"+id, {
            accessToken: localStorage.getItem('accessToken'),
            status: index,
        }).then((res)=>{
            console.log(res);
            setIsUpdate(!isUpdate)
        }).catch((error)=>{
            console.error(error);
        })
        setIsOpen(!isOpen)
    }

    const changeStatusPriority = (index) => {
        axios.put('http://localhost:3000/project-status/priority/'+id, {
            accessToken: localStorage.getItem('accessToken'),
            priority: index,
        }).then((res)=>{
            console.log(res);
            setIsUpdate(!isUpdate)
        }).catch((error)=>{
            console.error(error);
        })
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


  return project? (<>
    <div className={styles.body}>
        <div className={styles.body_header}>
            <div className={styles.body_header_info}>
                <div className={styles.body_header_info_brief}><img src={Rocket} alt="" /></div>
                <h1 contentEditable>{project?.title}</h1>
                <Dropdown isUpdate={isUpdate} setIsUpdate={setIsUpdate} isOpen={isOpen} setIsOpen={setIsOpen} elems={elems}/>
                <div onClick={()=>{toggleDropdown()}} className={styles.body_header_info_status}><img src={Dot} alt="" />{statuses[project?.statuses?.status]}</div>
            </div>
            <div className={styles.body_header_action}>
                <button className={styles.body_header_action_low}><img src={Users} alt="" /></button>
                <button onClick={()=>{toggleHistory()}} className={styles.body_header_action_low} ><img src={Clock} alt="" /></button>
                <History isOpen={isHistoryOpen} setIsOpen={setIsHistoryOpen}></History>
            </div>
        </div>
        <div className={styles.body_info}>
            <CalendarDropdown isUpdate={isUpdate} setIsUpdate={setIsUpdate} isOpen={isCalendarOpen} setIsOpen={setIsCalendarOpen}/>
            <div onClick={()=>{toggleCalendar()}} className={styles.body_info_button}><img src={Calendar} alt="" />{
                project?.statuses?.startDate && project?.statuses?.endDate ?
                `${new Date(project?.statuses?.startDate).getDate()}.${new Date(project?.statuses?.startDate).getMonth() + 1}.${new Date(project?.statuses?.startDate).getFullYear()} - ${new Date(project?.statuses?.endDate).getDate()}.${new Date(project?.statuses?.endDate).getMonth() + 1}.${new Date(project?.statuses?.endDate).getFullYear()}`
                :
                'Сроки'
            }</div>
            <Dropdown isUpdate={isUpdate} setIsUpdate={setIsUpdate} isOpen={isPriorityOpen} setIsOpen={setIsPriorityOpen} elems={elemsPriority}/>
            <div onClick={()=>{toggleDropdownPriority()}} className={styles.body_info_button}><img src={Flag} alt="" />{priority[project?.statuses?.priority]}</div>
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
            <Route path='/list/*' element={<ListPage/>}/>
        </Routes>
    </>
  ): <></>
}

export default Body