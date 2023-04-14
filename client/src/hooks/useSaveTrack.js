import { useContext } from "react";
import { Context as Trackcontext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const navigation = useNavigation();

  const {
    state: { locations, name },
    reset,
  } = useContext(LocationContext);
  const { createTrack } = useContext(Trackcontext);

  const saveTrack = async () => {
    await createTrack(name, locations);
    reset();

    navigation.navigate("trackListFlow");
  };

  return [saveTrack];
};
