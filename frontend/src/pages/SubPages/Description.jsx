import React from 'react'
import styles from './Description.module.css'
import Rocket from './../../assets/rocket.svg'
import X from './../../assets/x-g.svg';
import DescriptionBody from './components/DescriptionBody';

const Description = () => {
  return (
    <div className={styles.desc}>
        <div className={styles.desc_alert}>
            <img src={Rocket} alt="" />
            <div className={styles.desc_alert_info}>
                <h3>Быстрый старт</h3>
                <h4>Задайте описание и цели проекта. Используйте список, чтобы добавлять необходимые элементы.</h4>
            </div>
            <img src={X} alt="" />
        </div>
        <DescriptionBody/>
    </div>
  )
}

export default Description