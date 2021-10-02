import React, { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import PickerCheckBox from "react-native-picker-checkbox";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
const Room = ({ route, navigation }) => {
  const { roomId, token } = route.params;
  const [artists, setArtists] = useState([]);

  let BASE_URL = "http://172.26.34.35:3002";
  const refresh = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(roomId);
    let response = await fetch(BASE_URL + "/room/" + roomId, options);
    let json = await response.json();
    console.log(json);
    console.log("flag");
    const ballot = await getBallot();
    console.log(ballot.artists);
    setArtists(ballot.artists);
    return json;
  };
  const getBallot = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await fetch(
      BASE_URL + "/room/" + roomId + "/get-ballot",
      options
    );
    let json = await response.json();
    // console.log(json)
    return json;
  };
  useEffect(() => {
    // setArtists(getBallot())
  }, []);

  function handleCreateRoom() {
    refresh();
  }


  const handleMakePlaylist = async () => {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            method: 'aba',
        }),
      };
      let response = await fetch(
        BASE_URL + "/room/" + roomId + "/create",
        options
      );
      let json = await response.json();
      if (json.status != "ok") {
        Alert.alert("Error", JSON.stringify(json)); // Add more specific error handling
      }
      console.log("creating playlist");
      console.log(json.playlist)
      Alert.alert("Success", "Playlist Created");
      return json
    }

  function handleAddPlaylist() {
    navigation.navigate("Playlists", { roomId: roomId, token: token });
  }

  const handleConfirm = async (pItems) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artistData: pItems.map((artist) => ({
          artist: artist,
          approval: 1,
        })),
      }),
    };
    let response = await fetch(
      BASE_URL + "/room/" + roomId + "/submit-vote",
      options
    );
    let json = await response.json();
    if (json.status != "ok") {
      Alert.alert("Error", JSON.stringify(json)); // Add more specific error handling
    }
    console.log("submitted vote");
  }

  console.log(artists);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        {/* <Image source={require('../assets/Logo1.png')} style={styles.logo} /> */}
        <TouchableOpacity
          style={[styles.buttons, styles.signupButton]}
          onPress={handleCreateRoom}
          on
        >
          <Text style={[styles.buttonText, styles.loginText]}>
            Refresh Room
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, styles.signupButton]}
          onPress={handleAddPlaylist}
        >
          <Text style={[styles.buttonText, styles.signupText]}>
            Add Playlist
          </Text>
        </TouchableOpacity>
        <Text>Vote</Text>
        <PickerCheckBox
          data={artists.map((artist, i) => {
            return {
              itemKey: i.toString(),
              itemDescription: artist,
            };
          })}
          headerComponent={
            <Text style={{ fontSize: 25 }}>Artists you like</Text>
          }
          OnConfirm={(pItems) => handleConfirm(pItems)}
          DescriptionField="itemDescription"
          KeyField="itemKey"
          ConfirmButtonTitle="OK"
          placeholder="select some artists"
          containerStyle={styles.container}
          // arrowColor='#FFD740'
          // arrowSize={100}
          placeholderSelectedItems="$count selected artist(s)"
        />

        <TouchableOpacity
          style={[styles.buttons, styles.signupButton]}
          onPress={handleMakePlaylist}
        >
          <Text style={[styles.buttonText, styles.signupText]}>
            Make Playlist
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    // justifyContent: 'center',
    alignItems: "center",
  },

  body: {
    alignItems: "center",
    marginBottom: "17.4%",
    marginTop: "17.4%",
    maxHeight: 1000,
    maxWidth: 600,
  },
  logo: {
    resizeMode: "contain",
    maxHeight: Dimensions.get("screen").height * 0.5,
    maxWidth: Dimensions.get("screen").width * 0.5,
  },
  buttons: {
    width: 185,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 16.5,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: Colors.red,
    marginBottom: "9.75%",
  },
  signupButton: {
    backgroundColor: Colors.red,
    marginBottom: "9.75%",
  },
  loginText: {
    color: Colors.white,
  },
  signupText: {
    color: Colors.white,
  },
});
export default Room;
