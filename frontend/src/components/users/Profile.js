import { red } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
// import { Card, Container } from '@mui/material';
import './../common/home.css';
import { useNavigate } from 'react-router-dom';
import ls from 'local-storage';
const Card = props => (
  <div className={`card card-${props.size}`}>
    <h4 className='card-header'>{props.header}</h4>
    <div className='card-content'>{props.children}</div>
  </div>
);

// const Button = props => <button>{props.children}</button>;
const Container = props => <div className='container'>{props.children}</div>;

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  marginLeft: '250px',
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[800]
  }
}));

const Home = ({ }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();
  if (user && user.role === 'Buyer') {
    return (
      <Container>
        <Card size='large' header='Buyer'>
          <p>Name : {user.name}</p>
          <p>Email : {user.email}</p>
          <p>Phone : {user.mobileno}</p>
          <p>Age :{user.age}</p>
          <p>Year: :{user.year}</p>
          <br />
          <p>Have a great day</p>
        </Card>
        <br />
        <br />
        <Stack spacing={1} direction='row'>
          <ColorButton
            className='button'
            color='error'
            onClick={() => {
              history('/editt');
            }}
            style={{ marginLeft: '100px' }}
          >
            Edit Details
          </ColorButton>
          <ColorButton
            className='button'
            color='error'
            onClick={() => {
              history('/buyfood');
            }}
            style={{ marginLeft: '100px' }}
          >
            Buyer Food portal
          </ColorButton>
          <ColorButton
            className='button'
            color='error'
            onClick={() => {
              localStorage.removeItem('user');
              history('/login');
            }}
            style={{ marginLeft: '50px' }}
          >
            Logout
          </ColorButton>
        </Stack>
      </Container>
    );
  } else if(user && user.role === 'Vendor') {
    return (
      <Container>
        <Card size='large' header='Vendor'>
          <p>Manager Name : {user.managername}</p>
          <p>Email : {user.email}</p>
          <p>Phone : {user.mobileno}</p>
          <p>shopname : {user.shopname}</p>
          <p>openingtime: :{user.opentime}</p>
          <p>closingtime: :{user.closetime}</p>
          <br />
          <p>Have a great day</p>
        </Card>
        <br />
        <br />
        <Stack spacing={1} direction='row' style={{ alignSelf: 'center' }}>
          <ColorButton
            className='button'
            color='error'
            onClick={() => {
              history('/editt');
            }}
            style={{ marginLeft: '100px' }}
          >
            Edit Details
          </ColorButton>
          <ColorButton
            className='button'
            color='error'
            onClick={() => {
              localStorage.removeItem('user');
              history('/login');
            }}
            style={{ marginLeft: '50px' }}
          >
            Logout
          </ColorButton>
        </Stack>
      </Container>
    );
  }
};

export default Home;
