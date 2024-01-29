import React from 'react';
import styles from './AuthPage.module.css';
import Window from '../components/Window';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_wind}>
        <Window>
          <h1 className={styles.container_wind_title}>Авторизация</h1>
          <input type="email" placeholder='Почта' />
          <input type="password" placeholder='Пароль' name="" id="" />
          <div className={styles.container_wind_dflex}>
            <Link className={styles.container_wind_dflex_forgot} to={'/forget'}>
              Забыли пароль?
            </Link>
          </div>
          <button>
            Войти
          </button>
          <div className={styles.container_wind_or}>
            <hr />
            <h5>или</h5>
            <hr />
          </div>
          <div className={styles.container_wind_reg}>
            <h4>Нет аккаунта?</h4>
            <Link to={"/registration"}>
              Зарегистрироваться
            </Link>
          </div>
        </Window>
      </div>
    </div>
  )
}

export default AuthPage