import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import styles from './AuthPage.module.css';
import Window from '../components/Window';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import Google from "./../../assets/google.svg";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const profile = localStorage.getItem("profile");
  const navigate = useNavigate();

  useEffect(()=>{
    if (profile) {
      navigate(`/main/${JSON.parse(profile).username}/description`);
    }
  },[]);

  const handleAuth = () => {
    axios.post(import.meta.env.VITE_API_URL+"auth/", {
      email,  
      password,
    }).then((res)=>{
      const data = res.data;
      if (data.accessToken) {
        localStorage.setItem("profile", JSON.stringify(data));
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("accessToken", data.accessToken);
        navigate(`/main/${res.data.username}`);
      }
    }).catch((err)=>{
      console.error(err);
    })
  }

  const fetchProfileData = async (access_token) => {
    try {
      const profileResponse = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
      );
      if (profileResponse.status === 200) {
        const profileData = profileResponse.data;
        console.log(profileData);
        const { name, picture } = profileData;
        return {
          avatar: picture,
          username: name,
        };
      }
    } catch (error) {
      console.error("Failed to fetch user profile data:", error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const res = await fetchProfileData(codeResponse.access_token);
      axios
        .post(import.meta.env.VITE_API_URL+"auth/google", {
          accessToken: codeResponse.access_token,
          username: res.username,
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("profile", JSON.stringify(res.data));
          window.location.reload();
        })
        .catch((error) => {
          console.log("Login Failed:", error);
        });
    },
    onError: (error) => console.log("Login Failed:", error),
  });


  return (
    <div className={styles.container}>
      <div className={styles.container_wind}>
        <Window>
          <h1 className={styles.container_wind_title}>Авторизация</h1>
          <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Почта' />
          <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Пароль' name="" id="" />
          <div className={styles.container_wind_dflex}>
            <Link className={styles.container_wind_dflex_forgot} to={'/forget'}>
              Забыли пароль?
            </Link>
          </div>
          <button onClick={()=>{handleAuth()}}>
            Войти
          </button>
          <div className={styles.container_wind_or}>
            <hr />
            <h5>или</h5>
            <hr />
          </div>
          <button className={styles.container_wind_google} onClick={()=>{handleGoogleLogin()}}>
            <img src={Google} alt="" />
            Войти через
            <strong>Google</strong>
          </button>
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