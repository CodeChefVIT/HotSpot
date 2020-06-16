import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { SimpleLineIcons, Entypo } from '@expo/vector-icons'
import * as themes from '../components/Themes'
import { InfoContext } from "../context/InfoContext"
import {AppLoading} from 'expo'
import { useFonts, BalsamiqSans_400Regular } from '@expo-google-fonts/balsamiq-sans'

function SettingsItem(props) {
    
    const {theme}= React.useContext(InfoContext)
    
    let icon = null
    let size = 25
    let color = themes[theme].blue

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

    let [fontsLoaded] = useFonts({
        BalsamiqSans_400Regular
    });

    const styles = StyleSheet.create({
        container: {
            padding: 10,
            justifyContent: 'center',
            height: '10%',
            borderBottomWidth: 0.5,
            borderBottomColor: '#ccc',
        },
        text: {
            fontSize: 28,
            paddingLeft: 10,
            color: themes[theme].text,
            fontFamily: 'BalsamiqSans_400Regular'
        },
        text1: {
            fontSize: 20,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    })

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <TouchableOpacity style={styles.container} onPress={handlePress}>
                <View style={styles.row}>
                    {icon}
                    <Text style={[styles.text, styles.text1]}>{props.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    
}

export default SettingsItem