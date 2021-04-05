import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';

import {globalStyles} from '../../ThemesAndFonts';
import RatingsComponent from "../MallsTab/ratingsComponent";
import { LineChart, BarChart } from 'react-native-chart-kit';
import config from "../config.json"

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
  state= {
    popularTime: null
  }
  restaurantDetails = this.props.route.params

  DateComponent = ()=>{
    

    if(this.restaurantDetails.opening_hours != null) {
        if(this.restaurantDetails.opening_hours.open_now == true){
             //shop is open
            return (<View>
                <Text style = {textStyles.openText}>Open</Text>
                {/* <Text style = {textStyles.closeText}>Closes {closingTimeing.format(" h:mma")}</Text> */}
                </View>)
        }else{
            return (<Text style = {textStyles.closeText}>Closed</Text>)
        }
       
    }else{
        //shop is closed
        return (<Text style = {textStyles.closeText}>Closed</Text>)
    }
    
}
  
  componentDidMount(){
    console.log(this.props.route.params)
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    fetch(`http://10.0.2.2:5000/pythonAPI?place_id=${this.restaurantDetails.place_id}`, requestOptions)
    .then(response => response.json())
    .then(results => {
        this.setState({popularTime: results})
        console.log("popular times "+ JSON.stringify(this.state.popularTime));

        
    })
      .catch(error => console.log('error', error));
      
  }

  imageURL = "../../Image/" + this.restaurantDetails.imageURL;

  calculateWaitingTime = ()=>{
    if(this.state.popularTime != null){
        var day = new Date().getDay();
        var date = new Date().getDate();
        var hour = new Date().getHours();
        console.log("day"+day+"date"+date+"hour"+hour);

        let crowdDensity = this.state.popularTime.populartimes[(day-1)%7].data[hour];

      if (this.restaurantDetails.opening_hours != null) {
        if (this.restaurantDetails.opening_hours.open_now == true) {
          if (crowdDensity > 0 && crowdDensity <= 30) {
            return "< 5 minutes"
          } else if (crowdDensity > 30 && crowdDensity <= 50) {
            return "5 to 15 minutes"
          } else if (crowdDensity > 50 && crowdDensity <= 80) {
            return "15 to 30 minutes"
          } else {
            return "30 to 45 minutes"
          }
        } else {
          return "N/A"
        }
      } else {
        return "N/A"
      }
    }
        

  }

  render() {
    return (
      
      <View style={styles.ContainerOne}>
        <ScrollView>
          {/* restaurant image */}
          <Image
            style={{width: '100%',height: 200,}}
            source={{uri:`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI&photoreference=${this.restaurantDetails.photos[0].photo_reference}&maxheight=200`}}
          />
          {/* restaurant details */}
          <Text style={[globalStyles.titleText, styles.popupHeading]}>{this.restaurantDetails.name}</Text>
          <View style={styles.TextDetailContainer}>
            {/* <Text style={[globalStyles.titleText, styles.customText]}>
              Website:
              <Text style={globalStyles.normalText}> {this.restaurantDetails.website}
              </Text>
            </Text> */}

            <Text style={[globalStyles.titleText, styles.customText]}>
              Location:
              <Text style={globalStyles.normalText}> {this.restaurantDetails.formatted_address}
              </Text>
            </Text>

            <Text style={[globalStyles.titleText, styles.customText]}>
              Hours:{" "}
              {this.DateComponent()}
            </Text>

            {/* <Text style={[globalStyles.titleText, styles.customText]}>
              Contact:
              <Text style={globalStyles.normalText}> {this.restaurantDetails.contact}</Text>
            </Text> */}

            <Text style={[globalStyles.titleText, styles.customText]}>
              Ratings: <RatingsComponent rating={this.restaurantDetails.rating}/>
            </Text>

            <Text style={[globalStyles.titleText, styles.customText]}>
              Estimated Waiting Time:{' '}
              <Text style={globalStyles.normalText}> {this.calculateWaitingTime()}</Text>
            </Text>

            <Separator />

            {/* <Text style={[globalStyles.titleText, styles.popupHeading, {fontSize: 20}]}>Today's Waiting Times</Text> */}
          </View>
          {/* <LineChart
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
          /> */}
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
    backgroundColor: '#ffffff',
  },
  TextDetailContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 5,
    marginHorizontal: 20,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  customText: {
    paddingVertical: 2,
    alignItems:"center",
    justifyContent:"center",
    fontSize: 18,
},
popupHeading: {
  fontSize: 20,
  alignSelf: 'center',
  marginBottom: 10,
  marginTop: 10,
  fontWeight: 'bold',
  marginHorizontal: 20,
},

  MallDensityLineChart: {
    marginTop: 10,
    alignSelf: 'center',
    paddingRight: 25,
    paddingLeft: 25,
    paddingBottom: 14,
  }
});



const textStyles = StyleSheet.create({
  header:{
      fontFamily:"Inter" ,
      fontWeight: 'bold',
      fontSize: 20
  },

  descriptionHeader:{
      fontFamily:"Inter" ,
      fontWeight: 'bold',
      fontSize: 16,
      marginRight:10
  },

  openText:{
      fontFamily:"Inter" ,
      fontWeight: 'bold',
      fontSize: 18,
      marginRight:10,
      color: "green",
      marginBottom: -5
  },

  closeText:{
      fontFamily:"Inter" ,
      fontWeight: 'bold',
      fontSize: 18,
      marginRight:10,
      color: "rgb(240, 64, 64)",
  },
})