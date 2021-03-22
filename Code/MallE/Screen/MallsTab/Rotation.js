import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import AnotherGraph from './AnotherGraph';

const App = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
    >

      <View style={[styles.box, {
        transform: [
          { rotate: "90deg" },
        //   { rotateZ: "70deg" }
        ]
      }]}>
        <AnotherGraph/>
      </View>

    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingBottom: 60
  },
  box: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    marginVertical: 40,
    backgroundColor: "#61dafb",
    alignItems: "center",
    justifyContent: "center"
  },
});

export default App;