import React from 'react'
import styles from './MainPage.module.css'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Body from './components/Body'

const MainPage = () => {
  return (
    <div className={styles.main}>
        <SideBar></SideBar>
        <div className={styles.main_content}>
            <Header></Header>
            <Body></Body>
        </div>
    </div>
  )
}

export default MainPage