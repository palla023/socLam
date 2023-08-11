const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
      case "LOGOUT":
            return {
                user:localStorage.setItem("user", null),
                isFetching:false,
                error:false
            };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,                  //Take the whole user Properties and will be change the Followings
          followings: [...state.user.followings, action.payload], //...state.user.followings - prev followings destructure
        },
      };
    case "UNFOLLOW":
      return {
        // user: null,
        // isFetching: false,
        // error: true,      ...state means these three 
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
