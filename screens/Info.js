import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import Navbar from '../components/Navbar'
import {InfoContext} from '../context/InfoContext'
import { MaterialIcons } from '@expo/vector-icons'


function Info({navigation}) {
    const {latitude, longitude, altitude, carrier, downSpeed, upSpeed, ping} = React.useContext(InfoContext)
    return (
        <ScrollView>
            <View style={styles.container}>
                <Navbar nav = {navigation}/>
                <View>
                    <Text style={[styles.heading, styles.center, styles.bold, styles.blue]}>YOUR INFO</Text>
                    <Text style={styles.f20}><Text style={styles.bold, styles.blue}>Latitude:</Text>{latitude}</Text>
                    <Text style={styles.f20}><Text style={styles.bold, styles.blue}>Longitude:</Text>{longitude}</Text>
                    <Text style={styles.f20}><Text style={styles.bold, styles.blue}>Altitude:</Text>{altitude}</Text>
                    <Text style={styles.f20}><Text style={styles.bold, styles.blue}>Carrier:</Text>{carrier}</Text>
                    <Text style={[styles.bold, styles.blue, styles.f24]}>Download Speed:</Text>
                    <Text style={[styles.f24, styles.center, styles.blue]}><MaterialIcons name="cloud-download" size={36}/> {downSpeed}</Text>
                    <Text style={[styles.bold, styles.blue, styles.f24]}>Upload Speed:</Text>
                    <Text style={[styles.f24, styles.center, styles.blue]}><MaterialIcons name="cloud-upload" size={36}/> {upSpeed}</Text>
                    <Text style={[styles.bold, styles.blue, styles.f24]}>Ping:</Text>
                    <Text style={[styles.f24, styles.center, styles.blue]}><MaterialIcons name="compare-arrows" size={36}/> {ping}</Text>
                </View>
            </View>
        </ScrollView>
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
    },
    center: {
        textAlign: 'center'
    },
    blue: {
        color: "#0027a8"
    },
    bold: {
        fontWeight: 'bold'
    },
    heading: {
        fontSize: 36,
        paddingBottom: 20
    },
    f20: {
        fontSize: 22,
        paddingBottom: 10
    },
    f24: {
        fontSize: 24,
        paddingBottom: 20
    }
})