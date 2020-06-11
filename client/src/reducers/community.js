import {
  GET_COMMUNITIES,
  GET_COMMUNITY,
  JOIN_COMMUNITY,
  COMMUNITY_ERROR,
  GET_POSTS,
  GET_POST,
  GET_PROFILE,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from '../actions/types';

const initialState = {
  communities: [],
  community: { posts: [] },
  loading: true,
  hasMore: true,
  skip: 0,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMMUNITIES:
      return {
        ...state,
        communities: payload,
        loading: false,
      };
    case GET_COMMUNITY:
      return {
        ...state,
        community: {
          ...payload,
          posts: state.community.posts.concat(payload.posts),
        },
        hasMore: payload.posts.length > 0,
        skip: action.skip,
        loading: false,
      };
    case JOIN_COMMUNITY:
      return {
        ...state,
        communities: state.communities.map((community) =>
          community._id === payload.id
            ? { ...community, followers: payload.followers }
            : community
        ),
        loading: false,
      };
    case COMMUNITY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_POSTS:
    case GET_POST:
    case GET_PROFILE:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        community: { posts: [] },
        loading: true,
        hasMore: true,
        skip: 0,
      };

    default:
      return state;
  }
}
