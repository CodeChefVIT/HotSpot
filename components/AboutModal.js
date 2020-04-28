import React, { useState, useEffect } from "react"
import { Text, View, Button, StyleSheet, AsyncStorage } from "react-native"
import Modal from 'react-native-modal'
import * as themes from '../components/Themes'
import { TouchableOpacity } from "react-native-gesture-handler"


function AboutModal(props) {
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
    const closeModal = () => {
        props.changeVisibility(false)
    }

    const styles = StyleSheet.create({
        container: {
            marginHorizontal: '10%',
            padding: '5%',
            backgroundColor: themes[theme].background,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        heading: {
            fontWeight: 'bold',
            fontSize: 25,
            paddingTop: '5%',
            paddingBottom: '10%',
            color: themes[theme].text,
        },
        about: {
            paddingBottom: '5%',
            fontSize: 15,
            color: themes[theme].text,
        },
    
    })

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

export default AboutModal