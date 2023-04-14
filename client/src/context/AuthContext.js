import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_error":
      return { ...state, errMsg: action.payload };

    case "signin":
      return { token: action.payload, errMsg: "" };

    case "clear_err_msg":
      return { ...state, errMsg: "" };

    case "signout":
      return { token: null, errMsg: "" };

    default:
      return state;
  }
};

const tryAutoSignIn = (dispatch) => {
  return async (navigation) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      dispatch({ type: "signin", payload: token });
      navigation.navigate("mainFlow");
    } else {
      navigation.navigate("loginFlow");
    }
  };
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_err_msg" });
  };
};

const signup = (dispatch) => {
  return async (payload, navigation) => {
    try {
      const res = await trackerApi.post("/signup", payload);
      await AsyncStorage.setItem("token", res.data.token);
      dispatch({ type: "signin", payload: res.data.token });
      navigation.navigate("mainFlow");
    } catch (error) {
      dispatch({
        type: "set_error",
        payload: "Something went wrong when signing up",
      });
    }
  };
};

const signin = (dispatch) => {
  return async (payload, navigation) => {
    try {
      const res = await trackerApi.post("/signin", payload);
      await AsyncStorage.setItem("token", res.data.token);
      dispatch({ type: "signin", payload: res.data.token });
      navigation.navigate("mainFlow");
    } catch (error) {
      dispatch({
        type: "set_error",
        payload: "Something went wrong when signing in",
      });
    }
  };
};

const signout = (dispatch) => {
  return async (navigation) => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigation.navigate("Signin");
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryAutoSignIn },
  { token: null, errMsg: "" }
);
