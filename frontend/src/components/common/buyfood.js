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
import Fav from './fav';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import fuzzy from 'fuzzy';
import { useNavigate } from 'react-router-dom';
const UsersList = props => {
  const [users, setUsers] = useState([]);
  const [Fav, setFav] = useState([]);
  const history = useNavigate();
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios
      .get('/api/food')
      .then(res => {
        setUsers(res.data);
        setSortedUsers(res.data);
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
  }, []);

  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.price != undefined && b.price != undefined) {
        return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
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

  return (
    <div>
      <Grid container>
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
        <Grid>
          <h1 className='heading' style={{ textAlign: 'center' }}>
            FOOD LIST
          </h1>
          <Paper>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Shop Name</TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>Price</TableCell>
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
                    {fuzzy.test(user.foodname, searchText) || searchText==''(
                      <TableRow key={ind}>
                        <TableCell>{ind + 1}</TableCell>
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
