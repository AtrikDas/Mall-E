// Import React and Component
import React, { useState, useEffect, Component } from 'react';
import {View, Text, SafeAreaView, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SettingsScreen = () => {

    const [name, setName] = useState([]);

    onPressReload = async () => {
        var value = await AsyncStorage.getItem('bookmarks');
        value = value.replace(/[\[\]"]+/g,'');
        var array = value.split(",")
        setName(array)
        console.log(name)
    }
    onPressDelete = async () => {
        var value = await AsyncStorage.removeItem('bookmarks');        
        setName(value)        
        console.log(name)
    }
      
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
            }}>
            {name.map(place => {return (<Text>{place} {"\n"}</Text>)})}
          </Text>
          <Button
          onPress={onPressReload}
          title="Show Bookmarks"
          color="#841584"
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
            }}>            
          </Text>
          <Button
          onPress={onPressDelete}
          title="Delete Bookmarks"
          color="#841584"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    TextStyle:{
        fontSize : 25,
         textAlign: 'center'
      }
  });