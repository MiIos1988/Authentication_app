import headerImg from './assets/img/HeaderImage.jpg'
import { Outlet } from "react-router-dom";
import HeaderHomePageComponent from "./components/HeaderHomePageComponent";
import axios from "axios";
// import dotenv from 'dotenv';
// dotenv.config();

function App() {

axios.defaults.baseURL = "http://localhost:5050/api";
console.log(process.env.REACT_APP_API_BASE_URL)
  const backgroundImage = `url(${headerImg})`;
  return (
    <div className='w-full h-screen bg-cover ' style={{backgroundImage}}>
      <HeaderHomePageComponent/>
      <Outlet/>
    </div>
  );
}

export default App;
