// Import React and Component
import React, { useState, useEffect } from 'react';
import {
  View,Text,StyleSheet
} from 'react-native';

import Header from "../../layouts/Header"
import Body from "../MallsTab/Body"

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <Body/>
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