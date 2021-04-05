import React, { useEffect, useState, navigation, Component } from 'react';

import { StyleSheet, Text, View, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import {globalStyles} from '../../ThemesAndFonts';

import AsyncStorage from '@react-native-community/async-storage';

import Graph from './Graph';
import AnotherGraph from './AnotherGraph';
import StarGenerator from './ratingsComponent';

import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'


var date = new Date().getDate();
var day = new Date().getDay(); // JS: 0 = Sunday, 6 = Saturday
var bestTimeDay = (day > 0) ? (day - 1) : (6); // Best-Time: 0 = Monday, 6 = Sunday
var hour = new Date().getHours();
var bestTimeHour = hour - 6;

const axesSvg = { fontSize: 11, fill: 'rgb(32,32,32)' };
const verticalContentInset = { top: 10, bottom: 10 };
const xAxisHeight = 30;

// const [realData, setRealData] = useState([]);
const best_time_api_key_private = 'pri_c3ae9a3d6cea4bbaa667993561b37256';
const best_time_api_key_public = 'pub_ea53baaf28f34149b3caeb66139cd2f7';
// const [isDataLoading, setDataLoading] = useState(true);

export default class MallOverview extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            realData: [],
        };
    }
    

    componentDidMount(){
        // AsyncStorage.getItem("mallDetail").then((result)=> this.setState({mallDetail: JSON.parse(result)})).catch((e)=>console.log(e));
        // console.log("malloverview props: "+JSON.stringify(this.props))
        mallParams = {
            'api_key_private': best_time_api_key_private,
            'venue_name': this.props.mallDetail.name,
            'venue_address': this.props.mallDetail.formatted_address
        }
        fetch('https://besttime.app/api/v1/forecasts?' + new URLSearchParams(mallParams), { method: 'POST' })
            .then((response) => response.json())
            .then((json) => {
                this.setState({ realData: json });
            })
            .finally(() => this.setState({ loading: false }));
    }

    render() {
        return(
            this.state.loading ? (<ActivityIndicator />) : (
            // { isDataLoading?<ActivityIndicator /> : (
            // Main Container
            <ScrollView style={styles.container}>
                <Image style={{marginBottom: 10}} 
                    source={{
                    width: '100%',
                    height: 250,
                    uri: `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI&photoreference=${this.props.mallDetail.photos[0].photo_reference}&maxheight=800`
                }} />
                <View style={styles.container2}>
                    <View style = {styles.seperatorLine}>
                        <Text style={[globalStyles.titleText, {alignSelf: 'center', fontSize: 24, marginTop: -2, marginBottom: 0}]}>
                            {this.props.mallDetail.name}</Text>
                    </View>
                    <View style={styles.textDetailContainer}>
                        <View style = {styles.seperatorLine}>
                            {/* website */}
                            {this.props.mallDetail.website ? (
                            <Text style={[globalStyles.titleText, styles.customText]}>
                                    Website: 
                                    <Text style={globalStyles.normalText}> {this.props.mallDetail.website.slice(0, this.props.mallDetail.website.length-1)}</Text>
                            </Text>) : (
                            <Text style={[globalStyles.titleText, styles.customText]}>
                            Website: 
                            <Text style={globalStyles.normalText}> No Website</Text>
                            </Text>)
                            }
                            

                            {/* address */}
                            <Text style={[globalStyles.titleText, styles.customText]}>
                            Address: 
                            <Text style={globalStyles.normalText}> {this.props.mallDetail.formatted_address}</Text>
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
                            <Text style={globalStyles.normalText}> {this.props.mallDetail.formatted_phone_number}</Text>
                            </Text>) : 
                            (<Text style={[globalStyles.titleText, styles.customText]}>
                            Contact: 
                            <Text style={globalStyles.normalText}> No Contact Number</Text>
                            </Text>)
                            }
                            

                            {/* rating */}
                            <Text style={[globalStyles.titleText, styles.customText]}>
                            Ratings:<Text> </Text> 
                            <StarGenerator rating = {Math.floor( this.props.mallDetail.rating)}/>
                            </Text>
                        </View>
                    </View>
                    <Text style={[globalStyles.titleText, 
                        {marginTop: 15, marginBottom: 10, fontSize: 18}]}>
                            Today's Hourly Crowd Density</Text>
                    {/* <View style = {[styles.seperatorLine]}>
                        <Graph/>
                    </View> */}
                        <View style={{ height: 225, padding: 0, flexDirection: 'row', marginHorizontal: 0, width: '80%', alignSelf: 'center' }}>
                            <YAxis
                                data={this.state.realData.analysis[bestTimeDay].day_raw.slice(3, 17)}
                                style={{ marginBottom: xAxisHeight }}
                                contentInset={verticalContentInset}
                                svg={axesSvg}
                                numberOfTicks={5}
                            />
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <BarChart
                                    style={{ flex: 1 }}
                                    data={this.state.realData.analysis[bestTimeDay].day_raw.slice(3, 17)}
                                    contentInset={verticalContentInset}
                                    svg={{ fill: 'rgb(0, 155, 255)' }}
                                    spacingInner={0.3}
                                    spacingOuter={0}
                                >
                                    <Grid />
                                </BarChart>
                                <XAxis
                                    style={{ marginHorizontal: -5, height: xAxisHeight }}
                                    data={this.state.realData.analysis[bestTimeDay].day_raw.slice(4, 17)}
                                    formatLabel={(value, index) => {
                                        if ((index + 9) % 3 == 0) {
                                            if (index + 9 < 12)
                                                return `${index + 9} am`;
                                            else if (index + 9 == 12)
                                                return `${index + 9} pm`;
                                            else
                                                return `${index - 3} pm`;
                                        } else {
                                            return;
                                        }
                                    }}
                                    contentInset={{ left: 15, right: 20 }}
                                    svg={axesSvg}
                                />
                            </View>
                        </View>
                    <Text style={[globalStyles.titleText, 
                        { marginTop: 15, marginBottom: 10, fontSize: 18}]}>
                            Floor-by-Floor Crowd Density</Text>
                    <View style = {[styles.seperatorLine]}><AnotherGraph mallDetail={this.props.mallDetail} /></View>
                </View>
            </ScrollView>
            // )}
            )
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height:"100%",
        flex: 1,
        padding: 0
        // justifyContent: 'space-evenly',
        // alignItems: 'flex-start',
    },
    container2: {
        width: '100%',
        height:"100%",
        flex: 1,
        // backgroundColor:"red",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // marginHorizontal: 20,
    },

    textDetailContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        padding: 0,
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 5,
    },

    seperatorLine: {
        borderBottomColor: 'white',
        // borderColor: '#222222',
        borderBottomWidth: 0.75,
        alignSelf: 'stretch',
        paddingTop: 5,
        paddingBottom: 5,
        marginHorizontal: 20
    },

    customText: {
        marginVertical: 2,
        fontSize: 18,
    },
})