import React, { useState, useEffect, Component } from 'react';

import type { Node } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { Text, ActivityIndicator, StyleSheet, View, Modal, Button, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

export default function MapScreen() {
    const [isLoading, setLoading] = useState(true);
    const [places, setPlaces] = useState([]);
    const [showPopup, setPopupStatus] = useState(false);
    const [chosenMall, setChosenMall] = useState([]);
    const colors = ['rgb(0, 255, 128)', 'rgb(255, 128, 128)', 'rgb(255, 255, 0)', 'rgb(0, 255, 128)', 'rgb(255, 255, 0)']

    const navigation = useNavigation();

    const data = {
        labels: ["9 am", "12 pm", "3 pm", "6 pm", "9 pm"],
        datasets: [
            {
                data: [60, 40, 80, 75, 85],
                color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
                strokeWidth: 2
            }
        ],
        legend: ["Crowd Density"]
    };

    useEffect(() => {
        fetch('https://jsonkeeper.com/b/IGBH')
            .then((response) => response.json())
            .then((json) => setPlaces(json.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

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
                            key={place.id}
                            coordinate={{
                                latitude: place.latitude,
                                longitude: place.longitude,
                            }}
                            title={place.name}
                            description={place.address}
                            onPress={() => { setTimeout(() => { setPopupStatus(true); setChosenMall(place); }, 300) }}
                            pinColor={colors[place.id - 1]}
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
                            source={{
                                uri: chosenMall.imageURL,
                            }}
                        />
                        <Text style={styles.popupText}><Text style={{ fontWeight: 'bold' }}>Address:</Text> {chosenMall.address}</Text>
                        <Text style={styles.popupText}><Text style={{ fontWeight: 'bold' }}>Latitude:</Text> {chosenMall.latitude} N</Text>
                        <Text style={styles.popupText}><Text style={{ fontWeight: 'bold' }}>Longitude:</Text> {chosenMall.longitude} E</Text>
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
