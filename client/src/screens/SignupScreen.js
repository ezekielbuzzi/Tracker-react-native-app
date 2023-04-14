import AuthForm from "../components/AuthForm";
import { useContext, useEffect, useCallback } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const SignupScreen = () => {
  const navigation = useNavigation();

  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      clearErrorMessage();
    }, [])
  );

  return (
    <AuthForm
      text="Sign Up for Tracker"
      state={state}
      btnTitle="Sign Up"
      onSubmit={signup}
      navigation={navigation}
      route="Signin"
      link="Already have an account? Sign in instead."
    />
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignupScreen;
