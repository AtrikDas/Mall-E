import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { BarChart } from 'react-native-chart-kit';
import {VictoryBar, VictoryChart, VictoryGroup} from "victory-native";

const data = {
    labels: ['L3', 'L2', 'L1', 'B1', 'B2'],
    datasets: [
        { data: [20, 45, 28, 80, 99], },
    ]
}

export default class AnotherGraph extends React.Component {
    render() {
        return(
            <View styles = {{}}>
                <BarChart
                    data={data}
                    width={Dimensions.get('window').width}
                    height={400}
                    chartConfig={{
                        // backgroundColor: 'grey',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 0) => `rgba(90, 90, 90, ${opacity})`,
                        style: {borderRadius: 0},
                        propsForBackgroundLines:{stroke:"#ffffff"},
                        barRadius: 16,
                        fillShadowGradient: 'red',
                        fillShadowGradientOpacity: '8'
                    }}
                    style={{
                        width: Dimensions.get('window').width,
                        marginLeft: Dimensions.get('window').width * -0.15,
                        marginVertical: 10,
                        marginBottom: -30,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    verticalLabelRotation={-90}
                    withHorizontalLabels={false}
                    />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    graphStyle: {
        padding: 5,
    },

    graphView: {
        height: 100,
        width: 100,
        borderRadius: 5,
        marginVertical: 40,
        backgroundColor: "#61dafb",
        alignItems: "center",
        justifyContent: "center"
    }
})
