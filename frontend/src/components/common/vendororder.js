import emailjs from '@emailjs/browser';
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
import { init } from '@emailjs/browser';
emailjs.init('user_uUSjT1CYBzidP2kWahewP');

const UsersList = props => {
  const us = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);
  const history = useNavigate();
  var a = 0;
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
  const fine = user => {
    a = 0;
    for (let i = 0; i < users.length; i++) {
      if (
        (users[i]['status'] === 'Accepted' ||
          users[i]['status'] == 'Preparing') &&
        users[i]['vendorname'] == us.managername
      ) {
        a = a + 1;
      }
      // console.log(users[i]);
    }
    if (a < 10) {
      // alert('10 orders limit reached.');
      console.log(a);
      axios.post('/api/order/accept', user).then(response => {
        console.log(response);
        // console.log(response.data);
      });
      emailjs
        .send('service_pc0dbtc', 'template_rebt9jj', {
          from_name: 'sacdnj',
          to_name: 'dcbj',
          message: 'sjdb'
        })
        .then(response => {
          // window.location.reload();
        });
      // window.location.reload();
    } else {
      alert('cannot exceed the current accepted + preparing order limit of 10');
      // window.location.reload();
    }
  };

  return (
    <div>
      <Grid container>
        <Grid>
          <Paper>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Buyer Name</TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Operation</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <>
                    {user.shopname ===
                      JSON.parse(localStorage.getItem('user')).shopname && (
                      <TableRow key={ind}>
                        <TableCell>{user.buyername}</TableCell>
                        <TableCell>{user.foodname}</TableCell>
                        <TableCell>{user.quantity}</TableCell>
                        <TableCell>{user.price}</TableCell>
                        <TableCell>
                          {user.status == 'Placed' && (
                            <>
                              <Button variant='contained' onClick={fine(user)}>
                                Accept
                              </Button>
                              <Button
                                variant='contained'
                                onClick={() => {
                                  axios
                                    .post(
                                      '/api/order/reject',
                                      user
                                    )
                                    .then(response => {
                                      console.log(response);
                                      // console.log(response.data);
                                    });
                                  const user1 = {
                                    name: user.buyername,
                                    amount: user.total
                                  };
                                  axios
                                    .post(
                                      '/api/user/retmoney',
                                      user1
                                    )
                                    .then(res => {
                                      console.log(res);
                                      // window.location.reload();
                                    })
                                    .catch(error => {
                                      alert('lol');
                                    });
                                  // window.location.reload();
                                }}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                          {(user.status == 'Rejected' ||
                            user.status == 'Ready to pick up' ||
                            user.status == 'Picked Up') && <></>}
                          {user.status !== 'Placed' &&
                            user.status !== 'Rejected' &&
                            user.status !== 'Ready to pick up' &&
                            user.status !== 'Picked Up' && (
                              <>
                                <Button
                                  variant='contained'
                                  onClick={() => {
                                    axios
                                      .post(
                                        '/api/order/nextstage',
                                        user
                                      )
                                      .then(response => {
                                        console.log(response);
                                        // console.log(response.data);
                                      });
                                    // window.location.reload();
                                  }}
                                >
                                  Next Stage
                                </Button>
                              </>
                            )}
                        </TableCell>
                        <TableCell>{user.status}</TableCell>
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
