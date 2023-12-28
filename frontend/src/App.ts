import headerImg from './assets/img/HeaderImage.jpg'
import { Outlet } from "react-router-dom";
import HeaderHomePageComponent from "./components/HeaderHomePageComponent";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { saveUser } from './redux/userSlicer';
import jwt_decode from 'jwt-decode';

function App() {
  const dispatch = useDispatch();
  
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  const backgroundImage = `url(${headerImg})`;

  axios.interceptors.request.use((config) => {
    if (localStorage.hasOwnProperty("token-acc")) {
      config.headers.Authorization = localStorage.getItem("token-acc")
    }
    return config;
  })

  useEffect(() => {
    if (localStorage.getItem("token-acc")) {
      const token = localStorage.getItem("token-acc");
      if(token) const decodedToken = jwt_decode(token);
      dispatch(saveUser(decodedToken));
    }
  }, []
  )

  return (
    <div className='w-full bg-fixed bg-center bg-no-repeat bg-cover min-h-screen ' style={{ backgroundImage }}>
      <HeaderHomePageComponent />
      <Outlet />
    </div>
  );
}

export default App;
