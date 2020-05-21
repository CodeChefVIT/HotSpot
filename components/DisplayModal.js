import React, { useState, useEffect } from "react"
import { Text, View, Button, StyleSheet, Picker, AsyncStorage } from "react-native"
import Modal from 'react-native-modal'
import * as themes from '../components/Themes'
import {InfoContext} from '../context/InfoContext'
import {AppLoading} from 'expo'
import { Rubik_700Bold } from '@expo-google-fonts/rubik'
import { useFonts, LobsterTwo_400Regular, LobsterTwo_700Bold } from '@expo-google-fonts/lobster-two'


function DisplayModal(props) {
    const {theme, changeTheme} = React.useContext(InfoContext)
    const [item, changeItem] = useState("light")
    
    const setTheme = async (value) => {
        await AsyncStorage.setItem('theme', value);
    }

    const closeModal = () => {
        props.changeVisibility(false)
    }

    const changeThemeValue = () => {
        if(theme === "light") {
            changeTheme("dark")
            setTheme("dark")
        } else {
            changeTheme("light")
            setTheme("light")
        }
    }

    let [fontsLoaded] = useFonts({
        LobsterTwo_700Bold,
        LobsterTwo_400Regular,
        Rubik_700Bold
    });

    const styles = StyleSheet.create({
        container: {
            marginHorizontal: '10%',
            padding: '5%',
            paddingTop: 30,
            paddingBottom: 30,
            backgroundColor: themes[theme].background,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        head: {
            fontSize: 16,
            color: themes[theme].text,
            fontFamily: 'LobsterTwo_700Bold'
        },
        picker: {
            width: '100%',
            marginBottom: '5%',
            color: themes[theme].text,
            backgroundColor: themes[theme].fade,
        }
    })

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <Modal isVisible={props.visibility} transparent={true}>
                <View style={styles.container}>
                    <Text style={styles.head}>Select theme: </Text>
    
                    <Picker 
                        mode="dropdown"
                        selectedValue={theme} 
                        onValueChange={changeThemeValue} 
                        // itemStyle={{fontFamily: 'LobsterTwo_700Bold'}}
                        style={styles.picker} >
                        <Picker.Item label="Light" value="light" />
                        <Picker.Item label="Dark" value="dark" />
                    </Picker>
    
                    <Button title="Confirm" onPress={closeModal} />
                </View>
            </Modal>
        )
    }

    
}

export default DisplayModal