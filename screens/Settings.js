import React from "react"
import {View, StyleSheet} from "react-native"
import Navbar from "../components/Navbar"
import SettingsItem from "../components/SettingsItem"

function Settings({ navigation }) {
    return(
        <View style={styles.container}>
            <Navbar nav={navigation}/>
            <SettingsItem name="Display"/>
            <SettingsItem name="Permissions"/>
            <SettingsItem name="Help"/>
            <SettingsItem name="About"/>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: '2%',
        paddingLeft: 20,
        paddingRight: 20,
        height: '100%',
    },
})