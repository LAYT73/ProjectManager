import React, { useState } from 'react'
import styles from './SideBar.module.css'
import Logo from './../../../assets/logo.svg';
import Plus from './../../../assets/plus.svg';
import Triangle from './../../../assets/triangle.svg';
import Dropdown from '../../components/Dropdown';
import Briefcase from './../../../assets/briefcase.svg';
import Folder from './../../../assets/folder.svg';
import Modal from '../../components/Modal';
import Rocket from '../../../assets/rocket-w.svg'
import Vert from './../../../assets/more-vertical.svg'

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const createFolder = () => {
        console.log("Папка создана");
        setIsOpen(false)
    }

    const toggleModal = () => {
        setIsModalOpen(true);
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
            action: createFolder,
        }
    ]
  return (
    <div className={styles.sidebar}>
        <div className={styles.sidebar_logo}>
            <img src={Logo} className={styles.sidebar_logo_img} alt="" />
            <h2>Untitled UI</h2>
        </div>
        <div className={styles.sidebar_add}>
            <button><img src={Triangle} alt="" /></button>
            <h3>ПРОЕКТЫ</h3>
            <button className={styles.sidebar_add_button} onClick={()=>toggleDropdown()}><img src={Plus} alt="" /></button>
            <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} elems={elems}/>
        </div>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={'Создать проект'}>
            <div className={styles.modalBody}>
                <h5>Название проекта</h5>
                <input placeholder='Корпоративный спор' type="text" name="" id="" />
                <h5>Видимость</h5>
                <input placeholder='Только я' type="text" />
            </div>
            <hr />
            <div className={styles.modalFooter}>
                <div className={styles.modalFooter_buttons}>
                    <button className={styles.modalFooter_buttons_cancel} onClick={()=>handleCancel()}>Отменить</button>
                    <button>Создать</button>
                </div>
            </div>
        </Modal>
        <div className={styles.sidebar_groups}>
            <div className={styles.sidebar_groups_el}>
                <button className={styles.sidebar_groups_el_icon}><img src={Rocket} alt="" /></button>
                <h3>Быстрый старт</h3>
                <button className={styles.sidebar_groups_el_vert}><img src={Vert} alt="" /></button>
            </div>
        </div>
    </div>
  )
}

export default SideBar