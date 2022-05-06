import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

import UsersList from './components/users/UsersList';
import Home from './components/common/Home';
import Register from './components/common/Register';
import Navbar from './components/templates/Navbar';
import Profile from './components/users/Profile';
import Login from './components/common/login';
import Edit from './components/common/editt';
import Food from './components/common/fooddash';
import Addfood from './components/common/addfood';
import Editfood from './components/common/editfood';
import Buyfood from './components/common/buyfood';
import Orderfood from './components/common/orderfood';
import Buyerorder from './components/common/buyerorder';
import Vendororder from './components/common/vendororder';
import Stats from './components/common/stats';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  const [user, setUsers] = React.useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            exact
            path='/'
            element={
              user && user._id ? (
                <Home user={user} />
              ) : (
                <Login setUsers={setUsers} />
              )
            }
          />
          <Route path='buyfood' element={<UsersList />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login setUsers={setUsers} />} />
          <Route path='profile' element={<Profile />} />
          <Route path='logout' element={<Login setUsers={setUsers} />} />
          <Route path='editt' element={<Edit />} />
          <Route path='fooddash' element={<Food />} />
          <Route path='addfood' element={<Addfood />} />
          <Route path='editfood' element={<Editfood />} />
          {/* <Route path='buyfood' element={<Buyfood />} /> */}
          <Route path='orderfood' element={<Orderfood />} />
          <Route path='buyerorder' element={<Buyerorder />} />
          <Route path='vendororder' element={<Vendororder />} />
          <Route path='stats' element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
