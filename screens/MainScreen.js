import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Navbar from "../components/Navbar";
import MapView from 'react-native-maps';
import {InfoContext} from '../context/InfoContext'
import * as themes from '../components/Themes'

function MainScreen({ navigation }) {
    const {latitude, longitude, carrier, theme} = React.useContext(InfoContext)


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
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021,
                }}
                style={styles.map}
            />
            <Text style={styles.text}>The regions with green have max Signal Strength and the red have the least</Text>
        </View>
    );
}

export default MainScreen