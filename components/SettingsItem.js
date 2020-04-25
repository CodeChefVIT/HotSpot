import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { SimpleLineIcons, Entypo } from '@expo/vector-icons'

function SettingsItem(props) {
    let icon = null
    let size = 25
    let color = "#0027a8"

    if (props.name === "Display") {
        icon = <SimpleLineIcons name="screen-smartphone" size={size} color={color} />
    } else if (props.name === "Help") {
        icon = <Entypo name="help" size={size} color={color} />
    } else if (props.name === "Permissions") {
        icon = <Entypo name="book" size={size} color={color} />
    } else if (props.name === "About") {
        icon = <SimpleLineIcons name="user" size={size} color={color} />
    }

    const handlePress = () => {
        props.onPress(true)
    }


    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={styles.row}>
                {icon}
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
        paddingLeft: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})