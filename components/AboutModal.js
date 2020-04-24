import React from "react"
import { Text, View, Button, StyleSheet } from "react-native"
import Modal from 'react-native-modal'
import { TouchableOpacity } from "react-native-gesture-handler"

function AboutModal(props) {
    const closeModal = () => {
        props.changeVisibility(false)
    }
    return (
        <Modal isVisible={props.visibility} transparent={true}>
            <View style={styles.container}>
                <Text>Hello from About Modal</Text>
                <Button title="Close" onPress={closeModal}/>
            </View>
        </Modal>
    )
}

export default AboutModal

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