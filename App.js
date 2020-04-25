import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NetInfo from '@react-native-community/netinfo'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location';
import MainScreen from './screens/MainScreen'
import Info from './screens/Info'
import Settings from './screens/Settings'

import {InfoContext} from './context/InfoContext'

function App() {
  const [latitude, changeLatitude] = useState("Waiting...")
  const [longitude, changeLongitude] = useState("Waiting...")
  const [altitude, changeAltitude] = useState("Waiting...")
  const [locationPermission, changeLocPerm] = useState("Waiting...")
  const [carrier, setCarrier] = useState("Getting Carrier....")
  const [upSpeed, setUpSpeed] = useState("Waiting...")
  const [downSpeed, setDownSpeed] = useState("Waiting...")
  const [ping, setPing] = useState("Waiting....")

  const getLocation = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION)
    changeLocPerm(status)

    if (status !== 'granted') {
      changeLatitude("Provide Permission")
      changeLongitude("Provide Permission")
      changeAltitude("Provide Permission")
    }

    let options = {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 120000,
      distanceInterval: 0,
    }

    Location.watchPositionAsync(options, (data) => {
      changeLatitude(data.coords.latitude)
      changeLongitude(data.coords.longitude)
      changeAltitude(data.coords.altitude)
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

  let speed = 0
  const getDownSpeed = async () => {
    let uri = "https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?crop=entropy&cs=srgb&dl=road-in-city-during-sunset-248159.jpg&fit=crop&fm=jpg&h=3519&w=5279"
    let size = 2059767
    const start = new Date().getTime()

    await fetch(uri, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      }
    }).then(() => {
      const end = new Date().getTime()
      let timeTaken = end-start
 
      speed = (size/1024)/(timeTaken/1000)
    }).then(() => {
      setDownSpeed(speed.toFixed(3))
      setTimeout(() => {
        getDownSpeed()
      }, 120000)
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
    getDownSpeed()
  }, [])

  let info = {
    latitude: latitude,
    longitude: longitude,
    altitude: altitude,
    locPerm: locationPermission,
    carrier: carrier,
    upSpeed: upSpeed,
    downSpeed: downSpeed,
    ping: ping
  }
  

  const Drawer = createDrawerNavigator()
  return (
    <InfoContext.Provider value={info}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" >
          <Drawer.Screen name="Home" component={MainScreen} />
          <Drawer.Screen name="Your Info" component={Info} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>
    </InfoContext.Provider>
  )
}

export default App