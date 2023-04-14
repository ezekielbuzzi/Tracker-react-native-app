import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

import { useNavigation } from "@react-navigation/native";

const AccountScreen = () => {
  const navigation = useNavigation();
  const { state, signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <Text style={styles.header}>AccountScreen</Text>
      <Button title="Sign out" onPress={() => signout(navigation)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
  },
});

export default AccountScreen;
