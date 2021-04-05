import React, { useState, useEffect, Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { Text, ActivityIndicator, StyleSheet, View, Modal, Button, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {CheckBox, CardItem, Card} from "native-base"

import * as RootNavigation from '../../layouts/RootNavigation';

import NavBar from '../../layouts/NavBar';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'

export default function MapScreen() {
    const [isLoading, setLoading] = useState(true);
    const [isDataLoading, setDataLoading] = useState(true);
    const [isPlacesLoading, setPlacesLoading] = useState(true);
    const [places, setPlaces] = useState([]);
    const [realData, setRealData] = useState([]);
    // const [graphData, setGraphData] = useState([]);
    const [showPopup, setPopupStatus] = useState(false);
    const [chosenMall, setChosenMall] = useState([]);
    const [isPressed, setIsPressed] = useState(false);
    const colors = ['rgb(0, 255, 128)', 'rgb(255, 128, 128)', 'rgb(255, 255, 0)', 'rgb(0, 255, 128)', 'rgb(255, 255, 0)'];
    const data = [80, 85, 55, 40, 60, 50, 30, 25, 35, 50, 80, 85, 90, 70, 60, 10];
    
    var date = new Date().getDate();
    var day = new Date().getDay(); // JS: 0 = Sunday, 6 = Saturday
    var bestTimeDay = (day > 0) ? (day - 1) : (6); // Best-Time: 0 = Monday, 6 = Sunday
    var hour = new Date().getHours();
    var bestTimeHour = hour - 6;

    const axesSvg = { fontSize: 11, fill: 'rgb(32,32,32)' };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 30;
    
    const navigation = useNavigation();

    const best_time_api_key_private = 'pri_c3ae9a3d6cea4bbaa667993561b37256';
    const best_time_api_key_public = 'pub_ea53baaf28f34149b3caeb66139cd2f7';
    const params = {
        'api_key_private': best_time_api_key_private,
        'venue_name': 'Jurong Point',
        'venue_address': '1 Jurong West Central 2, Singapore'
    }

    var fullData = {};
    var graphData = [];
    const [pinColorsDict, setPinColorsDict] = useState({});

    const data1 = [14, -1, 100, -95, -94, -24, -8, 85, -91, 35, -53, 53, -78, 66, 96, 33, -26, -32, 73, 8]
        .map((value) => ({ value }))
    const data2 = [24, 28, 93, 77, -42, -62, 52, -87, 21, 53, -78, -62, -72, -6, 89, -70, -94, 10, 86, 84]
        .map((value) => ({ value }))

    const barData_ = [
        {
            data: data1,
            svg: {
                fill: 'rgb(134, 65, 244)',
            },
        },
        {
            data: data2,
        },
    ]


    const onPressed = async () => {
        let bookmarks = []
        if(!isPressed){
            setIsPressed(true);
            const existingBookmarks = await AsyncStorage.getItem('bookmarks')
            bookmarks = JSON.parse(existingBookmarks);
            if( !bookmarks ){
                bookmarks = []
            }
            bookmarks.push(chosenMall.name);
            AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks))
            .then( ()=>{
                console.log(bookmarks)
                } )
                .catch( ()=>{
                    console.log('There was an error')
                    } );
        }else{
            setIsPressed(false);
        }     
        
        
    };

    useEffect(() => {
        // using google places api to get all the shopping malls in Singapore
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
        fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query=Shopping+malls+in+Singapore&radius=7500&key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI", requestOptions)
            .then(response => response.json())
            .then(results => {
                setPlaces(results.results);
                getAllMallData(results.results);
                AsyncStorage.setItem("mallList", JSON.stringify(results.results)).then(() => console.log("set mallList")).catch((e)=> console.log(e));
            })
            .catch(error => console.log('error', error));
    }, []);

    const getAllMallData = (places) => {
        console.log("Ran getAllMallData");
        var pinColors = {};
        for (let i=0; i < places.length; i++) {
            mallParams = {
                'api_key_private': best_time_api_key_private,
                'venue_name': places[i].name,
                'venue_address': places[i].formatted_address
            }
            fetch('https://besttime.app/api/v1/forecasts?' + new URLSearchParams(mallParams), { method: 'POST' })
                .then((response) => response.json())
                .then((json) => {
                    fullData[places[i].name] = json;
                    try {
                        // console.log(bestTimeDay);
                        // console.log(bestTimeHour);
                        crowdDensity = fullData[places[i].name].analysis[bestTimeDay].day_raw[bestTimeHour];
                        if (crowdDensity > 80)
                            pinColors[places[i].name] = "rgb(255,32,32)";
                        else if (crowdDensity > 60)
                            pinColors[places[i].name] = "rgb(128,128,0)";
                        else
                            pinColors[places[i].name] = "rgb(0,255,128)";
                        setPinColorsDict(pinColors);
                    }
                    catch {
                        // console.log(fullData[places[i].name]);
                    }
                })
                .catch(error => console.log('error', error))
                .finally(() => {
                    if (i == places.length - 1)
                        setLoading(false);
                });
        }
    }

    const getMallPopularTimes = (place) => {
        // var graphData_ = [];
        var barData = [];
        var temp = 0;
        var beforeCurrHour = [];
        var currHour = [];
        var afterCurrHour = [];
        mallParams = {
            'api_key_private': best_time_api_key_private,
            'venue_name': place.name,
            'venue_address': place.formatted_address
        }
        fetch('https://besttime.app/api/v1/forecasts?' + new URLSearchParams(mallParams), { method: 'POST' })
            .then((response) => response.json())
            .then((json) => {
                setRealData(json);
                for (let i = 4; i < 17; i++) {
                    temp = json.analysis[bestTimeDay].day_raw[i];
                    // console.log(i);
                    // console.log(temp);
                    if (i < bestTimeHour)
                        beforeCurrHour.push(temp);
                    else if (i == bestTimeHour)
                        currHour.push(temp);
                    else 
                        afterCurrHour.push(temp);
                }
                try {
                    beforeCurrHour = beforeCurrHour.map((value) => ({ value }));
                    currHour = currHour.map((value) => ({ value }));
                    afterCurrHour = afterCurrHour.map((value) => ({ value }));
                }
                catch {
                    console.log("error bruh"); 
                }
                // console.log(beforeCurrHour);
                // console.log(currHour);
                // console.log(afterCurrHour);
                barData = [
                    {
                        data: beforeCurrHour,
                        svg: {
                            fill: 'rgb(0, 128, 255)',
                        },
                    },
                    {
                        data: currHour,
                        svg: {
                            fill: 'rgb(255, 64, 64)',
                        },
                    },
                    {
                        data: afterCurrHour,
                        svg: {
                            fill: 'rgb(134, 65, 244)',
                        },
                    },
                ]
                // console.log(barData);
                // console.log(beforeCurrHour);
                // console.log(currHour);
                // console.log(afterCurrHour);
                graphData = barData;
                // setGraphData(barData);
                console.log(graphData);
            })
            .finally(() => setDataLoading(false));
        
        
        // var day = new Date().getDay();
        // var date = new Date().getDate();
        // var hour = new Date().getHours();

        // console.log(date);
        // console.log(day);
        // console.log(hour);
        // console.log(bestTimeDay);
        // console.log(bestTimeHour);
    }   

    const handleClose = () => {
        setIsPressed(false);
      };
    
    return (
        <View style={{flex:1}}>
            {isLoading ? <ActivityIndicator /> : (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: 1.33,
                        longitude: 103.825,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.1,
                    }}
                >
                    {places.map((place) => (
                        <Marker
                            key={place.place_id}
                            coordinate={{
                                latitude: place.geometry.location.lat,
                                longitude: place.geometry.location.lng,
                            }}
                            title={place.name}
                            description={place.formatted_address}
                            onPress={() => { 
                                setChosenMall(place);
                                setTimeout(() => 
                                {  
                                    getMallPopularTimes(place);
                                }, 
                                300);
                                setPopupStatus(true);}}
                            pinColor={pinColorsDict[place.name]}
                        />
                    ))}
                </MapView>
            )}
            {isDataLoading ? <ActivityIndicator /> : (
            <Modal
                transparent={true}
                visible={showPopup}
                animationType='slide'
                onRequestClose={() => {
                    handleClose();
                    setPopupStatus(!showPopup);
                  }}
            >
                <View style={styles.outsidePopup}>
                    <View style={styles.insidePopup}>
                        <View style={styles.closeIcon}>
                            <Icon
                                name='close'
                                size={24}
                                type='material'
                                onPress={() => { setPopupStatus(false); setDataLoading(true) }}
                            />
                        </View>
                        <Text style={styles.popupHeading}>{chosenMall.name}</Text>
                        <Image 
                            style={styles.image}
                            source={{
                            width: '100%',
                            height: 300,
                            uri: `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI&photoreference=${chosenMall.photos[0].photo_reference}&maxheight=400`
                        }} />
                        <Text style={styles.popupText}><Text style={{ fontWeight: 'bold' }}>Address:</Text> {chosenMall.formatted_address}</Text>
                        <Text style={styles.popupText}><Text style={{ fontWeight: 'bold' }}>Opening Hours:</Text> 10 am - 10 pm</Text>
                        {/* <Text style={styles.popupText}><Text style={{ fontWeight: 'bold' }}>Opening Hours:</Text> {realData.analysis[bestTimeDay].day_info.venue_open} hrs - {realData.analysis[bestTimeDay].day_info.venue_closed} hrs</Text> */}
                        
                        <Card>
                            <CardItem body>
                                <Text style={{marginLeft:20}}>Bookmark: </Text>
                                <CheckBox checked={isPressed} 
                                    style={{marginLeft:30}}
                                    onPress={() => onPressed()}
                                />
                            </CardItem>
                        </Card>
                        <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom:5 }}>Today's Crowd Density Trend:</Text>
                        <View style={{ height: 200, padding: 0, flexDirection: 'row' }}>
                            <YAxis
                                data={realData.analysis[bestTimeDay].day_raw.slice(3, 17)}
                                style={{ marginBottom: xAxisHeight }}
                                contentInset={verticalContentInset}
                                svg={axesSvg}
                                numberOfTicks={5}
                            />
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                {/* <BarChart
                                    style={{ flex: 1 }}
                                    data={ graphData }
                                    yAccessor={({ item }) => item.value}
                                    svg={{
                                        fill: 'blue',
                                    }}
                                    contentInset={verticalContentInset}
                                    spacingInner={0.3}
                                    spacingOuter={0}
                                    { ...this.props }
                                >
                                    <Grid/>
                                </BarChart> */}
                                <BarChart
                                    style={{ flex: 1 }}
                                    data={realData.analysis[bestTimeDay].day_raw.slice(3, 17)}
                                    contentInset={verticalContentInset}
                                    svg={{ fill: 'rgb(0, 155, 255)' }}
                                    spacingInner={0.3}
                                    spacingOuter={0}
                                >
                                    <Grid />
                                </BarChart>
                                <XAxis
                                    style={{ marginHorizontal: -5, height: xAxisHeight }}
                                    data={realData.analysis[bestTimeDay].day_raw.slice(4, 17)}
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
                        
                        <TouchableOpacity style={styles.moreInfoButton}>
                            <Button
                                title="More Information..."
                                onPress={() => { 
                                    setPopupStatus(false);
                                    // navigation.navigate("Malls", chosenMall)
                                    // navigation.navigate('Body',chosenMall);
                                    navigation.navigate('Malls');
                                    RootNavigation.navigate("Body",chosenMall);
                                    console.log("button pressed");
                                 }}
                            >
                            </Button>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
    },

    outsidePopup: {
        backgroundColor: '#000000aa',
        flex: 1,
    },

    insidePopup: {
        backgroundColor: '#ffffff',
        margin: 50,
        padding: 35,
        borderRadius: 10,
        flex: 1,
    },

    moreInfoButton: {
        marginBottom: 5,
        marginTop: -5
    },

    image: {
        width: '100%',
        height: '25%',
        marginBottom: 15,
    },

    popupHeading: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: -5,
        marginHorizontal: -10,
        fontWeight: 'bold',
    },

    popupText: {
        fontSize: 14,
        marginBottom: 2,
    },

    closeIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
    },

    MallDensityLineChart: {
        marginTop: 10,
        alignSelf: 'center',
        paddingRight: 25,
        paddingLeft: 25,
        paddingBottom: 14,
    }
});


// OLD LINE CHART USING REACT-NATIVE-CHART-KIT
{/* <LineChart
                            data={data}
                            width={Dimensions.get('window').width * 0.6}
                            height={150}
                            verticalLabelRotation={0}
                            chartConfig={{
                                backgroundColor: "#ffffff",
                                backgroundGradientFrom: "#ffffff",
                                backgroundGradientTo: "#ffffff",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                    alignSelf: 'center'
                                },
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "2",
                                    stroke: "rgb(0,0,255)"
                                }
                            }}
                            fromZero={true}
                            bezier
                            style={styles.MallDensityLineChart}
                        /> */}

// const data_old = {
//     labels: ["9 am", "12 pm", "3 pm", "6 pm", "9 pm"],
//     datasets: [
//         {
//             data: [70 + Math.random() * (100 - 70),
//                    50 + Math.random() * (80 - 50),
//                    20 + Math.random() * (50 - 20),
//                    80 + Math.random() * (100 - 80),
//                    60 + Math.random() * (95 - 60)],
//             color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
//             strokeWidth: 2
//         }
//     ],
//     legend: ["Crowd Density"]
// };