import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Text } from 'react-native';

import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'

export default function AnotherGraph(props) {
    const [isLoading, setLoading] = useState(true);
    const [chosenMallFloorData, setChosenMallFloorData] = useState([]);

    useEffect(() => {

        fetch('https://jsonkeeper.com/b/1N6P')
            .then((response) => response.json())
            .then((result) => {

                console.log("jsonkeeper "+ JSON.stringify(result.data));
                
                for(let i=0; i<result.data.length; i++){
                    if(props.mallDetail.name.localeCompare(result.data[i].name) == 0){
                        setChosenMallFloorData(result.data[i]);
                    }
                }

                console.log("chosenmallFloorData "+ JSON.stringify(chosenMallFloorData));
            }) 
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const axesSvg = { fontSize: 11, fill: 'rgb(32,32,32)' };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 30;

    return(
        <View styles={{transform: [{rotate: "90deg"}]}}>
            <View styles = {styles.container}>

                {isLoading ? <ActivityIndicator/> : (
                <View style={{ height: 225, padding: 0, flexDirection: 'row', width: '90%', alignSelf: 'center' }}>
                <YAxis
                    data={chosenMallFloorData.crowd}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                    numberOfTicks={5}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <BarChart
                        style={{ flex: 1 }}
                        data={chosenMallFloorData.crowd}
                        contentInset={verticalContentInset}
                        svg={{ fill: 'rgb(216, 64, 64)' }}
                        spacingInner={0.45}
                        spacingOuter={0}
                    >
                        <Grid />
                    </BarChart>
                    <XAxis
                        style={{ marginHorizontal: -2, marginTop: 10, marginBottom: 5, height: xAxisHeight }}
                        data={chosenMallFloorData.crowd}
                        formatLabel={(value, index) => {
                            return chosenMallFloorData.level[index];
                        }}
                        contentInset={{ left: 15, right: 20 }}
                        svg={axesSvg}
                    />
                </View>
            </View>)}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
})
