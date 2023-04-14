import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";

const AuthForm = ({
  text,
  state,
  btnTitle,
  onSubmit,
  navigation,
  route,
  link,
}) => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = signupData;

  useFocusEffect(
    useCallback(() => {
      setSignupData({ email: "", password: "" });
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header} h4>
        {text}
      </Text>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        label="Email"
        onChangeText={(email) => setSignupData((prev) => ({ ...prev, email }))}
        value={email}
      />
      <Input
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        label="Password"
        onChangeText={(password) =>
          setSignupData((prev) => ({ ...prev, password }))
        }
        value={password}
      />

      {state.errMsg ? <Text style={styles.error}> {state.errMsg} </Text> : null}

      <Button
        title={btnTitle}
        onPress={() => onSubmit(signupData, navigation)}
      />

      <TouchableOpacity onPress={() => navigation.navigate(route)}>
        <Text style={styles.lin}>{link}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    marginBottom: 30,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 300,
  },

  error: {
    marginBottom: 10,
    color: "red",
  },

  lin: {
    marginTop: 10,
    color: "blue",
  },
});

export default AuthForm;
