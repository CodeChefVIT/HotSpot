import React, { useEffect } from "react"
import { Text, View, Button, StyleSheet } from "react-native"
import Modal from 'react-native-modal'
import * as Permissions from 'expo-permissions'

function PermissionsModal(props) {
    let text = null

    const checkPermission = async () => {
        const { status } = Permissions.askAsync(Permissions.LOCATION)

        if(status !== "granted") {
            text = <Text>You have not given LOCATION permission</Text>
        }
        else {
            text = <Text>You have already given LOCATION permission</Text>
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
                {text}
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    }
})