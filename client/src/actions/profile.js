import axios from 'axios';
import {
  GET_PROFILE,
  GET_COMMENTS,
  INIT_PROFILE,
  PROFILE_ERROR,
} from './types';

//Get a user's profile
export const getProfile = (id, skip = 0, sort) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/profiles/${id}?skip=${skip}&sort=${sort}`
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
      skip: skip + res.data.posts.length,
      sort: sort,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get a user's comments
export const getComments = (id, skip = 0, sort) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/profiles/comments/${id}?skip=${skip}&sort=${sort}`
    );

    dispatch({
      type: GET_COMMENTS,
      payload: res.data,
      skip: skip + res.data.comments.length,
      sort: sort,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Initiate profile state
export const initProfile = () => (dispatch) => {
  dispatch({
    type: INIT_PROFILE,
  });
};
