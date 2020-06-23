import {
  GET_COMMUNITIES,
  GET_COMMUNITY,
  JOIN_COMMUNITY,
  GET_SUGGESTIONS,
  COMMUNITY_ERROR,
  INIT_COMMUNITY,
  LIKEorDISLIKE,
} from '../actions/types';

const initialState = {
  communities: [],
  community: { posts: [] },
  autocomplete: [],
  totalPosts: 0,
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
          ...payload.community,
          posts: state.community.posts.concat(payload.community.posts),
        },
        hasMore: payload.community.posts.length > 0,
        totalPosts: payload.postsLength,
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
        community: {
          ...state.community,
          followers: payload.followers,
        },
        loading: false,
      };
    case COMMUNITY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case INIT_COMMUNITY:
      return {
        ...state,
        community: { posts: [] },
        loading: true,
        hasMore: true,
        skip: 0,
      };
    case LIKEorDISLIKE:
      return {
        ...state,
        community: {
          ...state.community,
          posts: state.community.posts.map((post) =>
            post.post._id === payload.id
              ? { ...post, post: { ...post.post, likes: payload.likes } }
              : post
          ),
        },
        loading: false,
      };
    case GET_SUGGESTIONS:
      return {
        ...state,
        autocomplete: payload,
        loading: false,
      };

    default:
      return state;
  }
}
