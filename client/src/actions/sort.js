import axios from 'axios';
import { TOP_USER_SORT, OLD_COMMENTS_SORT, PROFILE_ERROR } from './types';

export const topUserSort = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/topsort/${id}`);
    dispatch({
      type: TOP_USER_SORT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const oldCommentsSort = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/oldcommentssort/${id}`);
    dispatch({
      type: OLD_COMMENTS_SORT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
