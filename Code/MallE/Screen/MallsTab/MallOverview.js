import React, {useEffect, navigation} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import {globalStyles} from '../../ThemesAndFonts';

import AsyncStorage from '@react-native-community/async-storage';

import Graph from './Graph';
import AnotherGraph from './AnotherGraph';
import StarGenerator from './ratingsComponent';

export default class MallOverview extends React.Component {

    // constructor(props){
    //     super(props);
        
    //         this.state = {
    //             mallDetail: {},
    //     }
    // }
    

    componentDidMount(){
        // AsyncStorage.getItem("mallDetail").then((result)=> this.setState({mallDetail: JSON.parse(result)})).catch((e)=>console.log(e));
        console.log("malloverview props: "+JSON.stringify(this.props))
    }

    render() {
        return(
            // Main Container
            <View style={styles.container}>

                <View style = {styles.seperatorLine}>
                    <Text style={[globalStyles.titleText, {textDecorationLine: 'underline'}]}>
                        {this.props.mallDetail.name}</Text>
                </View>

            
                {/* <Image source={{
                    width: '100%',
                    height: 300,
                    uri:`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI&photoreference=${this.props.mallDetail.photos[0].photo_reference}&maxheight=300`}} /> */}
                

                <View style={styles.textDetailContainer}>

                    <View style = {styles.seperatorLine}>

                        {/* website */}
                        {this.props.mallDetail.website ? (
                        <Text style={[globalStyles.titleText, styles.customText]}>
                        Website: 
                        <Text style={globalStyles.normalText}>{this.props.mallDetail.website}</Text>
                        </Text>) : (
                        <Text style={[globalStyles.titleText, styles.customText]}>
                        Website: 
                        <Text style={globalStyles.normalText}>No Website</Text>
                        </Text>)
                        }
                        

                        {/* address */}
                        <Text style={[globalStyles.titleText, styles.customText]}>
                        Address: 
                        <Text style={globalStyles.normalText}>{this.props.mallDetail.formatted_address}</Text>
                        </Text>

                        {/* hours */}
                        <Text style={[globalStyles.titleText, styles.customText]}>
                        Hours:
                        <Text style={globalStyles.normalText}> Open ⋅ Closes 9:30PM</Text>
                        </Text>

                        {/* phonenumber */}
                        {this.props.mallDetail.formatted_phone_number ? 
                        (<Text style={[globalStyles.titleText, styles.customText]}>
                        Contact: 
                        <Text style={globalStyles.normalText}>{this.props.mallDetail.formatted_phone_number}</Text>
                        </Text>) : 
                        (<Text style={[globalStyles.titleText, styles.customText]}>
                        Contact: 
                        <Text style={globalStyles.normalText}>No Contact Number</Text>
                        </Text>)
                        }
                        

                        {/* rating */}
                        <Text style={[globalStyles.titleText, styles.customText]}>
                        Ratings: 
                        <StarGenerator rating = {Math.floor( this.props.mallDetail.rating)}/>
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