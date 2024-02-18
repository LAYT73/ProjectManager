import React, { useState, useEffect } from 'react';
import styles from './RegistrationPage.module.css';
import Window from '../components/Window';
import { Link } from 'react-router-dom';
import axios from "axios"

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const profile = localStorage.getItem("profile");

  useEffect(()=>{
    if (profile) {
      window.location.href = "http://localhost:5173/main/1/description";
    }
  },[]);

  const handleRegistration = () => {
    if(!checkbox) {
      return
    }
    axios.post(import.meta.env.VITE_API_URL+"auth/registration", {
      email,  
      password,
      phone,
      username
    }).then((res)=>{
      const data = res.data;
      if (data.accessToken) {
        localStorage.setItem("profile", JSON.stringify(data));
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("accessToken", data.accessToken);
        window.location.href = "http://localhost:5173/main/1";
      };
    }).catch((err)=>{
      console.error(err);
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_wind}>
        <Window>
          <h1 className={styles.container_wind_title}>Регистрация</h1>
          <input required value={username} onChange={(e)=>{setUsername(e.target.value)}}  type="text" name="" id="" placeholder='Имя'/>
          <input required value={email} onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder='Почта' />
          <input required value={phone} onChange={(e)=>{setPhone(e.target.value)}}  type="text" placeholder='Телефон'/>
          <input required value={password} onChange={(e)=>{setPassword(e.target.value)}}  type="password" placeholder='Пароль' name="" id="" />
          <label className={styles.container_wind_label}>
            <input type="checkbox" value={checkbox} onChange={(e)=>{setCheckbox(e.target.value)}} name="" id="" />
            Я согласен с условиями обслуживания и политикой конфиденциальности.
          </label>
          <button onClick={()=>{handleRegistration()}} >
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