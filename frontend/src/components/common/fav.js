import axios from 'axios';
import * as React from 'react';
import './home.css';

const Fav = ({ prop, user, SearchItem, setSearchItem }) => {
  const deletess = () => {
    const id = prop.FoodId;
    const id2 = user._id;
    console.log(prop);
    let abc = { FoodId: id, ManId: id2 };
    axios.post('http://localhost:9002/del', abc).then(res => {
      // console.log(res.data)
      setSearchItem({
        ...SearchItem,
        Fav: res.data
      });
    });
  };

  return (
    <tr>
      <td>{prop.FoodItemName}</td>
      <td>{prop.Price}</td>
      <td>
        <button type='button' class='btn btn-outline-success'>
          {' '}
          <i className='fa fa-shopping-cart'></i>
        </button>
      </td>
      <td>
        <button type='button' class='btn btn-outline-danger' onClick={deletess}>
          <i className='fa fa-close'></i>{' '}
        </button>
      </td>
    </tr>
  );
};

export default Fav;
