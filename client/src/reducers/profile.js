import {
  GET_PROFILE,
  PROFILE_ERROR,
  TOP_USER_SORT,
  OLD_COMMENTS_SORT,
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case TOP_USER_SORT:
    case OLD_COMMENTS_SORT:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    default:
      return state;
  }
}
