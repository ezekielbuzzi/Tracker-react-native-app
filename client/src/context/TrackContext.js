import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const TrackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => {
  return async () => {
    const res = await trackerApi.get("/tracks");

    if (res) {
      dispatch({ type: "fetch_tracks", payload: res.data.tracks });
    }
  };
};

const createTrack = (dispatch) => {
  return async (name, locations) => {
    await trackerApi.post("/tracks", { name, locations });
  };
};

export const { Context, Provider } = createDataContext(
  TrackReducer,
  { fetchTracks, createTrack },
  []
);
//import AsyncStorage from '@react-native-async-storage/async-storage'
