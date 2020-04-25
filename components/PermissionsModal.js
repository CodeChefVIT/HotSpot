import React, { useEffect, useState } from "react"
import { Text, View, Button, StyleSheet } from "react-native"
import Modal from 'react-native-modal'
import {InfoContext} from '../context/InfoContext'

function PermissionsModal(props) {
    const [text, changeText] = useState("Wait!")

    const {locPerm} = React.useContext(InfoContext)


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

    return (
        <Modal isVisible={props.visibility} transparent={true}>
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
                <Button title="Close" onPress={closeModal}/>
            </View>
        </Modal>
    )
}

export default PermissionsModal

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '10%',
        padding: '5%',
        paddingBottom: '2%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '5%'
    }
})