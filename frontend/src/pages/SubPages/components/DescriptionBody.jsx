import React, { useEffect } from 'react'
import styles from './DescriptionBody.module.css'
import Plus from './../../../assets/plus.svg'
import Drag from './../../../assets/Drag.svg'
import { useState } from 'react'
import Text from "./../../../assets/Text.svg"
import Title from "./../../../assets/Title.svg"
import Bullets from "./../../../assets/Bullets.svg"
import Numering from "./../../../assets/Numering.svg"
import DropdownList from '../../components/DropdownList'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DropdownRow from '../../components/Dropdownrow'

const DescriptionBody = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState([]);
  const [isTitleDropdownOpen, setIsTitleDropdownOpen] = useState([])

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
        description,
        result.source.index,
        result.destination.index
    );
    console.log(items);
    setDescription(
        items
    );
  }

  const handlerElems = (id) => {
  }

  const elems = [
    {
        title: "Текстовый блок",
        picture: Text,
        action: handlerElems(1),
    },
    {
        title: "Заголовок",
        picture: Title,
        action: handlerElems(2),
    },
    {
      title: "Буллеты",
      picture: Bullets,
      action: handlerElems(3),
    },
    {
      title: "Нумерация",
      picture: Numering,
      action: handlerElems(4),
    },
  ]

  const [description, setDescription] = useState([
    {
      id: 1,
      type: 'Title',
      subtype: 'H1',
      content: [
        {
          type: 'Text',
          value: 'Текст какой-то1'
        }
      ]
    },
    {
      id: 2,
      type: 'Title',
      subtype: 'H1',
      content: [
        {
          type: 'Text',
          value: 'Текст какой-то2'
        }
      ]
    },
    {
      id: 3,
      type: 'Title',
      subtype: 'H1',
      content: [
        {
          type: 'Text',
          value: 'Текст какой-то3'
        }
      ]
    },
  ])

  useEffect(()=>{
    const array = [];
    for (let index = 0; index < description.length; index++) {
      array[index] = {
        isOpen: false,
      }
    }
    setIsDropdownOpen(array);
    setIsTitleDropdownOpen(array);
  },[description])

  const toggleDropdown = (i) => {
    if (!isDropdownOpen[0]) {
      return
    }
    const component = [...isDropdownOpen];
    const array = [];
    for (let index = 0; index < description.length; index++) {
      array[index] = {
        isOpen: index == i ? !component[i].isOpen : false,
      }
    }
    setIsDropdownOpen(array);
  }

  const toggleTitleDropdown = (i) => {
    console.log(isTitleDropdownOpen);
    if (!isTitleDropdownOpen[0]) {
      return
    }
    const component = [...isTitleDropdownOpen];
    const array = [];
    for (let index = 0; index < description.length; index++) {
      array[index] = {
        isOpen: index == i ? !component[i].isOpen : false,
      }
    }
    console.log(array);
    setIsTitleDropdownOpen(array);
  }


  return (
    <DragDropContext onDragEnd={(res)=>onDragEnd(res)}>
      <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div className={styles.main}
            {...provided.droppableProps}
            ref={provided.innerRef} >
        {
          description &&
          description.map((el,i)=>{
            return (
              <Draggable key={el.id} draggableId={`${el.id}`} index={i}>
                {(provided, snapshot) => (
                  <div className={styles.main_el} ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps} >
                    <DropdownList isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} length={description.length} index={i} elems={elems}/>
                    <button onClick={()=>{toggleDropdown(i)}} className={styles.main_el_button}><img src={Plus} alt="" /></button>
                    <div {...provided.dragHandleProps} {...provided.dragHandleProps}>
                      <div className={styles.main_el_button_drag}>
                        <img src={Drag} alt="" />
                      </div>
                    </div>                    
                    <div className={styles.main_el_content}>
                    { 
                      el.type == 'Title' ?
                        el.subtype == 'H1' ?
                          el.content.map((content,index)=>{
                            if (content.type == 'Text') {
                              return (<>
                                <div className={styles.h1_container} onClick={()=>{toggleTitleDropdown(i)}}>
                                  <h1>{content.value}</h1>
                                <DropdownRow length={description.length} isOpen={isTitleDropdownOpen} setIsOpen={setIsTitleDropdownOpen} index={i}/>
                                </div>
                              </>)
                            }
                          })
                        :
                        <>2</>
                      :
                      <>1</>
                    }
                    </div>
                  </div>)}
                </Draggable>
                )
              })
        }
    </div>)}
    </Droppable>
    </DragDropContext>
  )
}

export default DescriptionBody