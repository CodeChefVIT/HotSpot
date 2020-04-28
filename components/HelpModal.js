import React, { useState, useEffect} from "react"
import { Text, View, Button, StyleSheet, AsyncStorage } from "react-native"
import Modal from 'react-native-modal'
import { TouchableOpacity } from "react-native-gesture-handler"
import * as themes from '../components/Themes'

function HelpModal(props) {

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
        text: {
            color: themes[theme].text,
        },
        heading: {
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: '10%',
            color: themes[theme].text,
        },
        padding: {
            paddingBottom: '10%',
            color: themes[theme].text,
        }
    })

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
