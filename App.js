import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Navbar from "./components/Navbar";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

function App() {
  const [latitude, changeLatitude] = useState("Waiting...")
  const [longitude, changeLongitude] = useState("Waiting...")
  const [carrier, setCarrier] = useState("Getting Carrier....")

  const getLocation = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION)

    if(status !== 'granted') {
      changeLatitude("Provide Permission")
      changeLongitude("Provide Permission")
    }

    let options = {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 5000,
      distanceInterval: 0,
    }

    Location.watchPositionAsync(options, (data) => {
      changeLatitude(data.coords.latitude)
      changeLongitude(data.coords.longitude)
    })
  }

  const getCarrier = () => {
    NetInfo.fetch().then(data => {
      setCarrier(data.details.carrier)
    })
  }

  useEffect(() => {
    getLocation()
    getCarrier()
  })

  return (
    <View style={styles.container}>
      <Navbar />
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
      <Text>Carrier: {carrier}</Text>
      <MapView 
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '1%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  map: {
    width: '100%',
    height: '75%',
  }
});

export default App