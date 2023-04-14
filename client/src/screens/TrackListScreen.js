import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useContext, useEffect } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { ListItem } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const TrackListScreen = () => {
  const { state, fetchTracks } = useContext(TrackContext);

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchTracks();
    }
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { id: item._id })
              }
            >
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
