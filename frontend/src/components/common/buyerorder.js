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
      .get('/api/order/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Grid container>
        <Grid>
          <Paper>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Vendor Name</TableCell>
                  <TableCell>Shop Name</TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <>
                    {user && user.buyername ==
                      JSON.parse(localStorage.getItem('user')).name && (
                      <TableRow key={ind}>
                        <TableCell>{user.vendorname}</TableCell>
                        <TableCell>{user.shopname}</TableCell>
                        <TableCell>{user.foodname}</TableCell>
                        <TableCell>{user.quantity}</TableCell>
                        <TableCell>{user.price}</TableCell>
                        <TableCell>
                          {user.status == 'Ready to pick up' && (
                            <>
                              <Button
                                variant='contained'
                                onClick={() => {
                                  console.log(user.buername);
                                  axios
                                    .post(
                                      '/api/order/picked',
                                      user
                                    )
                                    .then(response => {
                                      console.log(response);
                                      // console.log(response.data);
                                    });
                                  window.location.reload();
                                }}
                              >
                                Picked Up
                              </Button>
                            </>
                          )}
                          {user.status !== 'Ready to pick up' && (
                            <>
                          {user.status}
                          </>
                          )}
                        </TableCell>
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
