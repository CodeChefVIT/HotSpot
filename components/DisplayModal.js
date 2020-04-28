import React, { useState, useEffect } from "react"
import { Text, View, Button, StyleSheet, Picker, AsyncStorage } from "react-native"
import Modal from 'react-native-modal'
import * as themes from '../components/Themes'
import {InfoContext} from '../context/InfoContext'


function DisplayModal(props) {
    const {theme, changeTheme} = React.useContext(InfoContext)
    const [item, changeItem] = useState("light")
    
    const getTheme = async () => {
        let value = await AsyncStorage.getItem('theme');
        if(value !== null){
            changeTheme(value);
            changeItem(value);
        }
    }
    
    const setTheme = async (value) => {
        await AsyncStorage.setItem('theme', value);
    }

    useEffect(() => {
        getTheme()
    })

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

    const styles = StyleSheet.create({
        container: {
            marginHorizontal: '10%',
            padding: '5%',
            paddingTop: '10%',
            paddingBottom: '2%',
            backgroundColor: themes[item].background,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        head: {
            fontWeight: 'bold',
            color: themes[item].text
        },
        picker: {
            width: '100%',
            marginBottom: '5%',
            color: themes[item].text,
            backgroundColor: themes[item].fade,
        }
    })

    return (
        <Modal isVisible={props.visibility} transparent={true}>
            <View style={styles.container}>
                <Text style={styles.head}>Select theme: </Text>

                <Picker 
                    mode="dropdown"
                    selectedValue={theme} 
                    onValueChange={changeThemeValue} 
                    style={styles.picker} >
                    <Picker.Item label="Light" value="light" />
                    <Picker.Item label="Dark" value="dark" />
                </Picker>

                <Button title="Confirm" onPress={closeModal} />
            </View>
        </Modal>
    )
}

export default DisplayModal