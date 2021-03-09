// Import React and Component
import React from 'react';
import {
  View,Text,StyleSheet
} from 'react-native';

// import Header from "../Sample/Header"
import Body from "../Sample/Body"

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      {/* <Header/> */}
        <Body/>
        <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});