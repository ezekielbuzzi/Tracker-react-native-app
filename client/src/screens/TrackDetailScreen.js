import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = () => {
  const { state } = useContext(TrackContext);

  const route = useRoute();
  const { id } = route.params;

  const track = state.find((track) => track._id === id);
  const initialCoords = track.locations[0].coords;
  return (
    <View>
      <Text> {track.name} </Text>
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default TrackDetailScreen;
