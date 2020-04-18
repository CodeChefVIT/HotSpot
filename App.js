import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MainScreen from './screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

function App() {
  const Drawer = createDrawerNavigator()
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MainScreen">
        <Drawer.Screen name="Home" component={MainScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App