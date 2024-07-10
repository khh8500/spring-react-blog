export const login = (jwt) => ({ type: "LOGIN", jwt: jwt });
export const logout = () => ({ type: "LOGOUT" });

const initState = {
  isLogin: false,
  jwt: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { isLogin: true, jwt: action.jwt }; // 리턴되는 값이 state로 저장됨
    case "LOGOUT":
      return { isLogin: false, jwt: "" };
    default:
      return state;
  }
};

export default reducer;