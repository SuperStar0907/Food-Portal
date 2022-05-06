import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import './register.css';
import Buyer from './buyer';
import Vendor from './vendor';

import { useNavigate } from 'react-router-dom';

const Register = props => {
  const [user, setUser] = React.useState('');

  const handleChange = event => {
    setUser(event.target.value);
  };
  const history = useNavigate();

  if (user === 'Vendor') {
    return (
      <div className='main'>
        <div className='main-box shadow p-3 mb-5 bg-body rounded'>
          <Stack spacing={1} direction='column'>
            <div className='Heading' style={{ alignSelf: 'center' }}>
              <h1>
                <i className='fa fa-user'> Register </i>
              </h1>
            </div>
            <div className='lable'>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Select</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={user}
                  label='Select'
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value={'Vendor'}>Vendor</MenuItem>
                  <MenuItem value={'Buyer'}>Buyer</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Vendor />
          </Stack>
        </div>
      </div>
    );
  }
  if (user === 'Buyer') {
    return (
      <div className='main '>
        <div className='main-box shadow p-3 mb-5 bg-body rounded'>
          <Stack spacing={1} direction='column'>
            <div className='Heading' style={{ alignSelf: 'center' }}>
              <h1>
                <i className='fa fa-user'> Register </i>
              </h1>
            </div>
            <div className='lable'>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Select</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={user}
                  label='Select'
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value={'Vendor'}>Vendor</MenuItem>
                  <MenuItem value={'Buyer'}>Buyer</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Buyer />
          </Stack>
        </div>
      </div>
    );
  }

  return (
    <div className='main ' style={{ alignSelf: 'center' }}>
      <div className='main-box shadow p-3 mb-5 bg-body rounded'>
        <Stack spacing={1} direction='column'>
          <div className='Heading' style={{ alignSelf: 'center' }}>
            <h1>
              <i className='fa fa-user'> Register </i>
            </h1>
          </div>
          <div className='lable'>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Select</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={user}
                label='Select'
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={'Vendor'}>Vendor</MenuItem>
                <MenuItem value={'Buyer'}>Buyer</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br/>
          <div className='Footer'>
            <div style={{ alignSelf: 'center' }}>
              <Button
                style={{ marginLeft: '260px' }}
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
    </div>
  );
};

export default Register;
