import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home/Home';
import NavBar from './page/Shared/NavBar';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
      </Routes>
    </div>
  );
}

export default App;
