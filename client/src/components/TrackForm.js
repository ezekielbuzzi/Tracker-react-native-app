import { Input, Button } from "react-native-elements";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const { state, startRecording, stopRecording, changeName } =
    useContext(LocationContext);

  const { name, recording, locations } = state;

  const [saveTrack] = useSaveTrack();

  return (
    <View>
      <Input
        style={styles.input}
        placeholder="Enter track name"
        value={name}
        onChangeText={(name) => changeName(name)}
      />

      {recording ? (
        <TouchableOpacity onPress={stopRecording}>
          <Text style={styles.btn}>Stop Recording</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={startRecording}>
          <Text style={[styles.btn, styles.btnmb]}>Start Recording</Text>
        </TouchableOpacity>
      )}

      {!recording && locations.length ? (
        <TouchableOpacity onPress={saveTrack}>
          <Text style={styles.btn}>Save Recording</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 30,
  },

  btn: {
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "#fff",
    borderRadius: 5,
    backgroundColor: "blue",
    alignSelf: "center",
  },

  btnmb: {
    marginBottom: 10,
  },
});

export default TrackForm;
