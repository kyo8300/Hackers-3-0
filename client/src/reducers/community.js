import {
  GET_COMMUNITIES,
  GET_COMMUNITY,
  JOIN_COMMUNITY,
  COMMUNITY_ERROR
} from '../actions/types';

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
    case GET_COMMUNITY:
      return {
        ...state,
        community: payload,
        loading: false
      };
    case JOIN_COMMUNITY:
      return {
        ...state,
        communities: state.communities.map(community =>
          community._id === payload.id
            ? { ...community, followers: payload.followers }
            : community
        ),
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
