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

const Card = props => (
  <div className={`card card-${props.size}`}>
    <h4 className='card-header'>{props.header}</h4>
    <div className='card-content'>{props.children}</div>
  </div>
);

const UsersList = props => {
  const us = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);
  const history = useNavigate();
  const pp = [];
  const pq = {
    name: '',
    count: 0
  };
  // console.log(pp);
  useEffect(() => {
    axios
      .post('/api/order/stats',us)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  for (var item in users) {
    var hasMatch = false;
    for (var index = 0; index < pp.length; ++index) {
      var animal = pp[index];
      if (animal.name == users[item]['foodname']) {
        hasMatch = true;
        pp[index].count++;
        break;
      }
    }
    if (!hasMatch) {
      pq.count = 1;
      pq.name = users[item]['foodname'];
      pp.push(pq);
    }
  }
  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] < b[prop]) {
        return 1;
      } else if (a[prop] > b[prop]) {
        return -1;
      }
      return 0;
    };
  }
  pp.sort(GetSortOrder('count'));
  return (
    <div className='users-list'>
      <Card size='large' header='Vendor'>
        <p>
          Orders Placed(Rejected not included) :{' '}
          {Object.keys(users).length -
            Object.values(users).filter(
              v => v['status'] == 'Rejected' 
            ).length}
        </p>
        <p>
          Pending Orders :
          {
            Object.values(users).filter(
              v => v['status'] == 'Accepted' || v['status'] == 'Preparing'
            ).length
          }
        </p>
        <p>
          Completed Orders :{' '}
          {
            Object.values(users).filter(
              v =>
                v['status'] == 'Picked Up' || v['status'] == 'Ready to pick up'
            ).length
          }
        </p>
        <br />
        <p>Top 5 items that have been sold</p>
        {pp.map((v, i) =>
          i < 5 ? (
            <p key={i}>
              {v.name} : {v.count}
            </p>
          ) : null
        )}
        <p>Have a great day</p>
      </Card>
    </div>
  );
};

export default UsersList;
