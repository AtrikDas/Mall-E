import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {globalStyles} from '../../ThemesAndFonts';

const Separator = () => <View style={styles.separator} />;

export default class RestarantsFragment extends React.Component {
  render() {
    return (
      <View style={styles.ContainerOne}>
        <View>
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
          </View>
        </View>
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
