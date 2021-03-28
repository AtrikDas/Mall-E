import React, {useEffect, navigation} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import {globalStyles} from '../../ThemesAndFonts';

import Graph from './Graph';
import AnotherGraph from './AnotherGraph';
import StarGenerator from './ratingsComponent';

export default class MallOverview extends React.Component {

    render() {
        return(
            // Main Container
            <View style={styles.container}>

                <View style = {styles.seperatorLine}>
                    <Text style={[globalStyles.titleText, {textDecorationLine: 'underline'}]}>
                        Jurong Point</Text>
                </View>

                <Image source={{
                    width: '100%',
                    height: 300,
                    uri:'https://upload.wikimedia.org/wikipedia/commons/a/a0/JP2entrance2.jpg'}}>
                </Image>

                <View style={styles.textDetailContainer}>

                    <View style = {styles.seperatorLine}>

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
                        Ratings: 
                        <StarGenerator rating = {4}/>
                        </Text>

                    </View>

                </View>

                <Text style={[globalStyles.titleText, 
                    {marginTop: 10, marginBottom: 10, textDecorationLine: 'underline'}]}>
                        Weekly Crowd Density</Text>
                    
                <View style = {[styles.seperatorLine]}><Graph/></View>
                
                <Text style={[globalStyles.titleText, 
                    {marginTop: 10, marginBottom: 10, textDecorationLine: 'underline'}]}>
                        Floor Crowd Density</Text>
                
                <View style = {[styles.seperatorLine]}><AnotherGraph/></View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },

    textDetailContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        padding: 0,
        flexDirection: 'column',
        flex: 1,
    },

    seperatorLine: {
        borderBottomColor: '#000000',
        borderBottomWidth: 0.75,
        alignSelf: 'stretch',
        paddingTop: 5,
        paddingBottom: 5,
    },

    customText: {
        paddingVertical: 1,
    },
})