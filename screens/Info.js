import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Navbar from '../components/Navbar'

function Info({navigation}) {
    return (
        <View style={styles.container}>
            <Navbar nav = {navigation}/>
            <Text>Hello from info screen</Text>
        </View>
    )
}

export default Info

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: '2%',
        paddingLeft: 20,
        paddingRight: 20,
        height: '100%'
    }
})