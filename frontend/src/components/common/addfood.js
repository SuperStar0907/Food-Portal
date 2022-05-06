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
    foodname: '',
    shopname: JSON.parse(localStorage.getItem('user')).shopname,
    vendorname: JSON.parse(localStorage.getItem('user')).managername,
    ratings: '0',
    price: '',
    category: '',
    tags: '',
    description: ''
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
      user.foodname === '' ||
      user.shopname === '' ||
      user.price === '' ||
      user.category === ''
    )) {
      alert(JSON.stringify(user));
    } else {
      localStorage.setItem('food',JSON.stringify(user));
      axios
        .post('/api/food/addfood', user)
        .then(res => alert(res.data.message))
        .catch(error => {
          alert('lol');
        });

      history('/fooddash');
      window.location.reload();
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
                <div className='foodname'>
                  <TextField
                    id='outlined-basic'
                    label='Name of the food item'
                    variant='outlined'
                    name='foodname'
                    onChange={handleChange}
                  />
                </div>
                <div className='price'>
                  <TextField
                    id='outlined-basic'
                    label='Price'
                    variant='outlined'
                    name='price'
                    onChange={handleChange}
                  />
                </div>
              </Stack>
              <Stack spacing={1} direction='row'>
                <div className='description'>
                  <TextField
                    id='outlined-basic'
                    label='description'
                    variant='outlined'
                    name='description'
                    onChange={handleChange}
                  />
                </div>
                <div className='category'>
                  <TextField
                    id='outlined-basic'
                    label='Category'
                    variant='outlined'
                    name='category'
                    onChange={handleChange}
                  />
                </div>
              </Stack>
              <Stack spacing={1} direction='row'>
                <div className='tags'>
                  <TextField
                    id='outlined-basic'
                    label='Tags'
                    variant='outlined'
                    name='tags'
                    onChange={handleChange}
                  />
                </div>
              </Stack>
            </div>
          </Stack>
        </div>
        <br />
        <Button variant='contained' onClick={registers}>
          Add
        </Button>
      </Stack>
    </div>
  );
};

export default Vendor;
