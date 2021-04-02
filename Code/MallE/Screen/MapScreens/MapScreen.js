import React, { useState, useEffect, Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { Text, ActivityIndicator, StyleSheet, View, Modal, Button, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {CheckBox, CardItem, Card} from "native-base"

import NavBar from '../../layouts/NavBar';

export default function MapScreen() {
    const [isLoading, setLoading] = useState(true);
    const [places, setPlaces] = useState([]);
    const [showPopup, setPopupStatus] = useState(false);
    const [chosenMall, setChosenMall] = useState([]);
    const [isPressed, setIsPressed] = useState(false);
    const colors = ['rgb(0, 255, 128)', 'rgb(255, 128, 128)', 'rgb(255, 255, 0)', 'rgb(0, 255, 128)', 'rgb(255, 255, 0)']

    const navigation = useNavigation();

    const onPressed = async () => {
        if(!isPressed){
            setIsPressed(true);
            AsyncStorage.setItem('bookmarks', chosenMall.name);
            var value = await AsyncStorage.getItem('bookmarks');
            console.log(value)
        }else{
            setIsPressed(false);
            AsyncStorage.removeItem('bookmarks');
        }        
    };

    const data = {
        labels: ["9 am", "12 pm", "3 pm", "6 pm", "9 pm"],
        datasets: [
            {
                data: [70 + Math.random() * (100 - 70),
                       50 + Math.random() * (80 - 50),
                       20 + Math.random() * (50 - 20),
                       80 + Math.random() * (100 - 80),
                       60 + Math.random() * (95 - 60)],
                color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
                strokeWidth: 2
            }
        ],
        legend: ["Crowd Density"]
    };

    useEffect(() => {
        // fetch('https://jsonkeeper.com/b/IGBH')
        //     .then((response) => response.json())
        //     .then((json) => setPlaces(json.data))
        //     .catch((error) => console.error(error))
        //     .finally(() => setLoading(false));
            
        // using google places api to get all the shopping malls in Singapore
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query=Shopping+malls+in+Singapore&key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI", requestOptions)
            .then(response => response.json())
            .then(results => setPlaces(results.results))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false));
            
        
        getMallPopularTimes();
    }, []);

    const getMallPopularTimes = () => {
        // for(let i = 0; i<places.length; i++){
        //     places[i].
        // }
    }

    return (
        <View>
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
                            onPress={() => { setTimeout(() => { setPopupStatus(true); setChosenMall(place); }, 300) }}
                            pinColor="red"
                        />
                    ))}
                </MapView>
            )}
            <Modal
                transparent={true}
                visible={showPopup}
                animationType='slide'
            >
                <View style={styles.outsidePopup}>
                    <View style={styles.insidePopup}>
                        <View style={styles.closeIcon}>
                            <Icon
                                name='close'
                                size={24}
                                type='material'
                                onPress={() => { setPopupStatus(false) }}
                            />
                        </View>
                        <Text style={styles.popupHeading}>{chosenMall.name}</Text>
                        <Image
                            style={styles.image}
                            source={{uri:"https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI&photoreference=ATtYBwJxp6E0bfUJTYikTlpVdy4ZXYh3NUW6_H9I2PLgb1gy2lR7kInNqoKKVkbWi9ncu-SJUDzyuskqZ7PvYL2unEgvesm3rHgz_K3RE91luQEfA1mZjuY12o5d0ZbaXcFuX4VV9Sw-XUUClrlHGMkWCYH12kMvltJpPfn7yZ0Ha1tseCsy&maxwidth=400"}}
                        />
                        <Text style={styles.popupText}><Text style={{ fontWeight: 'bold' }}>Address:</Text> {chosenMall.formatted_address}</Text>
                        <Text style={styles.popupText}><Text style={{ fontWeight: 'bold' }}>Opening Hours:</Text> 10 am - 10 pm</Text>
                        
                        <Card>
                            <CardItem body>
                                <Text style={{marginLeft:20}}>Bookmark: </Text>
                                <CheckBox checked={isPressed} 
                                    style={{marginLeft:30}}
                                    onPress={() => onPressed()}
                                />
                            </CardItem>
                        </Card>
                        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Today's Crowd Density Trend:</Text>
                        <LineChart
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
                        />
                        <TouchableOpacity style={styles.moreInfoButton}>
                            <Button
                                title="More Information..."
                                onPress={() => { 
                                    setPopupStatus(false)
                                    navigation.navigate("Malls", chosenMall)
                                 }}
                            >
                            </Button>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>        
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
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },

    popupText: {
        fontSize: 14,
        marginBottom: 2,
    },

    closeIcon: {
        position: 'absolute',
        right: 15,
        top: 15,
    },

    MallDensityLineChart: {
        marginTop: 10,
        alignSelf: 'center',
        paddingRight: 25,
        paddingLeft: 25,
        paddingBottom: 14,
    }
});
