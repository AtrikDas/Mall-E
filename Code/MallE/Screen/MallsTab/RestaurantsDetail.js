import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';

import {globalStyles} from '../../ThemesAndFonts';
import RatingsComponent from "../MallsTab/ratingsComponent";
import { LineChart, BarChart } from 'react-native-chart-kit';
const Separator = () => <View style={styles.separator} />;
const data = {
  labels: ["9 am", "12 pm", "3 pm", "6 pm", "9 pm"],
  datasets: [
    {
      data: [20 + Math.random() * (30 - 20),
      10 + Math.random() * (20 - 10),
      8 + Math.random() * (15 - 8),
      15 + Math.random() * (20 - 15),
      20 + Math.random() * (25 - 20)],
      color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
      strokeWidth: 2
    }
  ],
};

export default class RestarantsFragment extends React.Component {
  
  restaurantDetails = this.props.route.params
  
  componentDidMount(){
    console.log(this.props.route.params)
      // var myHeaders = new Headers();
      // myHeaders.append("Cookie", "__cfduid=dc1330063cebaf9c65b9be7a32f19a1651615999201");
      
      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   redirect: 'follow'
      // };
      
      // fetch("https://BestTime.app/api/v1/forecasts?api_key_private=pri_ec5e87efe7174865a4b557e9c175058e&venue_name=McDonalds&venue_address=Ocean Ave, San Fransisco", requestOptions)
      //   .then(response => response.text())
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error));
  }
  imageURL = "../../Image/" + this.restaurantDetails.imageURL
  render() {
    return (
      <View style={styles.ContainerOne}>
        <ScrollView>
          {/* restaurant image */}
          <Image
            style={{width: '100%',height: 200,}}
            source={{uri:this.restaurantDetails.imageURL}}
          />
          {/* restaurant details */}
          <Text style={[globalStyles.titleText, styles.popupHeading]}> {this.restaurantDetails.name}</Text>
          <View style={styles.TextDetailContainer}>
            <Text style={[globalStyles.titleText, styles.customText]}>
              Website:
              <Text style={globalStyles.normalText}> {this.restaurantDetails.website}
              </Text>
            </Text>

            <Text style={[globalStyles.titleText, styles.customText]}>
              Location:
              <Text style={globalStyles.normalText}> {this.restaurantDetails.location}
              </Text>
            </Text>

            <Text style={[globalStyles.titleText, styles.customText]}>
              Hours:
              <Text style={globalStyles.normalText}> Open {this.restaurantDetails.openTiming} ⋅ Closes {this.restaurantDetails.closingTimeing}</Text>
            </Text>

            <Text style={[globalStyles.titleText, styles.customText]}>
              Contact:
              <Text style={globalStyles.normalText}> {this.restaurantDetails.contact}</Text>
            </Text>

            <Text style={[globalStyles.titleText, styles.customText]}>
              Ratings: <RatingsComponent rating={this.restaurantDetails.rating}/>
            </Text>

            <Text style={[globalStyles.titleText, styles.customText]}>
              Estimated Waiting Time:{' '}
              <Text style={globalStyles.normalText}> 20-30 Minutes</Text>
            </Text>

            <Separator />

            <Text style={[globalStyles.titleText, styles.popupHeading, {fontSize: 20}]}>Today's Waiting Times</Text>
          </View>
          <LineChart
            data={data}
            width={Dimensions.get('window').width * 0.6}
            height={200}
            verticalLabelRotation={0}
            // withInnerLines={true}
            chartConfig={{
              backgroundColor: "grey",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ContainerOne: {
    width: '100%',
    height: '100%',    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  TextDetailContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 5,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  customText: {
    paddingVertical: 2,
},
popupHeading: {
  fontSize: 24,
  alignSelf: 'center',
  marginBottom: 10,
  marginTop: 10,
  fontWeight: 'bold',
},

  MallDensityLineChart: {
    marginTop: 10,
    alignSelf: 'center',
    paddingRight: 25,
    paddingLeft: 25,
    paddingBottom: 14,
  }
});
