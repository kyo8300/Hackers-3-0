import axios from 'axios';
import { setAlert } from './alert';
import {
  POST_ERROR,
  ADD_POST,
  GET_POSTS,
  GET_POST,
  POSTS_SEARCH,
  LIKEorDISLIKE,
  ADD_COMMENT,
  LIKE_OR_DISLIKE_COMMENT,
  INIT_POSTS,
  GET_FOLLOWING_POSTS,
} from './types';

//Add post
export const addPost = ({ title, text, mycommunity }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ title, text, mycommunity });

  try {
    const res = await axios.post('/api/posts', body, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: LIKEorDISLIKE,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Dislike
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: LIKEorDISLIKE,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get a post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/post/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get posts
export const getPosts = (skip = 0, sort) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/?skip=${skip}&sort=${sort}`);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
      skip: skip + res.data.length,
      sort: sort,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get following posts
export const getFollowingPosts = (skip = 0, sort) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/posts/following/home/?skip=${skip}&sort=${sort}`
    );

    dispatch({
      type: GET_FOLLOWING_POSTS,
      payload: res.data,
      skip: skip + res.data.length,
      sort: sort,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Like comment
export const addLikeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/posts/comment/like/${postId}/${commentId}`
    );

    dispatch({
      type: LIKE_OR_DISLIKE_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Dislike comment
export const removeLikeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/posts/comment/dislike/${postId}/${commentId}`
    );

    dispatch({
      type: LIKE_OR_DISLIKE_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get search posts
export const getPostsSearch = (skip = 0) => async (dispatch) => {
  try {
    const q = window.location.search.substring(3);
    const res = await axios.get(`/api/posts/posts/search/?q=${q}&skip=${skip}`);

    dispatch({
      type: POSTS_SEARCH,
      payload: res.data,
      skip: skip + res.data.length,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get search posts
export const initPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: INIT_POSTS,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
