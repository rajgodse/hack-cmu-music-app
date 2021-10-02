import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import Launch from '../screens/launch'
import Home from '../screens/home'
import Room from "../screens/room";
import MainNavigator from './MainNavigator'
import {useSelector} from "react-redux"
import Playlists from "../screens/playlists";

const LaunchNavigator = () => {
  const LaunchStack = createStackNavigator();
  // const loggedIn = useSelector((state) => state.loggedIn);
  // if (loggedIn) {
  //   // return (
  //   //   // <MainNavigator />
      
  //   // )
  // }
  return (
    <LaunchStack.Navigator 
      screenOptions={{
        headerShown:false,
      }}>
      <LaunchStack.Screen
        name = "Launch"
        component = {Launch}
      />
      <LaunchStack.Screen
        name = "Home"
        component = {Home}
      />
      <LaunchStack.Screen
        name = "Room"
        component = {Room}
      />
      <LaunchStack.Screen
        name = "Playlists"
        component = {Playlists}
      />
      {/* <LaunchStack.Screen
        name = "Main Navigator"
        component = {MainNavigator}
      /> */}
    </LaunchStack.Navigator>
  )
}
export default LaunchNavigator