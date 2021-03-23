import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { BarChart } from 'react-native-chart-kit';

const data = {
    labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    datasets: [
        { data: [20, 45, 28, 80, 99, 43, 50], },
    ],
}

export default class Graph extends React.Component {

    render() {
        return(
            //Main Container
            <View styles = {styles.container}>

                <BarChart
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
                    />
                    
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
