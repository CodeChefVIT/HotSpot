import React, { useEffect, useState } from "react"
import { Text, View, Image, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import * as themes from '../components/Themes'
import { InfoContext } from "../context/InfoContext"

function Navbar(props) {

    const {theme} = React.useContext(InfoContext)
    let img = require('../assets/nav-brand.png')

    if(theme === 'light') {
        img = require('../assets/nav-brand.png')
    } else if(theme === 'dark') {
        img = require('../assets/hotspot-dark.png')
    }

    const styles = StyleSheet.create({
        navbar: {
            width: '100%',
            paddingTop: '5%',
            justifyContent: 'center',
            alignItems: "center",
            flexDirection: 'row',
        },
        img: {
            width: '40%',
            resizeMode: 'contain',
        },
        menu: {
            position: "absolute",
            left: 0,
            alignSelf: "center",
        }
    })
    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.menu} onPress={() => props.nav.openDrawer()}>
                <MaterialIcons name="menu" size={32} color={themes[theme].text}/>
            </TouchableOpacity>
            <Image source={img} style={styles.img} />
        </View>
    )
}

export default Navbar