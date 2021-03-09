import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class RestarantsFragment extends React.Component {
    render() {
        return(
            <View style={styles.ContainerOne}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}> Restaurants list</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ContainerOne: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent:'center',
        alignContent: 'center',
        backgroundColor: "red"
        
    },
})