import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NetInfo from '@react-native-community/netinfo'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location';
import MainScreen from './screens/MainScreen'
import Info from './screens/Info'

import {InfoContext} from './context/InfoContext'

function App() {
  const [latitude, changeLatitude] = useState("Waiting...")
  const [longitude, changeLongitude] = useState("Waiting...")
  const [carrier, setCarrier] = useState("Getting Carrier....")

  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      changeLatitude("Provide Permission")
      changeLongitude("Provide Permission")
    }

    let options = {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 120000,
      distanceInterval: 0,
    }

    Location.watchPositionAsync(options, (data) => {
      changeLatitude(data.coords.latitude)
      changeLongitude(data.coords.longitude)
      // if(latitude !== "Waiting..." && longitude !== "Waiting..." && carrier !== "Getting Carrier...." ){
      //     var data = {
      //         "ping": 100,
      //         "latitude": latitude,
      //         "longitude": longitude,
      //         "isp": carrier,
      //         "down": 69,
      //         "up": 69
      //     }

      //     let response = fetch(
      //         "https://hotspotsave.herokuapp.com/post/",
      //         {
      //             method: "POST",
      //             headers: {
      //                 "Accept": "application/json",
      //                 "Content-Type": "application/json"
      //             },
      //             body: JSON.stringify(data)
      //         }
      //     ).then(() => console.log(response))

      // }
    })
  }

  const getCarrier = () => {
    NetInfo.fetch().then(data => {
      setCarrier(data.details.carrier)
    })
  }
    
  useEffect(() => {
    getCarrier()
    getLocation()
  })

  let info = {
    latitude: latitude,
    longitude: longitude,
    carrier: carrier,
  }
  

  const Drawer = createDrawerNavigator()
  return (
    <InfoContext.Provider value={info}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" >
          <Drawer.Screen name="Home" component={MainScreen} />
          <Drawer.Screen name="Your Info" component={Info} />
        </Drawer.Navigator>
      </NavigationContainer>
    </InfoContext.Provider>
  )
}

export default App