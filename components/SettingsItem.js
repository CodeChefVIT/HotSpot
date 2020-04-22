import React from "react"
import {View, StyleSheet, Text, TouchableOpacity} from "react-native"

function SettingsItem(props) {
    return (
        <TouchableOpacity style={styles.container}>
            <View>
                <Text style={styles.text}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SettingsItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        height: '10%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 20,
    }
})