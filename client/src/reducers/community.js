import { GET_COMMUNITIES, COMMUNITY_ERROR } from '../actions/types';

const initialState = {
  communities: [],
  community: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMMUNITIES:
      return {
        ...state,
        communities: payload,
        loading: false
      };
    case COMMUNITY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
