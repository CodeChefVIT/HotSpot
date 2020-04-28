import React from "react"
import { Text, View, Button, StyleSheet } from "react-native"
import Modal from 'react-native-modal'
import { TouchableOpacity } from "react-native-gesture-handler"

function HelpModal(props) {
    const closeModal = () => {
        props.changeVisibility(false)
    }
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

export default HelpModal

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
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '10%',
    },
    padding: {
        paddingBottom: '10%',
    }
})