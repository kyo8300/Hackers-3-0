import axios from 'axios';
import { setAlert } from './alert';
import { POST_ERROR, ADD_POST } from './types';

//Add post
export const addPost = ({ title, text }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ title, text });

  try {
    const res = await axios.post('/api/posts', body, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
