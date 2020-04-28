import React, { useEffect, useState } from "react"
import { Text, View, Image, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import * as themes from '../components/Themes'

function Navbar(props) {

    const [theme, changeTheme] = useState("light")

    const getTheme = async () => {
        let value = await AsyncStorage.getItem('theme');
        if(value !== null){
            changeTheme(value);
        }
    }

    useEffect(() => {
        getTheme()
    })

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
            <Image source={require('../assets/nav-brand.png')} style={styles.img} />
        </View>
    )
}

export default Navbar