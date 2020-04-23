import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from "../components/Navbar";
import MapView from 'react-native-maps';
import {InfoContext} from '../context/InfoContext'

function MainScreen({ navigation }) {
    const {latitude, longitude, carrier} = React.useContext(InfoContext)
    return (
        <View style={styles.container}>
            <Navbar nav={navigation} />
            <Text>Showing map for Carrier: {carrier}</Text>
            <MapView
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021,
                }}
                style={styles.map}
            />
            <Text>The regions with green have max Signal Strength and the red have the least</Text>
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