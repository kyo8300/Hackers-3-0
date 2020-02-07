import axios from 'axios';
import { GET_COMMUNITIES, COMMUNITY_ERROR } from './types';

//Get communities
export const getCommunities = () => async dispatch => {
  try {
    const res = await axios.get('/api/communities/');

    dispatch({
      type: GET_COMMUNITIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMMUNITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
