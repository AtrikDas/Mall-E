import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import {globalStyles} from '../../ThemesAndFonts';
import Graph from "./Graph"

const Separator = () => <View style={styles.separator} />;

export default class RestarantsFragment extends React.Component {

  componentDidMount(){
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

  render() {
    return (
      <View style={styles.ContainerOne}>
        <ScrollView>
          {/* restaurant image */}
          <Image
            source={{
              width: '100%',
              height: 200,
              uri: 'https://picsum.photos/200/300',
            }}
          />
          {/* restaurant details */}
          <View style={styles.TextDetailContainer}>
            <Text style={globalStyles.titleText}>
              Website:
              <Text style={globalStyles.normalText}>
                http://foodrepublic.com.sg
              </Text>
            </Text>

            <Text style={globalStyles.titleText}>
              Location:
              <Text style={globalStyles.normalText}>
                #B2-63/64/65/66/70/71/72
              </Text>
            </Text>

            <Text style={globalStyles.titleText}>
              Hours:
              <Text style={globalStyles.normalText}>Open ⋅ Closes 9:30PM</Text>
            </Text>

            <Text style={globalStyles.titleText}>
              Contact:
              <Text style={globalStyles.normalText}>+65 6834 3126</Text>
            </Text>

            <Text style={globalStyles.titleText}>
              Ratings: <Text style={globalStyles.normalText}>4/5</Text>
            </Text>

            <Text style={globalStyles.titleText}>
              Estimated Waiting Time:{' '}
              <Text style={globalStyles.normalText}> 200-30 Minutes</Text>
            </Text>

            <Separator />

            <Text style={globalStyles.titleText}>Weekly Crowd Density</Text>

            <Graph/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ContainerOne: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  TextDetailContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
