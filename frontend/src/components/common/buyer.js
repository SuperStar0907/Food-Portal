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
const Buyer = () => {
  const [user, setUser] = React.useState({
    role: 'Buyer',
    name: '',
    email: '',
    age: '',
    mobileno: '',
    year: '',
    password: '',
    repassword: '',
    wallet:0
  });
  const history = useNavigate();
  const handleChange = event => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };
  const registers = () => {
    if (user && (
      user.role &&
      user.name &&
      user.email &&
      user.age &&
      user.mobileno &&
      user.year &&
      user.password === user.repassword
    ) ){
      axios
        .post('/api/user/register', user)
        .then(res => alert(res.data.message));
    } else {
      alert('Invalid Credential');
    }
  };

  return (
    <div>
      {console.log(user)}
      <Stack spacing={1} direction='column'>
        <div className='Field' style={{ alignSelf: 'center' }}>
          <Stack spacing={1} direction='column'>
            <div>
              <Stack spacing={1} direction='row'>
                <div className='name'>
                  <TextField
                    id='outlined-basic'
                    label='name '
                    variant='outlined'
                    name='name'
                    onChange={handleChange}
                  />
                </div>
                <div className='email'>
                  <TextField
                    id='outlined-basic'
                    label='Email-id'
                    variant='outlined'
                    name='email'
                    onChange={handleChange}
                  />
                </div>
              </Stack>
            </div>
            <div>
              <Stack spacing={1} direction='row'>
                <div className='Contact No'>
                  <TextField
                    id='outlined-basic'
                    label='Contact No'
                    variant='outlined'
                    name='mobileno'
                    onChange={handleChange}
                  />
                </div>
                <div className='age'>
                  <TextField
                    id='outlined-basic'
                    label='Age'
                    variant='outlined'
                    name='age'
                    onChange={handleChange}
                  />
                </div>
              </Stack>
            </div>
            <div>
              <Stack spacing={1} direction='row'>
                <div className='Password'>
                  <TextField
                    type='password'
                    id='outlined-basic'
                    label='Password'
                    variant='outlined'
                    name='password'
                    onChange={handleChange}
                  />
                </div>
                <div className='Re-enter Password'>
                  <TextField
                    type='password'
                    id='outlined-basic'
                    label='Re-enter Password'
                    variant='outlined'
                    name='repassword'
                    onChange={handleChange}
                  />
                </div>
              </Stack>
            </div>
            <div>
              <Stack
                spacing={1}
                direction='row'
                style={{ alignSelf: 'center' }}
              >
                <div className='year' style={{ marginLeft: '160px' }}>
                  {/* <TextField
                    id='outlined-basic'
                    label='Year'
                    variant='outlined'
                    name='year'
                    onChange={handleChange}
                  /> */}
                  <FormControl fullWidth>
                    <InputLabel id='hi'>Year</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      label='Year'
                      onChange={handleChange}
                      name='year'
                      defaultValue={'select'}
                    >
                      <MenuItem value={'select'}>select</MenuItem>
                      <MenuItem value={'UG1'}>UG1</MenuItem>
                      <MenuItem value={'UG2'}>UG2</MenuItem>
                      <MenuItem value={'UG3'}>UG3</MenuItem>
                      <MenuItem value={'UG4'}>UG4</MenuItem>
                      <MenuItem value={'UG5'}>UG5</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Stack>
            </div>
          </Stack>
        </div>
        <br />
        <div className='Footer' style={{ alignSelf: 'center' }}>
          <div>
            <Button variant='contained' onClick={registers}>
              Register
            </Button>
          </div>
          <br />
          <div style={{ marginLeft: '40px', fontSize: '28px', color: 'white' }}>
            or
          </div>
          <br />
          <div>
            <Button
              style={{ marginLeft: '15px' }}
              variant='contained'
              onClick={() => {
                history('/login');
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default Buyer;
