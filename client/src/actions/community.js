import axios from 'axios';
import { GET_COMMUNITIES, JOIN_COMMUNITY, COMMUNITY_ERROR } from './types';

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

//Join community
export const joinCommunity = id => async dispatch => {
  try {
    const res = await axios.put(`/api/communities/follow/${id}`);

    dispatch({
      type: JOIN_COMMUNITY,
      payload: { id, followers: res.data }
    });
  } catch (err) {
    dispatch({
      type: COMMUNITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Leave community
export const leaveCommunity = id => async dispatch => {
  try {
    const res = await axios.put(`/api/communities/unfollow/${id}`);

    dispatch({
      type: JOIN_COMMUNITY,
      payload: { id, followers: res.data }
    });
  } catch (err) {
    dispatch({
      type: COMMUNITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
