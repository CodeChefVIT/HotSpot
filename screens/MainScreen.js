import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Navbar from "../components/Navbar";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

function MainScreen({ navigation }) {
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

    return (
        <View style={styles.container}>
            <Navbar nav={navigation} />
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

export default MainScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: '2%',
        paddingLeft: 20,
        paddingRight: 20,
        height: '100%',
    },
    map: {
        width: '100%',
        height: '75%',
    }
});