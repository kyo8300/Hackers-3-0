import {
  ADD_POST,
  POST_ERROR,
  GET_POSTS,
  GET_POST,
  LIKEorDISLIKE,
  ADD_COMMENT,
  LIKE_OR_DISLIKE_COMMENT,
  POSTS_SEARCH,
  INIT_POSTS,
  GET_FOLLOWING_POSTS,
  DELETE_POST,
  UPDATE_POST,
} from "../actions/types";
const initialState = {
  posts: [],
  post: null,
  loading: true,
  hasMore: true,
  skip: 0,
  sort: 1,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_POST:
      return {
        ...state,
        // posts: [payload, ...state.posts],
        loading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        post: payload,
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
    case INIT_POSTS:
      return {
        ...state,
        posts: [],
        hasMore: true,
        skip: 0,
        sort: 1,
        loading: true,
      };
    case GET_POSTS:
    case POSTS_SEARCH:
    case GET_FOLLOWING_POSTS:
      return {
        ...state,
        posts: state.posts.concat(payload),
        loading: false,
        hasMore: payload.length > 0,
        skip: action.skip,
        sort: action.sort,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
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
