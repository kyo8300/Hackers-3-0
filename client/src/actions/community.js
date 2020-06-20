import axios from 'axios';
import {
  GET_COMMUNITIES,
  JOIN_COMMUNITY,
  COMMUNITY_ERROR,
  GET_COMMUNITY,
  INIT_COMMUNITY,
} from './types';

//Get communities
export const getCommunities = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/communities/');

    dispatch({
      type: GET_COMMUNITIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMUNITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get community
export const getCommunity = (id, skip = 0) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/communities/${id}?skip=${skip}`);

    dispatch({
      type: GET_COMMUNITY,
      payload: res.data,
      skip: skip + res.data.community.posts.length,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: COMMUNITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Initialize community
export const initCommunity = () => async (dispatch) => {
  try {
    dispatch({
      type: INIT_COMMUNITY,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: COMMUNITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Join community
export const joinCommunity = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/communities/follow/${id}`);

    dispatch({
      type: JOIN_COMMUNITY,
      payload: { id, followers: res.data },
    });
  } catch (err) {
    dispatch({
      type: COMMUNITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Leave community
export const leaveCommunity = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/communities/unfollow/${id}`);

    dispatch({
      type: JOIN_COMMUNITY,
      payload: { id, followers: res.data },
    });
  } catch (err) {
    dispatch({
      type: COMMUNITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
