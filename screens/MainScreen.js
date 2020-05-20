import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Navbar from "../components/Navbar";
import MapView, { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import {InfoContext} from '../context/InfoContext'
import * as themes from '../components/Themes'

function MainScreen({ navigation }) {
    const {latitude, longitude, altitude,
            carrier, theme, 
            points, changePoints} = React.useContext(InfoContext)

    const [level, changeLevel] = React.useState(1)
    
    const increaseLevel = () => {
        const newAlt = altitude + 50
        const altDiff = 10
        let newPoints = []

        points.map((point) => {
            let diff = Math.abs(point.altitude - newAlt)
            if(diff <= altDiff) {
                newPoints.push(point)
            }
        })

        changePoints(newPoints)
    }


    const styles = StyleSheet.create({
        container: {
            backgroundColor: themes[theme].background,
            paddingLeft: 20,
            paddingRight: 20,
            height: '100%',
        },
        map: {
            width: '100%',
            height: '75%',
        },
        text: {
            color: themes[theme].text,
        }
    });
    return (
        <View style={styles.container}>
            <Navbar nav={navigation} />
            <Text style={styles.text}>Showing map for Carrier: {carrier}</Text>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021,
                }}
                style={styles.map}
            >
                {points === "Getting Data" ? null: 
                    <Heatmap 
                    points={points}
                    radius={30}
                    opacity={0.7}
                    gradient={{
                        colors: ['green'],
                        startPoints: [1.0]
                    }} />
                }
            </MapView>
            <Text style={styles.text}>The regions shown in green have good data strength. Zoom in for more accuracy.</Text>
        </View>
    );
}

export default MainScreen