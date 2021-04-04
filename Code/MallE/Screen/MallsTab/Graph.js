import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

// import { BarChart } from 'react-native-chart-kit';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'

const data = {
    labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    datasets: [
        { data: [20 + Math.random() * (30),
            45 + Math.random() * (30),
            28 + Math.random() * (30),
            80 + Math.random() * (30),
            99 + Math.random() * (30),
            43 + Math.random() * (20),
            50 + Math.random() * (10)] }, 
        ,
    ],
}
const axesSvg = { fontSize: 11, fill: 'rgb(32,32,32)' };
const verticalContentInset = { top: 10, bottom: 10 };
const xAxisHeight = 30;

const realData = [20 + Math.random() * (30),
    45 + Math.random() * (30),
    28 + Math.random() * (30),
    80 + Math.random() * (30),
    99 + Math.random() * (30),
    43 + Math.random() * (20),
    50 + Math.random() * (10)]

export default class Graph extends React.Component {

    render() {
        return(
            //Main Container
            <View styles = {styles.container}>
                <View style={{ height: 200, padding: 0, flexDirection: 'row' }}>
                    <YAxis
                        data={realData}
                        style={{ marginBottom: xAxisHeight }}
                        contentInset={verticalContentInset}
                        svg={axesSvg}
                        numberOfTicks={5}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <BarChart
                            style={{ flex: 1 }}
                            data={realData}
                            contentInset={verticalContentInset}
                            svg={{ fill: 'rgb(0, 155, 255)' }}
                            spacingInner={0.3}
                            spacingOuter={0}
                        >
                            <Grid />
                        </BarChart>
                        <XAxis
                            style={{ marginHorizontal: -5, marginTop: 0, marginBottom: -5, height: xAxisHeight }}
                            data={realData}
                            formatLabel={(value, index) => {
                                // if ((index + 9) % 3 == 0) {
                                //     if (index + 9 < 12)
                                //         return `${index + 9} am`;
                                //     else if (index + 9 == 12)
                                //         return `${index + 9} pm`;
                                //     else
                                //         return `${index - 3} pm`;
                                // } else {
                                //     return;
                                // }
                                index;
                            }}
                            contentInset={{ left: 15, right: 20 }}
                            svg={axesSvg}
                        />
                    </View>
                </View>
                {/* <BarChart
                    data={data}
                    width={Dimensions.get('window').width}
                    height={300}
                    withHorizontalLabels={true}
                    fromZero={true}
                    withInnerLines={false}
                    chartConfig={{
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        fillShadowGradient: 'blue',
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
                    verticalLabelRotation={0}
                    /> */}
                    
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
})
