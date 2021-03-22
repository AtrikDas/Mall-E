import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import {globalStyles} from '../../ThemesAndFonts';

import Graph from './Graph';
import AnotherGraph from './AnotherGraph';
import Rotation from './Rotation';

export default class MallOverview extends React.Component {

    render() {
        return(
            <View style={styles.ContainerOne}>
                <Image source={{
                    width: '100%',
                    height: 300,
                    uri:'https://upload.wikimedia.org/wikipedia/commons/a/a0/JP2entrance2.jpg'}}>
                </Image>
                {/* <Text style={globalStyles.titleText}>{MallDetails.name? MallDetails.name: "no mall selected"}</Text> */}
                <View style={styles.TextDetailContainer}>
                <Text style={[globalStyles.titleText, styles.popupHeading]}>Jurong Point</Text>
                    <Text style={[globalStyles.titleText, styles.customText]}>
                        Website: 
                    <Text style={globalStyles.normalText}> www.jurongpoint.com.sg</Text>
                    </Text>

                    <Text style={[globalStyles.titleText, styles.customText]}>
                        Address: 
                    <Text style={globalStyles.normalText}> 1 Jurong West Central 2, Singapore 648886</Text>
                    </Text>

                    <Text style={[globalStyles.titleText, styles.customText]}>
                    Hours:
                    <Text style={globalStyles.normalText}> Open ⋅ Closes 9:30PM</Text>
                    </Text>

                    <Text style={[globalStyles.titleText, styles.customText]}>
                    Contact: 
                    <Text style={globalStyles.normalText}> +65 6834 3126</Text>
                    </Text>

                    <Text style={[globalStyles.titleText, styles.customText]}>
                    Ratings: <Text style={globalStyles.normalText}> 4/5</Text>
                    </Text>

                    <Text style={[globalStyles.titleText, styles.customText]}>Mall Crowd Density</Text>

                    <View><Graph/></View>
                
                    <Text style={globalStyles.titleText}>Floor Crowd Density</Text>
                    
                    <View style={[{
                        transform: [{ rotate: "90deg" },]}]}>  
                        <AnotherGraph/>
                    </View>
            
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ContainerOne: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    TextDetailContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        padding: 5,
        flexDirection: 'column',
        flex: 1
    },

    customText: {
        paddingBottom: 15,
        paddingTop: 15,
    },
    popupHeading: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },
})