import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LaunchNavigator from './navigators/LaunchNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';

 const App = () => {
  return (
        <AppNavigator/>
  );
}

const AppNavigator = () => {
  let loggedIn = false
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@login_Key')
      if(value !== null) {
        loggedIn = true
      }
    } catch(e) {
      // error reading value
    }
  }
  return(
    <NavigationContainer>
      {loggedIn ? <MainNavigator/> : <LaunchNavigator/>}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
