// Import React and Component
import React, { useState, useEffect, Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Container, Header, Content, Button, Card, CardItem, Body } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Avatar,
  Title,
  Caption,

  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = () => {

  const [name, setName] = useState([]);

  onPressReload = async () => {
    var value = await AsyncStorage.getItem('bookmarks');
    value = value.replace(/[\[\]"]+/g, '');
    var array = value.split(",")
    setName(array)
    console.log(name)
  }
  onPressDelete = async () => {
    var value = await AsyncStorage.removeItem('bookmarks');
    var array = [];
    setName(array)
    console.log(name)
  }

  return (
    /*
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 16 }}>
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
                {name.map(place => { return (<Text>{place} {"\n"}</Text>) })}
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
    
        */
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, {
              marginTop: 15,
              marginBottom: 5,
            }]}>firstName lastName </Title>
            <Caption style={styles.caption} >@username</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={25} />
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 16 }}>Location</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={25} />
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 16 }}>+65 9000 0009</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={25} />
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 16 }}>mailid@email.com</Text>
        </View>
      </View>


      <View style={styles.menuWrapper}>
        <View style={styles.menuWrapper}>
          <Card>
            <CardItem header bordered button onPress={onPressReload}>

              <Icon name="book-outline" color="#20BBC9" size={25} />
              <Text style={styles.menuItemText}>Show Bookmarks</Text>

            </CardItem>
            <CardItem bordered>
              <Body>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: 'center',
                  }}>
                  {name.map(place => { return (<Text>{place} {"\n"}</Text>) })}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered button onPress={onPressDelete}>

              <Icon name="book-remove" color="#20BBC9" size={25} />
              <Text style={styles.menuItemText}>Delete Bookmarks</Text>

            </CardItem>
          </Card>
        </View>

        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Icon name="account-edit" color="#20BBC9" size={25} />
            <Text style={styles.menuItemText} >Edit Account</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Icon name="cog-outline" color="#20BBC9" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View >
    </SafeAreaView >

  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  /*
    TextStyle: {
        fontSize: 25,
      textAlign: 'center'
    }
    */
});