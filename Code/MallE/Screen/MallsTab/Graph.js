import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { BarChart } from 'react-native-chart-kit';
import {VictoryBar, VictoryChart, VictoryGroup} from "victory-native";

const data = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
        { data: [20, 45, 28, 80, 99, 43], },
    ]
}

export default class MallOverview extends React.Component {
    render() {
        return(
            <View styles = {{flex:1, justifyContent: 'center', alignItem: 'center'}}>
                <BarChart
                    data={data}
                    width={Dimensions.get('window').width}
                    height={300}
                    chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        decimalPlaces: 0,
                        color: (opacity = 0) => `rgba(90, 90, 90, ${opacity})`,
                        style: {borderRadius: 0},
                        propsForBackgroundLines:{stroke:"#ffffff"},
                        barRadius: 16,
                        fillShadowGradient: 'blue',
                        fillShadowGradientOpacity: '4'
                    }}
                    style={{
                        width: Dimensions.get('window').width,
                        marginLeft: -70,
                        marginVertical: 8,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    verticalLabelRotation={45}
                    withHorizontalLabels={false}
                    />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    graphStyle: {
        padding: 5
    }
})
