import React, { useState, useEffect } from "react"
import {View, StyleSheet, AsyncStorage} from "react-native"
import Navbar from "../components/Navbar"
import SettingsItem from "../components/SettingsItem"
import DisplayModal from '../components/DisplayModal'
import PermissionsModal from '../components/PermissionsModal'
import HelpModal from '../components/HelpModal'
import AboutModal from '../components/AboutModal'
import * as themes from '../components/Themes'

function Settings({ navigation }) {
    const [displayModalVisibility, setDisplayModal] = useState(false)
    const [permissionModalVisibility, setPermissionModal] = useState(false)
    const [helpModalVisibility, setHelpModal] = useState(false)
    const [aboutModalVisibility, setAboutModal] = useState(false)
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
        container: {
            backgroundColor: themes[theme].background,
            paddingTop: '2%',
            paddingLeft: 20,
            paddingRight: 20,
            height: '100%',
        },
    })

    return(
        <View style={styles.container}>
            <DisplayModal visibility = {displayModalVisibility} changeVisibility = {setDisplayModal} />
            <PermissionsModal visibility = {permissionModalVisibility} changeVisibility = {setPermissionModal} />
            <HelpModal visibility = {helpModalVisibility} changeVisibility = {setHelpModal} />
            <AboutModal visibility = {aboutModalVisibility} changeVisibility = {setAboutModal} />

            <Navbar nav={navigation}/>
            <SettingsItem name="Display" onPress={setDisplayModal}/>
            <SettingsItem name="Permissions" onPress={setPermissionModal}/>
            <SettingsItem name="Help" onPress={setHelpModal}/>
            <SettingsItem name="About" onPress={setAboutModal}/>
        </View>
    )
}

export default Settings