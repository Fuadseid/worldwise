import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialstate = {
  isAuth: false,
  user: null,
};
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function AuthProvider({ children }) {
  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return {
          ...state,
          user: action.payload,
          isAuth: true,
        };
      case "logout":
        return {
          ...state,
          user: null,
          isAuth: false,
        };
    }
  }
  const [{ isAuth, user }, dispatch] = useReducer(reducer, initialstate);
  function login(email, passwors) {
    if (email === FAKE_USER.email && passwors == FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context == undefined)
    throw new Error("Authcontext is used outside from AuthProvider");
}
export { AuthProvider, useAuth };
