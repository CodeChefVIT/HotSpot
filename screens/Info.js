import React, {useEffect, useState} from "react"
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from "react-native"
import Navbar from '../components/Navbar'
import { InfoContext } from '../context/InfoContext'
import { MaterialIcons } from '@expo/vector-icons'
import * as themes from '../components/Themes'
import { setLightEstimationEnabled } from "expo/build/AR"
import {AppLoading} from 'expo'
import { Rubik_700Bold } from '@expo-google-fonts/rubik'
import { useFonts, BalsamiqSans_400Regular, BalsamiqSans_700Bold } from '@expo-google-fonts/balsamiq-sans'


function Info({navigation}) {
    const {latitude, longitude, altitude, carrier, downSpeed, upSpeed, ping, theme} = React.useContext(InfoContext)

    let metric = null

    if (downSpeed != "Waiting...") {
        metric = "KB/s"
    }

    let [fontsLoaded] = useFonts({
        BalsamiqSans_700Bold,
        BalsamiqSans_400Regular,
        Rubik_700Bold
    });

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
        marginTop: {
            marginTop: '10%'
        },
        heading: {
            fontSize: 36,
            paddingBottom: 20,
            color: themes[theme].text
        },
        f18: {
            fontSize: 18,
            paddingBottom: 2,
        },
        f22: {
            fontSize: 22,
            paddingBottom: 10,
            color: themes[theme].text
        },
        f26: {
            fontSize: 26,
            color: themes[theme].text
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8%'
        },
        comp: {
            marginHorizontal: '9%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        head: {
            fontSize: 28,
        },
        marginBot: {
            marginBottom: '10%',
        }
    })


    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Navbar nav={navigation} />
                    <View style={{paddingTop: 25}}>
                        <Text style={[styles.heading, styles.center, styles.blue, styles.marginBot, {fontFamily: 'BalsamiqSans_700Bold'}]}>Your Information</Text>
                        <View style={styles.row}>
                            <View style={styles.comp}> 
                                <Text style={[{fontFamily: 'Rubik_700Bold'}, styles.blue, styles.f18]}>Latitude:</Text>
                                <Text style={[styles.f22, {fontFamily: 'BalsamiqSans_400Regular'}]}>{latitude}</Text>
                            </View>
                            <View style={styles.comp}>
                                <Text style={[{fontFamily: 'Rubik_700Bold'}, styles.blue, styles.f18]}>Longitude:</Text>
                                <Text style={[styles.f22, {fontFamily: 'BalsamiqSans_400Regular'}]}>{longitude}</Text>
                            </View>
                        </View>
                        <View style={[styles.row, styles.marginBot]}>
                            <View style={styles.comp}>
                                <Text style={[{fontFamily: 'Rubik_700Bold'}, styles.blue, styles.f18]}>Altitude:</Text>
                                <Text style={[styles.f22, {fontFamily: 'BalsamiqSans_400Regular'}]}>{altitude}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.comp}>
                                <Text style={[{fontFamily: 'Rubik_700Bold'}, styles.blue, styles.head]}>Carrier:</Text>
                                <Text style={[styles.f26, {fontFamily: 'BalsamiqSans_700Bold'}]}>{carrier}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.comp]}>
                                <Text style={[{fontFamily: 'BalsamiqSans_700Bold'}, styles.blue, styles.f26]}>Download Speed:</Text>
                                <Text style={[styles.f26, styles.center, styles.blue, {fontFamily: 'BalsamiqSans_700Bold'}]}><MaterialIcons name="cloud-download" size={26} /> {downSpeed} {metric} </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
    
}

export default Info

