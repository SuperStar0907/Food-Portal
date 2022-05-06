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
import ls from 'local-storage';
import { useState } from 'react';
const Edit = () => {
  const userp = JSON.parse(localStorage.getItem('user'));
  const [users, setUser] = React.useState({
    role: userp.role,
    managername: userp.managername,
    email: userp.email,
    shopname: userp.shopname,
    mobileno: userp.mobileno,
    opentime: userp.opentime,
    closetime: userp.closetime,
    password: userp.password,
    age: userp.age,
    year: userp.year,
    name: userp.name
  });
  console.log('In Edit: ', userp);
  const history = useNavigate();
  const handleChange = event => {
    const { name, value } = event.target;
    setUser({
      ...users,
      [name]: value
    });
  };
  const edits = () => {
    if (users.role === 'Vendor') {
      if (
        users.role &&
        users.managername &&
        users.email &&
        users.shopname &&
        users.mobileno &&
        users.opentime &&
        users.closetime &&
        users.password
      ) {
        axios
          .post('/api/user/edit', users)
          .then(res => {
            console.log(res.data);
            history('/login');
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert('Invalid Credential');
      }
    } else {
      if (
        users.role &&
        users.name &&
        users.email &&
        users.mobileno &&
        users.year &&
        users.age &&
        users.password
      ) {
        axios
          .post('/api/user/edit', users)
          .then(res => {
            console.log(res.data);
            history('/login');
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert('Invalid Credential');
      }
    }
  };
  if (userp.role === 'Vendor') {
    // console.log(userp.email);
    return (
      <Stack spacing={2}>
        <Stack>
          <TextField
            label='Manager Name'
            variant='outlined'
            name='managername'
            value={users.managername}
            onChange={handleChange}
          />
        </Stack>
        <Stack>
          <TextField
            label='Shop Name'
            variant='outlined'
            name='shopname'
            value={users.shopname}
            onChange={handleChange}
          />
        </Stack>
        <Stack>
          <TextField
            label='Mobile Number'
            variant='outlined'
            name='mobileno'
            value={users.mobileno}
            onChange={handleChange}
          />
        </Stack>
        <Stack>
          <TextField
            label='Opening Time'
            value={users.opentime}
            name='opentime'
            onChange={handleChange}
          />
        </Stack>
        <Stack>
          <TextField
            label='Closing Time'
            value={users.closetime}
            onChange={handleChange}
            name='closetime'
          />
        </Stack>
        <Stack>
          <TextField
            label='password'
            value={users.password}
            onChange={handleChange}
            name='password'
          />
        </Stack>
        <Stack>
          <Button variant='contained' onClick={edits}>
            Save
          </Button>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack spacing={2}>
        <Stack>
          <TextField
            label='Name'
            variant='outlined'
            name='name'
            value={users.name}
            onChange={handleChange}
          />
        </Stack>
        <Stack>
          <TextField
            label='Mobile Number'
            variant='outlined'
            name='mobileno'
            value={users.mobileno}
            onChange={handleChange}
          />
        </Stack>
        <Stack>
          <TextField
            label='Age'
            value={users.age}
            onChange={handleChange}
            name='age'
          />
        </Stack>
        <Stack>
          <TextField
            label='Year'
            value={users.year}
            onChange={handleChange}
            name='year'
          />
        </Stack>
        <Stack>
          <TextField
            label='password'
            value={users.password}
            onChange={handleChange}
            name='password'
          />
        </Stack>
        <Stack>
          <Button variant='contained' onClick={edits}>
            Save
          </Button>
        </Stack>
      </Stack>
    );
  }
};

export default Edit;
