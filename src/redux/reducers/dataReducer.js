import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  POST_POST,
  SET_POST,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };

    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        let comments = state.post.comments; //  jugaad
        state.post = action.payload;
        state.post.comments = comments; //
      }
      return {
        ...state,
      };

    case DELETE_POST:
      let ind = state.posts.findIndex((post) => post.postId === action.payload);
      state.posts.splice(ind, 1);
      return {
        ...state,
      };

    case POST_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case SUBMIT_COMMENT:
      let newState = {
        ...state,
        post: {
          ...state.post,
          commentCount: state.post.commentCount + 1, // Jugaad
          comments: [action.payload, ...state.post.comments],
        },
      };
      let idx = newState.posts.findIndex((post, i) => {
        if (post.postId === action.payload.postId) return true;
      });
      newState.posts[idx]["commentCount"] += 1;
      return newState;

    case DELETE_COMMENT:
      let i = state.post.comments.findIndex(
        (comment) => comment.commentId === action.payload.commentId
      );
      state.post.comments.splice(i, 1);

      let newState1 = {
        ...state,
        post: {
          ...state.post,
          commentCount: state.post.commentCount - 1, // Jugaad
        },
      };
      let i1 = newState1.posts.findIndex((post, i) => {
        if (post.postId === action.payload.postId) return true;
      });
      newState1.posts[i1]["commentCount"] -= 1;
      return newState1;

    default:
      return state;
  }
}
