import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Body extends React.Component {
    render() {
        return(
            <View style = {styles.container}>
                <View style = {styles.box}>
                    <View style = {styles.textBox}>
                        <Text>Box 2</Text>
                    </View>
                </View>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#aaa',
    },

    box: {
        width: '100%',
        height: '100%',
        padding: 5,
        backgroundColor: '#def',
    },
})