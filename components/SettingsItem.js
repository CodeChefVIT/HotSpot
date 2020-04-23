import React from "react"
import {View, StyleSheet, Text, TouchableOpacity} from "react-native"
import {SimpleLineIcons, Entypo} from '@expo/vector-icons'

function SettingsItem(props) {
    let icon = null
    if(props.name === "Display") {
        icon = <SimpleLineIcons name="screen-smartphone" size={25} color="#888" />
    } else if(props.name === "Help") {
        icon = <Entypo name="help" size={25} color="#888" />
    } else if(props.name === "Permissions") {
        icon = <Entypo name="book" size={25} color="#888" />
    } else if(props.name === "About") {
        icon = <SimpleLineIcons name="user" size={25} color="#888" />
    }

    
    return (
        <TouchableOpacity style={styles.container}>
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