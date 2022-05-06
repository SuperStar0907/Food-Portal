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
  const foods = JSON.parse(localStorage.getItem('food'));
  console.log(foods);
  const [user, setUser] = React.useState({
    foodname: foods.foodname,
    shopname: foods.shopname,
    vendorname: foods.vendorname,
    ratings: foods.ratings,
    price: foods.price,
    category: foods.category,
    tags: foods.tags,
    description: foods.description
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
      user.foodname === '' ||
      user.shopname === '' ||
      user.price === '' ||
      user.category === ''
    ) {
      alert(JSON.stringify(user));
    } else {
      axios
        .post('/api/food/updatefood', user)
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
                    name='name'
                    value={user.foodname}
                    onChange={handleChange}
                  />
                </div>
                <div className='price'>
                  <TextField
                    id='outlined-basic'
                    label='Price'
                    variant='outlined'
                    name='price'
                    value={user.price}
                    onChange={handleChange}
                  />
                </div>
              </Stack>
              <Stack spacing={1} direction='row'>
                <div className='shopname'>
                  <TextField
                    id='outlined-basic'
                    label='Shop Name'
                    variant='outlined'
                    name='shopname'
                    value={user.shopname}
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
                    value={user.tags}
                    onChange={handleChange}
                  />
                </div>
              </Stack>
            </div>
          </Stack>
        </div>
        <br />
        <Button variant='contained' onClick={registers}>
          Edit
        </Button>
      </Stack>
    </div>
  );
};

export default Vendor;
