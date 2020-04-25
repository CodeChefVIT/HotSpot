import React, { useState } from "react"
import { Text, View, Button, StyleSheet, Picker } from "react-native"
import Modal from 'react-native-modal'


function DisplayModal(props) {
    const [theme, changeTheme] = useState("light")

    const closeModal = () => {
        props.changeVisibility(false)
    }

    const changeThemeValue = () => {
        if(theme === "light") {
            changeTheme("dark")
        } else {
            changeTheme("light")
        }
    }

    return (
        <Modal isVisible={props.visibility} transparent={true}>
            <View style={styles.container}>
                <Text style={styles.head}>Select theme: </Text>

                <Picker 
                    selectedValue={theme} 
                    onValueChange={changeThemeValue} 
                    style={styles.picker} >
                    <Picker.Item label="Light" value="light" />
                    <Picker.Item label="Dark" value="dark" />
                </Picker>

                <Button title="Close" onPress={closeModal} />
            </View>
        </Modal>
    )
}

export default DisplayModal

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '10%',
        padding: '5%',
        paddingTop: '10%',
        paddingBottom: '2%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    head: {
        fontWeight: 'bold',
    },
    picker: {
        width: '100%',
        marginBottom: '5%',
    }
})