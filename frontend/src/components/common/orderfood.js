import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
var c = 0;
const Card = props => (
  <div className={`card card-${props.size}`}>
    <h4 className='card-header'>{props.header}</h4>
    <div className='card-content'>{props.children}</div>
  </div>
);

// const Button = props => <button>{props.children}</button>;
const Container = props => <div className='container'>{props.children}</div>;

const Vendor = () => {
  const orderedfood = JSON.parse(localStorage.getItem('buy'));
  const buyerb = JSON.parse(localStorage.getItem('user'));
  var date = new Date();
  // console.log(vendor);
  const [user, setUser] = React.useState({
    buyername: buyerb.name,
    foodname: orderedfood.foodname,
    vendorname: orderedfood.vendorname,
    shopname: orderedfood.shopname,
    price: orderedfood.price,
    category: orderedfood.category,
    total: '0',
    quantity: '0',
    status: 'Placed',
    date: Date.now()
  });

  const history = useNavigate();
  const handleChange = event => {
    const { name, value } = event.target;
    if (name == 'quantity') {
      user.total = value * user.price;
    }
    setUser({
      ...user,
      [name]: value
    });
  };
  const registers = () => {
    if (buyerb.wallet >= +user.total) {
      console.log(orderedfood);
      const buyerr = {
        name: orderedfood.shopname
      };
      axios
        .post('/api/user/ab', buyerr)
        .then(response => {
          localStorage.setItem('time', JSON.stringify(response.data));
          var opening = JSON.parse(localStorage.getItem('time')).opentime;
          var closing = JSON.parse(localStorage.getItem('time')).closetime;
          var dt = new Date();
          console.log(JSON.parse(localStorage.getItem('time')).opentime);
          var startTime = opening + ':00';
          var endTime = closing + ':00';
          console.log(startTime);
          console.log(endTime);

          var s = startTime.split(':');
          var dt1 = new Date(
            dt.getFullYear(),
            dt.getMonth(),
            dt.getDate(),
            parseInt(s[0]),
            parseInt(s[1]),
            parseInt(s[2])
          );

          var e = endTime.split(':');
          var dt2 = new Date(
            dt.getFullYear(),
            dt.getMonth(),
            dt.getDate(),
            parseInt(e[0]),
            parseInt(e[1]),
            parseInt(e[2])
          );
          console.log(dt.getTime(), dt1.getTime(), dt2.getTime());
          c =
            dt.getTime() >= dt1.getTime() && dt.getTime() <= dt2.getTime()
              ? '1'
              : '0';
           if (c == '1') {
             axios
               .post('/api/order/addorder', user)
               .then(res => alert(res.data.message))
               .catch(error => {
                 alert('lol');
               });
             const user1 = {
               email: buyerb.email,
               wallet: buyerb.wallet - +user.total
             };
             axios
               .post('/api/user/addmoney', user1)
               .then(res => {
                 localStorage.setItem('user', JSON.stringify(res.data));
                 console.log(res);
                 // window.location.reload();
               })
               .catch(error => {
                 alert('lol');
               });
             history('/buyfood');
             // window.location.reload();
           } else {
             alert("Sorry, you can't order food now. Please try again later.");
           }
        })
        .catch(error => {
          console.log(error);
        });
     
    } else {
      alert('Insufficient Balance');
    }
  };

  return (
    <Container>
      <Card size='large' header='Food Order'>
        <p>Buyer Name :{user.buyername}</p>
        <p>Food : {user.foodname}</p>
        <p>Shop-Name: {user.shopname}</p>
        <p>Price : {user.price}</p>
        <TextField
          id='outlined-basic'
          label='Quantity'
          variant='outlined'
          name='quantity'
          value={user.quantity}
          onChange={handleChange}
        />
        <p>Total : {user.total}</p>
        <p>Time : {user.date}</p>
        <Button
          variant='contained'
          color='success'
          onClick={registers}
          style={{ margin: '10px' }}
        >
          Order
        </Button>
        <p>Have a great day</p>
      </Card>
    </Container>
  );
};

export default Vendor;
