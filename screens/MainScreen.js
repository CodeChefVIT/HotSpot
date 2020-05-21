import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Navbar from "../components/Navbar";
import MapView, { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import {InfoContext} from '../context/InfoContext'
import * as themes from '../components/Themes'
import {AppLoading} from 'expo'
import { useFonts, Rubik_700Bold } from '@expo-google-fonts/rubik'
import { BalsamiqSans_400Regular } from '@expo-google-fonts/balsamiq-sans'

function MainScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        Rubik_700Bold,
<<<<<<< HEAD
        BalsamiqSans_400Regular
=======
        LobsterTwo_400Regular,
>>>>>>> ab1f0fdaa0ba132eb007c1c2a0004c51c749d3e6
    });
    const {latitude, longitude, altitude,
            carrier, theme, 
            points, changeLevel} = React.useContext(InfoContext)
        
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
            fontSize: 18
        }
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <Navbar nav={navigation} />
                <Text style={[styles.text,{fontFamily: 'Rubik_700Bold'}]}>Showing map for Carrier: {carrier}</Text>
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
                        radius={20}
                        opacity={0.5}
                        gradient={{
                            colors: ['green'],
                            startPoints: [0.01]
                        }} />
                    }
                </MapView>
                <Text style={[styles.text,{fontFamily: 'BalsamiqSans_400Regular'}]}>The regions shown in green have good data strength. Zoom in for more accuracy.</Text>
            </View>
        );
    }
    
}

export default MainScreen