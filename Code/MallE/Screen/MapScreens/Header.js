/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <View
          style={styles.headerBackground}>
          <Text style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 12 }}>Mall-E</Text>
          <View style={styles.search}>
            <Icon name="list"
              type="feather"
              size={40}>
            </Icon>
            <SearchBar placeholder="Search for a Mall..."
              style={styles.searchBox}
              lightTheme="true"
              platform="ios"
              containerStyle={{ backgroundColor: ['#047580', '#A5F2F9'], borderWidth: 0, width: '85%' }}>
            </SearchBar>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  search: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#047580',
  },
});
