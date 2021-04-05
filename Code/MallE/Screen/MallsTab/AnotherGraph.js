import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Text } from 'react-native';

import { BarChart } from 'react-native-chart-kit';

export default function AnotherGraph() {
    const [isLoading, setLoading] = useState(true);
    const [test, setData] = useState([]);

    useEffect(() => {
        fetch('https://jsonkeeper.com/b/MS3Z')
            .then((response) => response.json())
            .then((json) => setData(json.data)) 
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const data = {
        labels: ['L3', 'L2', 'L1', 'B1', 'B2'],
        datasets: [
            { data: [20, 45, 28, 80, 99], },
        ]
    }

    return(
        <View styles={{transform: [{rotate: "90deg"}]}}>
            {test.map((item) => {
                <Text>{item.name.toString()}</Text>
                console.log(JSON.stringify(item.crowd))
            })}
            <View styles = {styles.container}>

                {isLoading ? <ActivityIndicator/> : (
                <BarChart
                    data = {data}
                    width={Dimensions.get('window').width}
                    height={300}
                    withHorizontalLabels={true}
                    fromZero={true}
                    withInnerLines={false}
                    chartConfig={{
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        fillShadowGradient: 'red',
                        fillShadowGradientOpacity: '5',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(90, 90, 90, ${opacity})`,
                        barPercentage: 0.6,
                        barRadius: 16,
                    }}
                    style={{
                        width: '100%',
                        marginLeft: -Dimensions.get('window').width * 0.1,
                        padding: 5,
                        borderRadius: 10,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        flex: 1
                    }}
                    horizontalLabelRotation={0}
                    verticalLabelRotation={0}
                />)}

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
