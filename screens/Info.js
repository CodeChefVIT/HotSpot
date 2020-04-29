import React, {useEffect, useState} from "react"
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from "react-native"
import Navbar from '../components/Navbar'
import { InfoContext } from '../context/InfoContext'
import { MaterialIcons } from '@expo/vector-icons'
import * as themes from '../components/Themes'
import { setLightEstimationEnabled } from "expo/build/AR"


function Info({navigation}) {
    const {latitude, longitude, altitude, carrier, downSpeed, upSpeed, ping} = React.useContext(InfoContext)

    let metric = null

    if (downSpeed != "Waiting...") {
        metric = "KB/s"
    }

    const {theme} = React.useContext(InfoContext)

    const styles = StyleSheet.create({
        container: {
            backgroundColor: themes[theme].background,
            paddingLeft: 20,
            paddingRight: 20,
            height: '100%'        
        },
        center: {
            textAlign: 'center'
        },
        blue: {
            color: themes[theme].blue,
        },
        bold: {
            fontWeight: 'bold'
        },
        heading: {
            fontSize: 30,
            paddingBottom: 20,
            color: themes[theme].text
        },
        f20: {
            fontSize: 20,
            paddingBottom: 10,
            color: themes[theme].text
        },
        f24: {
            fontSize: 20,
            paddingBottom: 20,
            color: themes[theme].text
        }
    })

    return (
        <ScrollView style={styles.container}>
            <View>
                <Navbar nav={navigation} />
                <View>
                    <Text style={[styles.heading, styles.center, styles.bold, styles.blue]}>Your Information</Text>
                    <Text style={styles.f20}><Text style={styles.bold, styles.blue}>Latitude:</Text>{latitude}</Text>
                    <Text style={styles.f20}><Text style={styles.bold, styles.blue}>Longitude:</Text>{longitude}</Text>
                    <Text style={styles.f20}><Text style={styles.bold, styles.blue}>Altitude:</Text>{altitude}</Text>
                    <Text style={styles.f20}><Text style={styles.bold, styles.blue}>Carrier:</Text>{carrier}</Text>
                    <Text style={[styles.bold, styles.blue, styles.f24]}>Download Speed:</Text>
                    <Text style={[styles.f24, styles.center, styles.blue]}><MaterialIcons name="cloud-download" size={36} /> {downSpeed} {metric} </Text>
                    <Text style={[styles.bold, styles.blue, styles.f24]}>Upload Speed:</Text>
                    <Text style={[styles.f24, styles.center, styles.blue]}><MaterialIcons name="cloud-upload" size={36} /> {upSpeed}</Text>
                    <Text style={[styles.bold, styles.blue, styles.f24]}>Ping:</Text>
                    <Text style={[styles.f24, styles.center, styles.blue]}><MaterialIcons name="compare-arrows" size={36} /> {ping}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Info

