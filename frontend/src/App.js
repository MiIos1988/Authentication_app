import HomePage from "./pages/HomePage";
import headerImg from './assets/img/HeaderImage.jpg'

function App() {
  const backgroundImage = `url(${headerImg})`;
  return (
    <div className='w-full h-screen bg-cover ' style={{backgroundImage}}>
      <HomePage />
    </div>
  );
}

export default App;
