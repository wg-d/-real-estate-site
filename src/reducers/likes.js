const initialState = {
  likedAdverts: []
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN__USER": {
      return {
        ...state,
        likedAdverts: [...action.user.user.advert_user_likes]
      };
    }
    case "LIKE_ADVERT": {
      return {
        ...state,
        likedAdverts: [...state.likedAdverts, action.liked]
      };
    }
    case "DISLIKE_ADVERT": {
      return {
        ...state,
        likedAdverts: state.likedAdverts.filter(
          advert => advert.id !== action.advertId
        )
      };
    }
    default: {
      return state;
    }
  }
}
