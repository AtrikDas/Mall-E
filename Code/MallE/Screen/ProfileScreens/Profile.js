import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Title, Caption, TouchableRipple, } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, Button, Card, CardItem, Body } from 'native-base';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {

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

  {/*render()*/ }
  {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Abhinandan</Text>
            </View>
            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                <Icon name="map-marker-radius" color="#777777" size={25} />
                <Text style={{ color: "#777777", marginLeft: 20, fontSize: 16, }}>Singapore</Text>
              </View>
              <View style={styles.row}>
                <Icon name="phone" color="#777777" size={25} />
                <Text style={{ color: "#777777", marginLeft: 20, fontSize: 16, }}>+65 8652 0943</Text>
              </View>
              <View style={styles.row}>
                <Icon name="email" color="#777777" size={25} />
                <Text style={{ color: "#777777", marginLeft: 20, fontSize: 16 }}>abhinandan@gmail.com</Text>
              </View>
            </View>

            <Card>
              <CardItem header bordered button onPress={onPressReload}>

                <Icon name="book-outline" color="#00BFFF" size={25} />
                <Text style={styles.menuItemText}>Show Bookmarks</Text>

              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'left',
                    }}>
                    {name.map(place => { return (<Text>{place} {"\n"}</Text>) })}
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer bordered button onPress={onPressDelete}>

                <Icon name="delete" color="#00BFFF" size={25} />
                <Text style={styles.menuItemText}>Delete Bookmarks</Text>

              </CardItem>
            </Card>


            <View style={styles.menuWrapper}>

              {/*<TouchableOpacity onPress={onPressReload}>
                <View style={styles.menuItem}>
                  <Icon name="bookmark" color="#00BFFF" size={25} />
                  <Text style={styles.menuItemText}>Show BookMarks</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}>
                <View style={styles.menuItem}>
                  <Icon name="account-edit" color="#00BFFF" size={25} />
                  <Text style={styles.menuItemText}>Edit Profile</Text>
                </View>
                  </TouchableOpacity>*/}

              <TouchableOpacity onPress={onPressReload}>
                <View style={styles.menuItem}>
                  <Icon name="eye" color="#00BFFF" size={25} />
                  <Text style={styles.menuItemText}>Privacy</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { }}>
                <View style={styles.menuItem}>
                  <Icon name="cog-outline" color="#00BFFF" size={25} />
                  <Text style={styles.menuItemText}>Settings</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { }}>
                <View style={styles.menuItem}>
                  <Icon name="information" color="#00BFFF" size={25} />
                  <Text style={styles.menuItemText}>Help and Support</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  buttonContent: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    color: "#ff6961",
    borderBottomColor: '#dddddd',
    borderBottomWidth: 3,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row'
  },

  userInfoSection: {
    paddingHorizontal: 30,
    marginTop: 25,
    marginBottom: 1,
    borderBottomColor: '#dddddd',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  menuWrapper: {
    marginTop: 10,

  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
}
);