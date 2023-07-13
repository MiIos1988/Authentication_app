import headerImg from './assets/img/HeaderImage.jpg'
import { Outlet } from "react-router-dom";
import HeaderHomePageComponent from "./components/HeaderHomePageComponent";

function App() {
  const backgroundImage = `url(${headerImg})`;
  return (
    <div className='w-full h-screen bg-cover ' style={{backgroundImage}}>
      <HeaderHomePageComponent/>
      <Outlet/>
    </div>
  );
}

export default App;
