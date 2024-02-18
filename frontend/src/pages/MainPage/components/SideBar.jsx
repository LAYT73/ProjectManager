import React, { useState, useEffect } from 'react'
import styles from './SideBar.module.css'
import Logo from './../../../assets/logo.svg';
import Plus from './../../../assets/plus.svg';
import Triangle from './../../../assets/triangle.svg';
import Dropdown from '../../components/Dropdown';
import Briefcase from './../../../assets/briefcase.svg';
import Folder from './../../../assets/folder.svg';
import FolderG from './../../../assets/folder-g.svg';
import Modal from '../../components/Modal';
import Rocket from '../../../assets/rocket-w.svg'
import Vert from './../../../assets/more-vertical.svg'
import axios from "axios"
import DownSelect from "./../../../assets/downSelect.svg"
import {useNavigate} from "react-router-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SideBar = ({setActiveProject, activeProject, activeProjecIndex, setActiveProjectIndex}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalFolderOpen, setIsModalFolderOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [folders, setFolders] = useState([]);
    
    const [visibility, setVisibility] = useState("me")
    const [title, setTitle] = useState("");
    const [folderTitle, setFolderTitle] = useState("");
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    const updateProjects = () => {
        const accessToken = localStorage.getItem("accessToken");
        axios
            .get(import.meta.env.VITE_API_URL+"project/",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            }
            )
            .then((res)=>{
                setProjects(res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
        axios
            .get(import.meta.env.VITE_API_URL+"folder/",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            }
            )
            .then((res)=>{
                setFolders(res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
    
        const items = reorder(
            projects,
            result.source.index,
            result.destination.index
        );
    
        setProjects(
            items
        );
    }

    useEffect(()=>{
        const accessToken = localStorage.getItem("accessToken");
        axios
            .get(import.meta.env.VITE_API_URL+"project/",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            }
            )
            .then((res)=>{
                setProjects(res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
        axios
            .get(import.meta.env.VITE_API_URL+"folder/",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            }
            )
            .then((res)=>{
                setFolders(res.data);
            })
            .catch((err)=>{
                console.error(err);
            })

    }, [])

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const createFolder = () => {
        console.log(folderTitle);
        if (!folderTitle) {
            return;
        }
        const accessToken = localStorage.getItem("accessToken");
        axios
            .post(import.meta.env.VITE_API_URL+"folder",{
                accessToken,
                visibility,
                name: folderTitle,
            })
            .then((res)=>{
                console.log(res);
                updateProjects();
                setFolderTitle("");
                setVisibility("me");
                setIsModalFolderOpen(false);
            })
            .catch((err)=>{
                console.error(err);
            })
    }

    const toggleModal = () => {
        setIsModalOpen(true);
        setIsOpen(false);
    }

    const toggleModalFolder = () => {
        setIsModalFolderOpen(true);
        setIsOpen(false);
    }


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const elems = [
        {
            title: "Создать проект",
            picture: Briefcase,
            action: toggleModal,
        },
        {
            title: "Создать папку",
            picture: Folder,
            action: toggleModalFolder,
        }
    ]

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "#F2F4F7" : "",
    });

    const handleChangeActiveProject = (id, index) => {
        setActiveProject(id);
        setActiveProjectIndex(index);
        navigate(`/main/${id}/description`);
    }

    const handleCreateProject = () => {
        if (!title) {
            return;
        }
        const accessToken = localStorage.getItem("accessToken");
        axios
            .post(import.meta.env.VITE_API_URL+"project",{
                accessToken,
                title,
                visibility
            })
            .then((res)=>{
                console.log(res);
                updateProjects();
                setTitle("");
                setVisibility("me");
                setIsModalOpen(false);
            })
            .catch((err)=>{
                console.error(err);
            })
    }

  return (
    <div className={styles.sidebar}>
        <div className={styles.sidebar_logo}>
            <img src={Logo} className={styles.sidebar_logo_img} alt="" />
            <h2>Untitled UI</h2>
        </div>
        <div className={styles.sidebar_add}>
            <button onClick={()=>{setIsActive(!isActive)}}><img className={isActive ? "" : styles.rotate_triangle} src={Triangle} alt="" /></button>
            <h3>ПРОЕКТЫ</h3>
            <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} elems={elems}/>
            <button className={styles.sidebar_add_button} onClick={()=>toggleDropdown()}><img src={Plus} alt="" /></button>
        </div>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={'Создать проект'}>
            <div className={styles.modalBody}>
                <h5>Название проекта</h5>
                <input value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Корпоративный спор' type="text" name="" id="" />
                <h5>Видимость</h5>
                <select name="visibility" value={visibility} onChange={(e)=>{setVisibility(e.target.value)}}  id="visibility">
                    <option id='option' value="me">Только я</option>
                    <option id='option' value="team">Моя команда</option>
                </select>
            </div>
            <hr />
            <div className={styles.modalFooter}>
                <div className={styles.modalFooter_buttons}>
                    <button className={styles.modalFooter_buttons_cancel} onClick={()=>handleCancel()}>Отменить</button>
                    <button onClick={()=>{handleCreateProject()}}>Создать</button>
                </div>
            </div>
        </Modal>
        <Modal isOpen={isModalFolderOpen} setIsOpen={setIsModalFolderOpen} title={'Создать папку'}>
            <div className={styles.modalBody}>
                <h5>Название папки</h5>
                <input value={folderTitle} onChange={(e)=>{setFolderTitle(e.target.value)}} placeholder='Корпоративный спор' type="text" name="" id="" />
                <h5>Видимость</h5>
                <select name="visibility" value={visibility} onChange={(e)=>{setVisibility(e.target.value)}}  id="visibility">
                    <option id='option' value="me">Только я</option>
                    <option id='option' value="team">Моя команда</option>
                </select>
            </div>
            <hr />
            <div className={styles.modalFooter}>
                <div className={styles.modalFooter_buttons}>
                    <button className={styles.modalFooter_buttons_cancel} onClick={()=>handleCancel()}>Отменить</button>
                    <button onClick={()=>{createFolder()}}>Создать</button>
                </div>
            </div>
        </Modal>
        <DragDropContext onDragEnd={(res)=>onDragEnd(res)}>
            <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <div 
                {...provided.droppableProps}
                ref={provided.innerRef} 
                className={styles.sidebar_groups} style={getListStyle(snapshot.isDraggingOver)}> 
                    {
                        isActive && projects.map((el,i)=>{
                            return (
                                <Draggable key={el.id} draggableId={`${el.id}`} index={i}>
                                    {(provided, snapshot) => (
                                    <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps} className={activeProjecIndex !== i ? styles.sidebar_groups_el : styles.sidebar_groups_el_active} onClick={()=>{handleChangeActiveProject(el.id, i)}}>
                                        <button className={styles.sidebar_groups_el_icon}><img src={Rocket} alt="" /></button>
                                            <h3>{el.title}</h3>
                                        <button className={styles.sidebar_groups_el_vert}><img src={Vert} alt="" /></button>
                                    </div> )}
                                </Draggable>
                            )
                        })
                    }
                    {provided.placeholder}
                </div> )}
            </Droppable>
        </DragDropContext>
        <div className={styles.sidebar_folders}>
        {
            folders && 
                folders.map((el, i)=>{
                    return (
                            <div className={styles.sidebar_folders_el}>
                                <div className={styles.sidebar_folders_el_img}>
                                    <img src={FolderG} alt="" />
                                </div>
                                <h3>{el.name}</h3>
                            </div>
                            )
                        })
                        
                    }
        </div>
    </div>
  )
}

export default SideBar