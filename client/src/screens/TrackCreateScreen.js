import { StyleSheet, SafeAreaView } from "react-native";
import { useContext, useEffect, useCallback } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import { Text } from "react-native-elements";
import Map from "../components/Map";
import useLocation from "../hooks/useLocation";
import "../_mockLocation";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = () => {
  const isFocused = useIsFocused();
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);

  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header} h3>
        Create a Track
      </Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : ""}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Wow",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    textAlign: "center",
  },
});

export default TrackCreateScreen;
