import { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import fuzzy from 'fuzzy';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-mui-multiselect-dropdown';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const UsersList = props => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [Fav, setFav] = useState([]);
  const [Vendors, setVendors] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [type, setType] = useState('');
  const buyerr = JSON.parse(localStorage.getItem('user'));
  const [buyer, setBuyer] = useState({
    role: buyerr.role,
    name: buyerr.name,
    email: buyerr.email,
    age: buyerr.age,
    mobileno: buyerr.mobileno,
    year: buyerr.year,
    password: buyerr.password,
    repassword: buyerr.repassword,
    wallet: buyerr.wallet
  });
  const history = useNavigate();
  useEffect(() => {
    axios
      .get('/api/food')
      .then(response => {
        setUsers(response.data);
        setSortedUsers(response.data);
        setSearchText('');
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get('/api/fav')
      .then(response => {
        setFav(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get('/api/user/vendor')
      .then(response => {
        setVendors(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .post('/api/user/aa',buyerr)
      .then(response => {
       localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const changeMin = e => {
    setMin(e.target.value);
  };
  const changeMax = e => {
    setMax(e.target.value);
  };
  const changeType = e => {
    setType(e.target.value);
  };
  const p = [];
  for (let i = 0; i < Vendors.length; i++) {
    p.push(Vendors[i].managername);
  }
  console.log(p);
  const [personName, setPersonName] = useState([]);

  const handleChange = event => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const handleChang = event => {
    const { name, value } = event.target;
    if (name == 'wallet') {
      setBuyer({
        ...buyer,
        [name]: +value + +buyerr.wallet
      });
    }
  };

  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.price != undefined && b.price != undefined) {
        return (1 - flag * 2) * (new Date(a.price) - new Date(b.price));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };

  const customFunction = event => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  }
  return (
    <div>
      <Grid container>
        <Table>
          <TableRow>
            <TableCell>
              <TextField
                id='outlined-basic'
                label='name '
                variant='outlined'
                name='wallet'
                onChange={handleChang}
              />
            </TableCell>
            <TableCell>
              <Button
                variant='contained'
                onClick={() => {
                  console.log(p);
                  console.log(buyerr.wallet);
                  console.log(buyer.wallet);
                  axios
                    .post('/api/user/addmoney', buyer)
                    .then(res => {
                      localStorage.setItem('user', JSON.stringify(buyer));
                      console.log(res);
                      window.location.reload();
                    });
                }}
              >
                Add Money
              </Button>
            </TableCell>
          </TableRow>
        </Table>
        <Grid>
          <List component='nav' aria-label='mailbox folders'>
            <ListItem text>
              <h1>Filters</h1>
              <br />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component='nav' aria-label='mailbox folders'>
            <TextField
              id='standard-basic'
              label='Search'
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={customFunction}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid>
          <List component='nav' aria-label='mailbox folders'>
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  price
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id='standard-basic'
                    label='Enter Min'
                    fullWidth={true}
                    onChange={changeMin}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id='standard-basic'
                    label='Enter Max'
                    fullWidth={true}
                    onChange={changeMax}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                veg-nonveg
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='standard-basic'
                  label='Enter'
                  fullWidth={true}
                  onChange={changeType}
                />
              </Grid>
            </Grid>
            <Divider />
            {/* <ListItem divider>
              <Autocomplete
                id='combo-box-demo'
                options={users}
                getOptionLabel={option => option.vendorname}
                fullWidth
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Select Names'
                    variant='outlined'
                  />
                )}
              />
            </ListItem> */}
          </List>
        </Grid>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id='demo-multiple-checkbox-label'>ShopName</InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {p.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid>
          <h1 className='heading' style={{ textAlign: 'center' }}>
            FOOD ITEMS
          </h1>
          <Paper>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Shop Name</TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>
                    {' '}
                    <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Price
                  </TableCell>
                  <TableCell>category</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Ratings</TableCell>
                  <TableCell>Buy</TableCell>
                  <TableCell>Favourites?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <>
                    {(fuzzy.test(user.foodname, searchText) ||
                      (searchText === '' &&
                        user.price >= min &&
                        user.price <= max) ||
                      (searchText === '' && user.category == type) ||
                      (searchText === '' && min == max && type === '')) && (
                      <TableRow key={ind}>
                        <TableCell>{ind}</TableCell>
                        <TableCell>{user.shopname}</TableCell>
                        <TableCell>{user.foodname}</TableCell>
                        <TableCell>{user.price}</TableCell>
                        <TableCell>{user.category}</TableCell>
                        <TableCell>{user.tags}</TableCell>
                        <TableCell>{user.ratings}</TableCell>
                        <TableCell>
                          <Button
                            variant='contained'
                            onClick={() => {
                              localStorage.setItem('buy', JSON.stringify(user));
                              history('/orderfood');
                            }}
                          >
                            Buy
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant='contained'
                            onClick={() => {
                              axios
                                .post('/api/fav/add', user)
                                .then(response => {
                                  window.location = '/buyfood';
                                });
                            }}
                          >
                            Favourite
                          </Button>
                          <Button
                            variant='contained'
                            onClick={() => {
                              axios
                                .post('/api/fav/delete', user)
                                .then(response => {
                                  window.location = '/buyfood';
                                  // console.log(response.data);
                                });
                            }}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <h1 className='heading' style={{ textAlign: 'center' }}>
            Favorite
          </h1>
          <Paper>
            <Table size='big'>
              <TableHead>
                <TableRow>
                  <TableCell>Food Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Fav.map((user, ind) => (
                  <>
                    {user.buyername ==
                      JSON.parse(localStorage.getItem('user')).buyername && (
                      <TableRow key={ind}>
                        <TableCell>{user.foodname}</TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersList;
