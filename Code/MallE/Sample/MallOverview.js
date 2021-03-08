import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const { heightY } = Dimensions.get("window");
const { widthX } = Dimensions.get("window");

export default class MallOverview extends React.Component {
    render() {
        return(
            <View style={styles.ContainerOne}>
                <Image style={styles.MallImage} source={{uri:'https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2luZ2Fwb3JlfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80'}}>
                </Image>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}> Website: <Text style={{fontSize: 20, fontWeight: 'normal'}}>http://pornhub.com</Text></Text> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ContainerOne: {
        width: '100%',
        height: '100%',
    },
    MallImage: {
        width: 400,
        height: 300,
    }
})