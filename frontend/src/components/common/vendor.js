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

const Vendor = () => {
  const [user, setUser] = React.useState({
    role: 'Vendor',
    managername: '',
    email: '',
    shopname: 'JC',
    mobileno: '',
    opentime: '',
    closetime: '',
    password: '',
    repassword: ''
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
    if (
      user.role &&
      user.managername &&
      user.email &&
      user.shopname &&
      user.mobileno &&
      user.opentime &&
      user.closetime &&
      user.password === user.repassword
    ) {
      axios
        .post('/api/user/register', user)
        .then(res => alert(res.data.message))
        .catch(error => {
          'lol';
        });
    } else {
      alert('Invalid Credential');
    }
  };

  return (
    <div>
      {/* {console.log(user)} */}
      <Stack spacing={1} direction='column'>
        <div className='Field' style={{ alignSelf: 'center' }}>
          <Stack spacing={1} direction='column'>
            <div>
              <Stack spacing={1} direction='row'>
                <div className='name'>
                  <TextField
                    id='outlined-basic'
                    label='Manager Name'
                    variant='outlined'
                    name='managername'
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
                <div className='shopname'>
                  <TextField
                    id='outlined-basic'
                    label='Shop-Name'
                    variant='outlined'
                    name='shopname'
                    onChange={handleChange}
                  />
                  {/* <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Shop-Name
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      label='Shopname'
                      onChange={handleChange}
                      name='shopname'
                      defaultValue={user.shopname}
                    >
                      <MenuItem value={'JC'}>JC</MenuItem>
                      <MenuItem value={'VC'}>VC</MenuItem>
                      <MenuItem value={'BBC'}>BBC</MenuItem>
                    </Select>
                  </FormControl> */}
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
              <Stack spacing={1} direction='row'>
                <div className='opentime'>
                  <TextField
                    id='outlined-basic'
                    label='Opening Time'
                    variant='outlined'
                    name='opentime'
                    onChange={handleChange}
                  />
                </div>
                <div className='closetime'>
                  <TextField
                    id='outlined-basic'
                    label='Closing Time'
                    variant='outlined'
                    name='closetime'
                    onChange={handleChange}
                  />
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

export default Vendor;
