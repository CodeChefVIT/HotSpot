import React from "react"
import {View, Text} from "react-native"
import Navbar from "../components/Navbar"

function Settings({ navigation }) {
    return(
        <View>
            <Navbar nav={navigation}/>
            <Text>Hello from settings</Text>
        </View>
    )
}

export default Settings