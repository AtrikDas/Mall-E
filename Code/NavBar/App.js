import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyNavBar from './src/NavBar';

/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
*/

export default class App extends Component {
  render() {
    return (
       {/* SplashScreen which will come once for 5 Seconds */}
      {/* <Stack.Screen
      name="SplashScreen"
      component={SplashScreen}
      // Hiding header for Splash Screen
      options={{headerShown: false}}
      /> */}
      {/* Auth Navigator: Include Login and Signup */}
      {/* <Stack.Screen
      name="Auth"
      component={Auth}
      options={{headerShown: false}}
      /> */}
      {/* Navigation Drawer as a landing page */}
      <NavigationContainer>
        <MyNavBar />
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
