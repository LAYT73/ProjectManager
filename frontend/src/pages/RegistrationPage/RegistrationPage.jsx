import React from 'react';
import styles from './RegistrationPage.module.css';
import Window from '../components/Window';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_wind}>
        <Window>
          <h1 className={styles.container_wind_title}>Регистрация</h1>
          <input required type="text" name="" id="" placeholder='Имя'/>
          <input required type="email" placeholder='Почта' />
          <input required type="text" placeholder='Телефон'/>
          <input required type="password" placeholder='Пароль' name="" id="" />
          <label className={styles.container_wind_label}>
            <input type="checkbox" name="" id="" />
            Я согласен с условиями обслуживания и политикой конфиденциальности.
          </label>
          <button>
            Зарегистрироваться
          </button>
          <div className={styles.container_wind_reg}>
            <h4>Уже есть аккаунт?</h4>
            <Link to={"/auth"}>
              Войти
            </Link>
          </div>
        </Window>
      </div>
    </div>
  )
}

export default RegistrationPage