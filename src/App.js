import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home/Home';
import Purchase from './page/Home/Purchase';
import Login from './page/Login/Login';
import NavBar from './page/Shared/NavBar';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/home/:id' element={<Purchase></Purchase>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
