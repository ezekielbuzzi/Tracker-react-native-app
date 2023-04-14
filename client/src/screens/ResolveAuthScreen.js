import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const ResolveAuthScreen = () => {
  const { tryAutoSignIn } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    tryAutoSignIn(navigation);
  }, []);

  return null;
};

export default ResolveAuthScreen;
