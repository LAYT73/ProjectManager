import React, { useEffect, useState } from 'react'
import styles from './ListBody.module.css'
import Add from './../../../assets/plus.svg'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from './Task';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ListBody = () => {
    const [tasks, setTasks] = useState([]);
    const [value, setValue] = useState('');
    const [isDrag, setIsDrag] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();

    const getTasks = () => {
        axios
            .get(import.meta.env.VITE_API_URL+"task/"+id,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    Accept: "application/json",
                },
            }
            )
            .then((res)=>{
                console.log(res.data);
                setTasks(res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
    }

    const createTask = () => {
        axios.post(import.meta.env.VITE_API_URL+"task/"+id, {
            accessToken: localStorage.getItem('accessToken'),
            name: value,
        }).then((res)=>{
            console.log(res.data);
            getTasks();
            setValue('');
        }).catch((error)=>{
            console.error(error);
        })
    }

    const changeChecked = (ident, index) => {
        console.log(tasks[index]);
        axios.put(import.meta.env.VITE_API_URL+"task/"+id+"/"+ident, {
            accessToken: localStorage.getItem('accessToken'),
            checked: !tasks[index].checked,
        }).then((res)=>{
            console.log(res);
            getTasks();
        }).catch((error)=>{
            console.error(error);
        })

    }

    useEffect(()=>{
        getTasks();
    },[])

    const toggleTask = () => {
        setIsOpen(!isOpen)
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragStart = (result) => {
        setIsDrag(true);
    }

    const onDragEnd = (result) => {
        setIsDrag(false);
        // dropped outside the list
        if (!result.destination) {
            return;
        }
    
        const items = reorder(
            tasks,
            result.source.index,
            result.destination.index
        );
        setTasks(
            items
        );
    }
    
  return (<>
    <div className={styles.body}>
        <div className={styles.body_header}>
            <div className={styles.body_header_name}>
                <h4>Имя</h4>
            </div>
            <div className={styles.body_header_start}>
                <h4>Начало</h4>
            </div>
            <div className={styles.body_header_end}>
                <h4>Конец</h4>
            </div>
            <div className={styles.body_header_author}>
                <h4>Автор</h4>
            </div>
            <div className={styles.body_header_status}>
                <h4>Статус</h4>
            </div>
        </div>
        <DragDropContext onDragEnd={(res)=>onDragEnd(res)} onDragStart={(res)=>onDragStart(res)}>
            <Droppable droppableId="droppable3">
            {(provided, snapshot) => (
                <div {...provided.droppableProps}
                ref={provided.innerRef} className={styles.body_tasks}>
                    { tasks.map((el,i)=>{
                        return (
                        <Draggable key={el.id} draggableId={`${el.id}`} index={i}>
                            {(provided, snapshot) => (
                            <div className={styles.body_tasks_element} ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                                <div className={styles.body_tasks_element_name}>
                                    <input value={el.checked} checked={el.checked} onChange={()=>{changeChecked(el.id, i)}} type="checkbox" name="" id="" />
                                    <h3 onClick={()=>{toggleTask()}}>{el.name}</h3>
                                </div>
                                <div className={styles.body_tasks_element_start}></div>
                                <div className={styles.body_tasks_element_end}></div>
                                <div className={styles.body_tasks_element_author}></div>
                                <div className={styles.body_tasks_element_status}></div>
                            </div>)}
                        </Draggable>)
                    })}
                </div>)}
            </Droppable>
        </DragDropContext>
            <div className={!isDrag ? styles.body_tasks_input: styles.body_tasks_input_drag}>
                <img onClick={()=>{createTask()}} src={Add} alt="" />
                <input value={value} onChange={(e)=>{setValue(e.target.value)}} type="text" placeholder='Создать задачу' />
            </div>
            <Task isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
    </>
  )
}

export default ListBody