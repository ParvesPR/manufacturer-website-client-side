import { Route, Routes } from 'react-router-dom';
import './App.css';
import BusinessSummary from './page/BusinessSummary/BusinessSummary';
import Home from './page/Home/Home';
import Purchase from './page/Home/Purchase';
import Login from './page/Login/Login';
import RequireAuth from './page/Login/RequireAuth';
import SignUp from './page/Login/SignUp';
import Parts from './page/Parts/Parts';
import Footer from './page/Shared/Footer';
import NavBar from './page/Shared/NavBar';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/parts' element={<Parts></Parts>}></Route>
        <Route path='/parts/:id' element={
          <RequireAuth>
            <Purchase></Purchase>
          </RequireAuth>
        }></Route>
        <Route path='/business' element={<BusinessSummary></BusinessSummary>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
