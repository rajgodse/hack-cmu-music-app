import React, {useState, useEffect} from 'react';
import Colors from "../constants/Colors";
import SpotifyWebApi from "spotify-web-api-js";
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, Dimensions, Alert, FlatList } from 'react-native';
import PlaylistCard from '../components/PlaylistCard';
const Playlists = ({ route, navigation}) => {
  const {roomId, token} = route.params;
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  const [playlists, setPlaylists] = useState({});
  useEffect(() => {
    spotifyApi.getUserPlaylists().then(playlists => {
    //   console.log(playlists)
      setPlaylists(playlists)
    })
  }, [])

//   useEffect(() => {
//     //   console.log((playlists.items)["1"]["description"])
//   }, [playlists])

  const renderPlaylist = ({item}) => {
      return (
        <TouchableOpacity onPress={() => {
                spotifyApi.getPlaylistTracks(item["id"]).then(
                    tracks => {
                        // console.log(Object.keys(tracks['items']))
                        // console.log(tracks)
                        let list = (tracks['items']).map(song => {
                            // console.log(song)
                            return({
                                artist: song['track']['album']['artists'][0].name,
                                id: song['track']['uri']
                            })
                        })
                        console.log(list);
                        submitPlaylist(list)
                        navigation.navigate('Room', {roomId: roomId, token: token})
                      })
            }
            }>
          <PlaylistCard description={item["description"]}/>
        </TouchableOpacity>
      )
  }
  
  let BASE_URL = "http://172.26.34.35:3002"
  const refresh = async () =>{
    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
    }
    console.log(roomId)
    let response = await fetch(BASE_URL + '/room/'+roomId, options)
    let json = await response.json()
    // if(json.status != "ok"){
    //     Alert.alert(
    //       "Error",
    //       JSON.stringify(json)
    //     ) // Add more specific error handling
    // }
    console.log(json)
    return json
  }

  const submitPlaylist = async (playlist) =>{
    const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "playlist":playlist
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
    refresh()
  }
  function handleAddPlaylist() {

  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}> Add a playlist </Text>
        <FlatList
            data={playlists.items}
            renderItem={renderPlaylist}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text style={{textAlign: 'center'}}>You have no playlists</Text>}
            style={{flex: 1}}
          />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    // justifyContent: 'center',
    alignItems: 'center'
  },

  body: {
    alignItems: 'center',
    // marginBottom: '17.4%',
    marginTop: 20,
    maxHeight: 1000,
    maxWidth: 600

  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
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
    backgroundColor: Colors.red,
    marginBottom: '9.75%'

  },
  signupButton: {
    backgroundColor: Colors.red,
    marginBottom: '9.75%'
  },
  loginText: {
    color: Colors.white
  },
  signupText: {
    color: Colors.white
  }
})
export default Playlists