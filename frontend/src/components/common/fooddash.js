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

import { useNavigate } from 'react-router-dom';
const UsersList = props => {
  const [users, setUsers] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    axios
      .get('/api/food/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  console.log(users);
  const customFunction = event => {
    console.log(event.target.value);
  };
  const add = event => {
    history('/addfood');
  };

  return (
    <div>
      <Grid container>
        <Button variant='contained' onClick={add}>
          Add item
        </Button>
        <Grid>
          <Paper>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Shop Name</TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>category</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Ratings</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <>
                    {user.shopname ===
                      JSON.parse(localStorage.getItem('user')).shopname && 
                      <TableRow key={ind}>
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
                              localStorage.setItem(
                                'food',
                                JSON.stringify(user)
                              );
                              history('/editfood');
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant='contained'
                            onClick={() => {
                              axios
                                .post(
                                  '/api/food/delfood',
                                  user
                                )
                                .then(response => {
                                  alert('Deleted 1\t');
                                  window.location = '/fooddash';
                                  // console.log(response.data);
                                });
                              history('/fooddash');
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    }
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
