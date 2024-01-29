import React from 'react'
import styles from './Window.module.css'
const Window = (props) => {
  return (
    <div className={styles.window}>
        {props.children}
    </div>
  )
}

export default Window