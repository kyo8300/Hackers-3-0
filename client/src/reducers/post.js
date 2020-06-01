import {
  ADD_POST,
  POST_ERROR,
  GET_POSTS,
  GET_POST,
  LIKEorDISLIKE,
  ADD_COMMENT,
  LIKE_OR_DISLIKE_COMMENT,
  GET_PROFILE,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  GET_COMMUNITY,
} from '../actions/types';
const initialState = {
  posts: [],
  post: null,
  loading: true,
  hasMore: true,
  skip: 0,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        posts: [],
        hasMore: true,
        skip: 0,
        post: payload,
        loading: false,
      };
    case GET_PROFILE:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case GET_COMMUNITY:
      return {
        ...state,
        posts: [],
        hasMore: true,
        skip: 0,
        loading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: state.posts.concat(payload),
        loading: false,
        hasMore: payload.length > 0,
        skip: action.skip,
      };
    case LIKEorDISLIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        post: { ...state.post, likes: payload.likes },
        loading: false,
      };
    case LIKE_OR_DISLIKE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload,
        },
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        hasMore: false,
        loading: false,
      };
    default:
      return state;
  }
}
