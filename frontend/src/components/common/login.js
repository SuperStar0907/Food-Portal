import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './login.css';
import axios from 'axios';
import ls from 'local-storage';

import { useNavigate } from 'react-router-dom';

const Login = ({ setUsers }) => {
  const [user, setUser] = React.useState({
    email: '',
    password: ''
  });
  const history = useNavigate();
  const handleChange = event => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const login = () => {
    // console.log(user);
    if (user && user.email && user.password) {
      axios.post('/api/user/login', user).then(res => {
        if (res.data.message !== undefined) alert(res.data.message);
        else {
          const idPass = res.data.user.password;
          if (user.password === idPass) {
            console.log('hi');
            setUsers(res.data.user);
            // ls.set('user', res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            history('/');
          } else {
            alert('Incorrect Password');
          }
        }
      });
    } else {
      console.log('hi');
      alert('Invalid Credential');
    }
  };

  return (
    <div className='main '>
      {/* {console.log(age)} */}
      <div
        className='main-box shadow p-3 mb-5 bg-body rounded'
        style={{ marginLeft: '200px' }}
      >
        <Stack spacing={1} direction='column'>
          <div className='Heading' style={{ marginLeft: '60px' }}>
            <h1>
              <i className='fa fa-user'> Login </i>
            </h1>
          </div>
          <div className='Field'>
            <Stack spacing={1} direction='column'>
              <div className='email'>
                <TextField
                  id='outlined-basic'
                  label='Email-id'
                  variant='outlined'
                  name='email'
                  onChange={handleChange}
                />
              </div>
              <div className='password'>
                <TextField
                  type='password'
                  id='outlined-basic'
                  label='Password'
                  variant='outlined'
                  name='password'
                  onChange={handleChange}
                />
              </div>
            </Stack>
          </div>
          <br />
          <br />
        </Stack>
      </div>
      <div className='Footer' style={{ marginLeft: '200px' }}>
        <div>
          <Button
            variant='contained'
            onClick={login}
            style={{ marginLeft: '60px' }}
          >
            Login
          </Button>
          <p style={{ marginLeft: '85px', fontSize: '28px', color: 'white' }}>
            or
          </p>
          <Button
            variant='contained'
            onClick={() => history('/register')}
            style={{ marginLeft: '50px' }}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
