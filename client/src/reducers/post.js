import {
  ADD_POST,
  POST_ERROR,
  GET_POSTS,
  GET_POST,
  LIKEorDISLIKE,
  ADD_COMMENT,
  LIKE_OR_DISLIKE_COMMENT
} from '../actions/types';
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case LIKEorDISLIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        post: { ...state.post, likes: payload.likes },
        loading: false
      };
    case LIKE_OR_DISLIKE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload
        },
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
