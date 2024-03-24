import React, { useEffect, useState } from 'react'
import styles from './MainPage.module.css'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Body from './components/Body'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const profile = localStorage.getItem("profile");
  const [activeProject, setActiveProject] = useState(null);
  const [activeProjecIndex, setActiveProjectIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    
    if (!profile) {
      navigate('/auth')
    }
  },[]);

  return (
    <div className={styles.main}>
        <SideBar setActiveProject={setActiveProject} activeProject={activeProject} activeProjecIndex={activeProjecIndex} setActiveProjectIndex={setActiveProjectIndex}></SideBar>
        <div className={styles.main_content}>
            <Header></Header>
            <Body setActiveProject={setActiveProject} activeProject={activeProject}></Body>
        </div>
    </div>
  )
}

export default MainPage