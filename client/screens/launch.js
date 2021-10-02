import React, {useState} from "react";
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, Dimensions, Alert } from "react-native";
import Colors from "../constants/Colors";
// import authHandler from "../classes/AuthenticationHandler";
// import { authorize } from 'react-native-app-auth';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import SpotifyWebApi from "spotify-web-api-js";
import { NavigationContainer } from "@react-navigation/native";

const Launch = ({ navigation }) => {
  const [action, setAction] = useState("");
  WebBrowser.maybeCompleteAuthSession();
  const spotifyApi = new SpotifyWebApi();
  let BASE_URL = "http://172.26.34.35:3002"

  // Endpoint
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '332fb01925db4cd089a80122bd97b49c',
      scopes: ['user-read-email', 'user-read-private', 'playlist-read-private'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: 'http'
        }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      spotifyApi.setAccessToken(access_token);
      console.log(access_token)
      spotifyApi.getMe().then(data => { 
        console.log(data)
        if (action == 'signup') {
          signup(data.display_name,data.id,access_token)
        } else if (action == 'login') {
          login(data.id, access_token)
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }, [response]);

  const login = async (username, token) =>{
    const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username":username,
        "token":token
      })
    }
    let response = await fetch(BASE_URL + '/login', options)
    let json = await response.json()
    if(json.status != "ok"){
        Alert.alert(
          "Error",
          JSON.stringify(json)
        ) // Add more specific error handling
    }
    navigation.navigate("Home", {token: token})
    return json
  }

  const exchange = async (code) => {
    let options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        'grant_type': "authorization_code",
        'code': code,
        'redirect_uri': "exp://172.26.34.35:19000",
        'client_id': "332fb01925db4cd089a80122bd97b49c",
        'client_secret': "6bd4cdb040414fc4a1b529c40e75b1be"
      }
    }
    let response = await fetch('https://accounts.spotify.com/api/token', options)
    console.log(JSON.stringify(response))
  }

  const signup = async (name, username, token) =>{
    let names = name.split(' ')
    let first = names.shift()
    let last = names.join('')
    // console.log(first)
    // console.log(last)
    // console.log(username)
    // const userData = await getUserData(input)
    // console.log(JSON.stringify(userData))
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "first":first,
          "last":last,
          "username":username,
          "token": token
        })
    }
    console.log(options)
    let response = await fetch(BASE_URL + '/signup', options)
    let json = await response.json()
    if(json.status != "ok"){
        Alert.alert(
          "Error",
          JSON.stringify(json)
        ) // Add more specific error handling
    }
    navigation.navigate("Home", {token: token})
    return json
  }

  const getUserData = async (input) =>{
  
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+input
        },
    }
    const response = await fetch('https://api.spotify.com/v1/me', options)
    // console.log(response)
    // if(json.status != "ok"){
    //     Alert.alert(
    //       "Error",
    //       JSON.stringify(json)
    //     ) // Add more specific error handling
    // }
    return response
  }

  const handleLogInPress = async () => {
    setAction("login");
    promptAsync();    
  }

  const handleSignUpPress = () => {
    setAction("signup");
    promptAsync();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Image source={require('../assets/Logo1.png')} style={styles.logo} />
        <TouchableOpacity style={[styles.buttons, styles.loginButton]} onPress={handleLogInPress} on>
          <Text style={[styles.buttonText, styles.loginText]}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttons, styles.signupButton]} onPress={handleSignUpPress}>
          <Text style={[styles.buttonText, styles.signupText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
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
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 16.5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  loginButton: {
    backgroundColor: Colors.white,
    marginBottom: '9.75%'

  },
  signupButton: {
    borderWidth: 2,
    borderColor: Colors.lightGray
  },
  loginText: {
    color: Colors.black
  },
  signupText: {
    color: Colors.white
  }


})
export default Launch;
