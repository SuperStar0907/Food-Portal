import axios from 'axios';
import * as React from 'react';
import './home.css';
import { useHistory } from 'react-router-dom';

const Item = ({ prop, SearchItem, setSearchItem, user }) => {
  const history = useHistory();
  const add = () => {
    let send = {
      user: user,
      prop: prop
    };
    axios.post('http://localhost:9002/fav', send).then(res => {
      console.log(res.data);
      if (res.data.message === 'Successfully Added') {
        let list = SearchItem.Fav;
        list.push(prop);
        setSearchItem({
          ...SearchItem,
          Fav: list
        });
      }
    });
  };

  const change = () => {
    history.push(`buyer/${prop._id}`);
  };
  return (
    //   <tr>
    //     <td></td>
    //     <td>{prop.FoodItemName}</td>
    //     <td>{prop.Price}</td>
    //     <td>{prop.ShopName}</td>
    //     <td>{prop.VN}</td>
    //     <td>{prop.Rating}</td>
    //     <td><button type="button" class="btn btn-outline-warning"><i className="fa fa-heart"></i> </button></td>
    //     <td><button type="button" class="btn btn-outline-success">Order Now</button></td>
    //   </tr>
    <div
      class='card widdd'
      style={{ textAlign: 'center', marginLeft: 15, marginTop: 15 }}
    >
      <img src='...' class='card-img-top' alt='...' />
      <div class='card-body'>
        <h5 class='card-title'>{prop.FoodItemName}</h5>
        <p class='card-text'>
          <i className='fa fa-rupee'></i>
          {prop.Price}
        </p>
        <button href='#' class='btn btn-primary' onClick={change}>
          More
        </button>
        <button class='btn btn-outline-warning heartbtn' onClick={add}>
          <i className='fa fa-heart'></i>
        </button>
        <button
          class='btn btn-outline-success'
          type='Profile'
          style={{ marginLeft: 10 }}
        >
          {' '}
          <i className='fa fa-shopping-cart'></i>
        </button>
      </div>
    </div>
  );
};

export default Item;
