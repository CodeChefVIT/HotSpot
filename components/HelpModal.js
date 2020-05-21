import React, { } from "react"
import { Text, View, Button, StyleSheet } from "react-native"
import Modal from 'react-native-modal'
import * as themes from '../components/Themes'
import { InfoContext } from "../context/InfoContext"
import {AppLoading} from 'expo'
import { Rubik_700Bold } from '@expo-google-fonts/rubik'
import { useFonts, LobsterTwo_400Regular } from '@expo-google-fonts/lobster-two'

function HelpModal(props) {

    const {theme}= React.useContext(InfoContext)

    const closeModal = () => {
        props.changeVisibility(false)
    }

    let [fontsLoaded] = useFonts({
        LobsterTwo_400Regular,
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
            color: themes[theme].text,
            fontSize: 16,
            fontFamily: 'LobsterTwo_400Regular',
            
        },
        heading: {
            fontSize: 30,
            fontFamily: 'Rubik_700Bold',
            marginBottom: '5%',
            color: themes[theme].text,
        },
        padding: {
            paddingBottom: '5%',
            color: themes[theme].text,
            fontSize: 16,
            fontFamily: 'LobsterTwo_400Regular',
        }
    })

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <Modal isVisible={props.visibility} transparent={true}>
                <View style={styles.container}>
                    <Text style={styles.heading}>HotSpot</Text>
                    <Text style={styles.text}>HotSpot App shows the heatmap of your
                        surrounding areas, in terms of the download speed.</Text>
                    <Text style={styles.padding}>The areas depicted in green have a good cellular reception, while 
                        areas in red do not have a good coverage.
                    </Text>
                    <Button title="Close" onPress={closeModal}/>
                </View>
            </Modal>
        )
    }

    
}

export default HelpModal
