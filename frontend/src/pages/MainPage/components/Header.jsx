import React from 'react'
import styles from "./Header.module.css";
import Bell from './../../../assets/bell.svg';
import Help from './../../../assets/help-circle.svg';
import User from './../../../assets/user.svg';

const Header = () => {
  return (
    <div className={styles.header}>
        <div className={styles.header_icons}>
            <div className={styles.header_icons_group}>
                <img src={Help} alt="" />
                <img src={Bell} alt="" />
                <img src={User} alt="" />
            </div>
        </div>
        <hr />
    </div>
  )
}

export default Header