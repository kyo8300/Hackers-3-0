import {
  GET_PROFILE,
  GET_COMMENTS,
  INIT_PROFILE,
  PROFILE_ERROR,
} from '../actions/types';

const initialState = {
  profile: { posts: [], comments: [] },
  loading: true,
  hasMore: true,
  hasMoreComments: true,
  skip: 0,
  sort: 1,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: {
          ...payload,
          posts: state.profile.posts.concat(payload.posts),
        },
        hasMore: payload.posts.length > 0,
        skip: action.skip,
        sort: action.sort,
        loading: false,
      };
    case GET_COMMENTS:
      return {
        ...state,
        profile: {
          ...payload,
          comments: state.profile.comments.concat(payload.comments),
        },
        hasMoreComments: payload.comments.length > 0,
        skip: action.skip,
        sort: action.sort,
        loading: false,
      };
    case INIT_PROFILE:
      return {
        ...state,
        profile: { posts: [], comments: [] },
        loading: true,
        hasMore: true,
        hasMoreComments: true,
        skip: 0,
        sort: 1,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
