/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Heart from 'react-animated-heart';
import 'react-toastify/dist/ReactToastify.css';
import {
  PROFILE_KEY,
} from '../constants/AuthConstants';
import showToast, { TOAST_ERROR, TOAST_SUCCESS } from '../utils/toastHelper';

function Fav(props) {
  const {
    place, username, rating, price, activityId, address, city, state, zipCode, yelpUrl,
    imageUrl,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const [activities, setActivities] = useState([]);
  const currentUserProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
  const [isClick, setClick] = useState(false);

  const info = {
    username,
    place,
    rating,
    price,
    activityId,
    address,
    city,
    state,
    zipCode,
    yelpUrl,
    imageUrl,
  };

  function save(activities) {
    console.log(activities);
    try {
      fetch('/add_to_favorites', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(
          activities,
          currentUserProfile,
        ),
      }).then((response) => response.json()).then((data) => {
        if (data.message === true) {
          showToast('Activity already saved', TOAST_ERROR);
        } else {
          showToast('Activity saved successfully!', TOAST_SUCCESS);
        }
      });
    } catch (e) {
      alert('sorry');
    }
  }

  function handleClick() {
    setActivities(info);
    save(info);
    setClick(!isClick);
  }

  console.log(activities);
  return (
    <Heart width="30" height="30" isClick={isClick} onClick={() => handleClick()} />
  );
}

Fav.propTypes = {
  place: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,

};

export default Fav;
