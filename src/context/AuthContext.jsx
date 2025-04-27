import React, { createContext, useReducer } from "react";
// create new context for login user
const AuthContext = createContext();
// user fake data
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
// initial state
const initialState={
    user:null,
    isLogIn:false
}
// function reducer
function reducer(state,action){
    switch(action.type){
        case "login":
            return {...state,user:action.payload,isLogIn:true}
        case "logOut":
            return {...state,user:null,isLogIn:false}
    }

}
// Auth Provider component
const AuthContextaProvider = ({ children }) => {
    // chek user login function
    function CheckUserLogin(email,password){
        if(email===FAKE_USER.email && password===FAKE_USER.password){
            dispatch({type:"login",payload:FAKE_USER})
        }
    }
    function logout(){
        dispatch({type:"logout"})

        
    }
  const[{user,isLogIn},dispatch]=useReducer(reducer,initialState)
  return <AuthContext.Provider value={{user,isLogIn,CheckUserLogin,logout}}>{children}</AuthContext.Provider>;
};

export { AuthContextaProvider, AuthContext };
