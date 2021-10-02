import React from 'react';
import Colors from "../constants/Colors";
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
const Home = ({ route, navigation }) => {
  const {token} = route.params;
  let BASE_URL = "http://172.26.34.35:3002"
  const create = async () =>{
    const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      }
    }
    let response = await fetch(BASE_URL + '/room/create', options)
    let json = await response.json()
    if(json.status != "ok"){
        Alert.alert(
          "Error",
          JSON.stringify(json)
        ) // Add more specific error handling
    }
    console.log("creating room")
    console.log(json)
    console.log(json.roomId)
    navigation.navigate('Room', {roomId: json.roomId, token: token})
    return json
  }

  const join = async (roomId) =>{
    const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          roomId
      })
    }
    let response = await fetch(BASE_URL + '/room/' + roomId +'/submit-playlist', options)
    let json = await response.json()
    if(json.status != "ok"){
        Alert.alert(
          "Error",
          JSON.stringify(json)
        ) // Add more specific error handling
    }
    console.log("submitting playlist")
    console.log(json)
    return json
  }

  function handleCreateRoom() {
    create()
  }
  function handleJoinRoom() {

  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        {/* <Image source={require('../assets/Logo1.png')} style={styles.logo} /> */}
        <TouchableOpacity style={[styles.buttons, styles.signupButton]} onPress={handleCreateRoom} on>
          <Text style={[styles.buttonText, styles.loginText]}>Create Room</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttons, styles.signupButton]} onPress={handleJoinRoom}>
          <Text style={[styles.buttonText, styles.signupText]}>Join Room</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.red,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
    alignItems: 'center'
  },

  body: {
    alignItems: 'center',
    marginBottom: '17.4%',
    marginTop: "0%",
    maxHeight: 1000,
    maxWidth: 600

  },
  logo: {
    resizeMode: 'contain',
    maxHeight: Dimensions.get('screen').height * .5,
    maxWidth: Dimensions.get('screen').width * .5,
  },
  buttons: {
    width: 185,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 16.5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  loginButton: {
    backgroundColor: Colors.white,
    marginBottom: '9.75%'

  },
  signupButton: {
    backgroundColor: Colors.white,
    marginBottom: '9.75%'
  },
  loginText: {
    color: Colors.black
  },
  signupText: {
    color: Colors.black
  }
})
export default Home