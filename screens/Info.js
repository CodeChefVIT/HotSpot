import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Navbar from '../components/Navbar'
import {InfoContext} from '../context/InfoContext'

function Info({navigation}) {
    const {latitude, longitude, carrier} = React.useContext(InfoContext)
    return (
        <View style={styles.container}>
            <Navbar nav = {navigation}/>
            <Text>Latitude: {latitude}</Text>
            <Text>Longitude: {longitude}</Text>
            <Text>Carrier: {carrier}</Text>
        </View>
    )
}

export default Info

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: '2%',
        paddingLeft: 20,
        paddingRight: 20,
        height: '100%'
    }
})