import { View } from "react-native";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";
import { useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      clearErrorMessage();
    }, [])
  );

  return (
    <AuthForm
      text="Sign In for Tracker"
      state={state}
      btnTitle="Sign In"
      onSubmit={signin}
      navigation={navigation}
      route="Signup"
      link="Don't have an account? Sign up instead."
    />
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SigninScreen;
