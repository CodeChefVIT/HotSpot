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

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '10%',
        padding: '5%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 25,
        paddingTop: '5%',
        paddingBottom: '10%',
    },
    about: {
        paddingBottom: '5%',
        fontSize: 15
    },

})