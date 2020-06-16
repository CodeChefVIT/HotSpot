import React, { useEffect, useState } from "react"
import { Text, View, Button, StyleSheet, AsyncStorage } from "react-native"
import Modal from 'react-native-modal'
import {InfoContext} from '../context/InfoContext'
import * as themes from '../components/Themes'
import {AppLoading} from 'expo'
import { Rubik_700Bold } from '@expo-google-fonts/rubik'
import { useFonts, BalsamiqSans_400Regular, BalsamiqSans_700Bold } from '@expo-google-fonts/balsamiq-sans'

function PermissionsModal(props) {
    const [text, changeText] = useState("Wait!")

    const {locPerm} = React.useContext(InfoContext)
    const {theme} = React.useContext(InfoContext)

    const checkPermission = () => {
        if(locPerm !== "granted") {
            changeText("You have not given LOCATION permission")
        }
        else {
            changeText("You have already given LOCATION permission")
        }
    }

    useEffect(() => {
        checkPermission()
    })

    const closeModal = () => {
        props.changeVisibility(false)
    }

    let [fontsLoaded] = useFonts({
        BalsamiqSans_700Bold,
        BalsamiqSans_400Regular,
        Rubik_700Bold
    });

    const styles = StyleSheet.create({
        container: {
            marginHorizontal: '10%',
            padding: '5%',
            paddingBottom: 30,
            paddingTop: 30,
            backgroundColor: themes[theme].background,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        text: {
            fontSize: 20,
            textAlign: 'center',
            marginBottom: '5%',
            color: themes[theme].text,
            fontFamily: 'BalsamiqSans_700Bold'
        }
    })


    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <Modal isVisible={props.visibility} transparent={true}>
                <View style={styles.container}>
                    <Text style={styles.text}>{text}</Text>
                    <Button title="Close" onPress={closeModal} />
                </View>
            </Modal>
        )
    }

}

export default PermissionsModal