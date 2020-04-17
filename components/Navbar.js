import React from "react"
import {Text, View, Image, StyleSheet, TouchableOpacity} from "react-native"
import {MaterialIcons} from '@expo/vector-icons'

function Navbar() {
    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.menu} onPress={() => console.log("Press")}>
                <MaterialIcons name="menu"size={32}/>
            </TouchableOpacity>
            <Image source={require('../assets/nav-brand.png')} style={styles.img}/>
        </View>
    )
}

export default Navbar

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