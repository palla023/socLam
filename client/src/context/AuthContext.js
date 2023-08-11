import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
  user: null || JSON.parse(localStorage.getItem("user")) ,
  isFetching: false,
  error: false,
};
// const INITIAL_STATE = {
//   user: null,
//   isFetching: false,
//   error: false,
// };


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


//Actions => when user Clicks on a Button, It will goes into actions by taking someData like Login Credentials
//Reducer => it will decides which property will update in INTIAL_STATE

//   LoginStart -> will get Login Credentilas like email and pass   Reducer-> will get Fetching True
// LoginSuccess -> will get User Details completely    Reducer-> will get User
// LoginFailure -> wii get Error               Reducer -> Err:True
