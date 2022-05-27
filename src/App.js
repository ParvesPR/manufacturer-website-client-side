import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Blogs from './page/Blogs/Blogs';
import BusinessSummary from './page/BusinessSummary/BusinessSummary';
import AddProduct from './page/DashBoard/AddProduct';
import DashBoard from './page/DashBoard/DashBoard';
import ManageOrders from './page/DashBoard/ManageOrders';
import ManageProducts from './page/DashBoard/ManageProducts';
import MyOrders from './page/DashBoard/MyOrders';
import MyProfile from './page/DashBoard/MyProfile';
import MyReview from './page/DashBoard/MyReview';
import Payment from './page/DashBoard/Payment';
import Users from './page/DashBoard/Users';
import Home from './page/Home/Home';
import Purchase from './page/Home/Purchase';
import Login from './page/Login/Login';
import RequireAdmin from './page/Login/RequireAdmin';
import RequireAuth from './page/Login/RequireAuth';
import SignUp from './page/Login/SignUp';
import NotFound from './page/NotFound/NotFound';
import Parts from './page/Parts/Parts';
import Reviews from './page/Reviews/Reviews';
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
        <Route path='/dashboard' element={
          <RequireAuth>
            <DashBoard></DashBoard>
          </RequireAuth>
        }>
          <Route path='myorders' element={<MyOrders></MyOrders>}></Route>
          <Route path='payment/:id' element={<Payment></Payment>}></Route>
          <Route path='users' element={
            <RequireAdmin>
              <Users></Users>
            </RequireAdmin>
          }></Route>
          <Route path='addproduct' element={
            <RequireAdmin>
              <AddProduct></AddProduct>
            </RequireAdmin>
          }></Route>
          <Route path='manageorders' element={
            <RequireAdmin>
              <ManageOrders></ManageOrders>
            </RequireAdmin>
          }></Route>
          <Route path='manageproducts' element={
            <RequireAdmin>
              <ManageProducts></ManageProducts>
            </RequireAdmin>
          }></Route>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='profile' element={<MyProfile></MyProfile>}></Route>
          <Route path='myreview' element={<MyReview></MyReview>}></Route>
        </Route>
        <Route path='/business' element={<BusinessSummary></BusinessSummary>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/reviews' element={<Reviews></Reviews>}></Route>
        <Route path='/blogs' element={<Blogs></Blogs>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Toaster></Toaster>
      <Footer></Footer>
    </div>
  );
}

export default App;
