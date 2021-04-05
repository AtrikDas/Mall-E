import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Header, Item, Icon, Input, Container, Button, Text } from 'native-base';

import MallItemList from './MallItemLayout';

export default function MallsFragment() {

  const [mallList, setMallList] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [mallListFiltered, setMallListFiltered] = useState([]);
  const [name, setName] = useState([]);

  useEffect(() => {

    AsyncStorage.getItem('mallList')
      .then((result) => {; 
        setMallList(JSON.parse(result)); 
        setMallListFiltered(mallList);
      })
      .then(console.log("mall list length :"+ mallList.length))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

  },[Loading]);

  onPressReload = async () => {
    var value = await AsyncStorage.getItem('bookmarks');
    value = value.replace(/[\[\]"]+/g, '');
    var array = value.split(",")
    setName(array)
    console.log(name)
    name.map(place => { searchMall(place) })
  };

  searchMall = (textToSearch) => {
    setMallListFiltered(mallList.filter(i => i.name.toLowerCase().includes(textToSearch.toLowerCase())))
  };

  return (
    <View
    style = {styles.ContainerOne}
    >
      {
      Loading ? (
        <ActivityIndicator />
      ) :( mallListFiltered == null ? (
        <Text>No Malls Found!</Text>
      ) : (
        <Container>
        <Header searchBar rounded>
                <Item style={{flex: 11}}>
                    <Icon name="search"/>

                    <Input placeholder="Search mall" onChangeText={text=>{this.searchMall(text)}}/>
                </Item>
                <Item style={{flex: 2}}>                    
                    <Button onPress={onPressReload}>
                      <Icon name="book-outline" color="#00BFFF"/>
                    </Button>
                </Item>
            </Header>
        <FlatList
          style={{flex: 1,  paddingHorizontal:10}}
          data={mallListFiltered}
          ItemSeparatorComponent={renderSeparator}
          initialNumToRender={5}
          renderItem={({item, index}) => ( <MallItemList mallItem={item} /> )}
          keyExtractor={(item) => item.place_id}
        />
        </Container>
      ))
      }
    </View>

    
  );
}

const styles = StyleSheet.create({
  ContainerOne: {
    width: '100%',
    height: '100%',
  },
});

let renderSeparator = () => (
  <View
    style={{
      backgroundColor: 'grey',
      height: 0.5,
    }}
  />
);
