import React, { useState } from 'react'
import styles from './List.module.css'
import Add from './../../assets/list/plus.svg'
import Filter from './../../assets/list/filter.svg'
import Settings from './../../assets/list/settings.svg'
import Sort from './../../assets/list/sort.svg'
import Search from './../../assets/list/search.svg'
import ListBody from './components/ListBody'
import Task from './components/Task'

const List = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleTask = () => {
        setIsOpen(!isOpen)
    }

    return (
    <div className={styles.list}>
        <div className={styles.list_header}>
            <div className={styles.list_header_left}>
                <button onClick={()=>{toggleTask()}} ><img src={Add} alt="" /> <h4>Создать</h4></button>
                <Task isOpen={isOpen} setIsOpen={setIsOpen}/>
                <button><img src={Filter} alt="" /> <h4>Фильтры</h4></button>
            </div>
            <div className={styles.list_header_right}>
                <button><img src={Settings} alt="" /></button>
                <button><img src={Sort} alt="" /> <h4>Сортировка</h4></button>
                <button><img src={Search} alt="" /></button>
            </div>
        </div>
        <ListBody/>
    </div>
    )
}

export default List