import React, { useState, useEffect, Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { Text, ActivityIndicator, StyleSheet, View, Modal, Button, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { CheckBox, CardItem, Card } from "native-base"

import * as RootNavigation from '../../layouts/RootNavigation';

import NavBar from '../../layouts/NavBar';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'

// import { LineChart, BarChart } from 'react-native-chart-kit';

export default function MapScreen() {
    const [isLoading, setLoading] = useState(true);
    const [isDataLoading, setDataLoading] = useState(true);
    const [isPlacesLoading, setPlacesLoading] = useState(true);
    const [places, setPlaces] = useState([]);
    const [realData, setRealData] = useState([]);
    // const [fullData, setFullData] = useState();
    const [showPopup, setPopupStatus] = useState(false);
    const [chosenMall, setChosenMall] = useState([]);
    const [isPressed, setIsPressed] = useState(false);
    const colors = ['rgb(0, 255, 128)', 'rgb(255, 128, 128)', 'rgb(255, 255, 0)', 'rgb(0, 255, 128)', 'rgb(255, 255, 0)'];
    const data = [80, 85, 55, 40, 60, 50, 30, 25, 35, 50, 80, 85, 90, 70, 60, 10];

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
    // var pinColors = {};
    const [pinColorsDict, setPinColorsDict] = useState({});


    const onPressed = async () => {
        let bookmarks = []
        if (!isPressed) {
            setIsPressed(true);
            const existingBookmarks = await AsyncStorage.getItem('bookmarks')
            bookmarks = JSON.parse(existingBookmarks);
            if (!bookmarks) {
                bookmarks = []
            }
            let list = []
            console.log(chosenMall.name)
            bookmarks.push(chosenMall.name);
            AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks))
                .then(() => {
                    console.log(bookmarks)
                })
                .catch(() => {
                    console.log('There was an error')
                });
        } else {
            setIsPressed(false);
        }


    };

    useEffect(() => {
        // using google places api to get all the shopping malls in Singapore
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query=Shopping+malls+in+Singapore&key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI", requestOptions)
            .then(response => response.json())
            .then(results => {
                setPlaces(results.results);
                getAllMallData(results.results);
                AsyncStorage.setItem("mallList", JSON.stringify(results.results)).then(() => console.log("set mallList")).catch((e) => console.log(e));
            })
            .catch(error => console.log('error', error));
    }, []);

    const getAllMallData = (places) => {
        console.log("Ran getAllMallData");
        var pinColors = {};
        for (let i = 0; i < places.length; i++) { // places.length
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
                        crowdDensity = fullData[places[i].name].analysis[5].day_raw[6];
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
        mallParams = {
            'api_key_private': best_time_api_key_private,
            'venue_name': place.name,
            'venue_address': place.formatted_address
        }
        // setDataLoading(true);
        fetch('https://besttime.app/api/v1/forecasts?' + new URLSearchParams(mallParams), { method: 'POST' })
            .then((response) => response.json())
            .then((json) => setRealData(json))
            .finally(() => setDataLoading(false));

        // var day = new Date().getDay();
        // var date = new Date().getDate();
        // var hour = new Date().getHours();
        // console.log(pinColors);
        // console.log(fullData);
        // console.log(date);
        // console.log(hour);
    }

    const handleClose = () => {
        setIsPressed(false);
    };

    return (
        <View style={{ flex: 1 }}>
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
                                setTimeout(() => {
                                    getMallPopularTimes(place);
                                },
                                    300);
                                setPopupStatus(true);
                            }}
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
                                source={{ uri: "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI&photoreference=ATtYBwJxp6E0bfUJTYikTlpVdy4ZXYh3NUW6_H9I2PLgb1gy2lR7kInNqoKKVkbWi9ncu-SJUDzyuskqZ7PvYL2unEgvesm3rHgz_K3RE91luQEfA1mZjuY12o5d0ZbaXcFuX4VV9Sw-XUUClrlHGMkWCYH12kMvltJpPfn7yZ0Ha1tseCsy&maxwidth=400" }}
                            />
                            <Text style={styles.popupText}><Text style={{ fontWeight: 'bold' }}>Address:</Text> {chosenMall.formatted_address}</Text>
                            <Text style={styles.popupText}><Text style={{ fontWeight: 'bold' }}>Opening Hours:</Text> 10 am - 10 pm</Text>

                            <Card>
                                <CardItem body>
                                    <Text style={{ marginLeft: 20 }}>Bookmark: </Text>
                                    <CheckBox checked={isPressed}
                                        style={{ marginLeft: 30 }}
                                        onPress={() => onPressed()}
                                    />
                                </CardItem>
                            </Card>
                            <Text style={{ fontWeight: 'bold', marginTop: 5, marginBottom: 4 }}>Today's Crowd Density Trend:</Text>
                            <View style={{ height: 200, padding: 0, flexDirection: 'row' }}>
                                <YAxis
                                    data={realData.analysis[5].day_raw.slice(3, 17)}
                                    style={{ marginBottom: xAxisHeight }}
                                    contentInset={verticalContentInset}
                                    svg={axesSvg}
                                    numberOfTicks={5}
                                />
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <BarChart
                                        style={{ flex: 1 }}
                                        data={realData.analysis[5].day_raw.slice(3, 17)}
                                        contentInset={verticalContentInset}
                                        svg={{ fill: 'rgb(0, 155, 255)' }}
                                        spacingInner={0.3}
                                        spacingOuter={0}
                                    >
                                        <Grid />
                                    </BarChart>
                                    <XAxis
                                        style={{ marginHorizontal: -5, height: xAxisHeight }}
                                        data={realData.analysis[5].day_raw.slice(4, 17)}
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
                                        RootNavigation.navigate("Body", chosenMall);
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