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

  useEffect(() => {
    if (localStorage.getItem("token-acc")) {
      const token = localStorage.getItem("token-acc");
      const decodedToken = jwt_decode(token);
      dispatch(saveUser(decodedToken));
    }
  }, []
  )

  return (
    <div className='w-full h-screen bg-cover ' style={{ backgroundImage }}>
      <HeaderHomePageComponent />
      <Outlet />
    </div>
  );
}

export default App;
