import React from "react"
import { Text, View, Button, StyleSheet } from "react-native"
import Modal from 'react-native-modal'
import * as themes from '../components/Themes'
import { InfoContext } from "../context/InfoContext"
import {AppLoading} from 'expo'
import { Rubik_700Bold } from '@expo-google-fonts/rubik'
import { useFonts, BalsamiqSans_400Regular } from '@expo-google-fonts/balsamiq-sans'


function AboutModal(props) {
    const {theme} = React.useContext(InfoContext)

    const closeModal = () => {
        props.changeVisibility(false)
    }

    let [fontsLoaded] = useFonts({
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
        heading: {
            fontSize: 30,
            fontFamily: 'Rubik_700Bold',
            marginBottom: '5%',
            color: themes[theme].text,
        },
        about: {
            paddingBottom: '5%',
            color: themes[theme].text,
            fontSize: 16,
            fontFamily: 'BalsamiqSans_400Regular',
        }
    
    })

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <Modal isVisible={props.visibility} transparent={true}>
                <View style={styles.container}>
                    <Text style={styles.heading}>CodeChef-VIT</Text>
                    <Text style={styles.about}>CodeChef-VIT is an international chapter,
                        aiming to help students around the world, to develop a deep insight
                        into technology.</Text>
                    <Text style={styles.about}>The VIT chapter selects the brightest minds in
                        VIT Vellore, and gives them a platform to enhance and showcase their skills.</Text>
                    <Button title="Close" onPress={closeModal} />
                </View>
            </Modal>
        )
    }
    
}

export default AboutModal