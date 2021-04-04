import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Header, Item, Icon, Input, Container } from 'native-base';

import MallItemList from './MallItemLayout';

export default function MallsFragment() {
  const [mallList, setMallList] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [mallListFiltered, setMallListFiltered] = useState([]);

  useEffect(() => {

    AsyncStorage.getItem('mallList')
      .then((result) => {; 
        setMallList(JSON.parse(result)); 
      })
      .then(console.log("mall list length :"+ mallList.length))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

  },[]);

  searchMall = (textToSearch) => {
    setMallList(mallList.filter(i => i.name.toLowerCase().includes(textToSearch.toLowerCase())))
  };

  return (
    <View
    style = {styles.ContainerOne}
    >
      {
      Loading ? (
        <ActivityIndicator />
      ) :( mallList == null ? (
        <Text>No Malls Found!</Text>
      ) : (
        <Container>
        <Header searchBar rounded>
                <Item>
                    <Icon name="search"/>

                    <Input placeholder="Search mall" onChangeText={text=>{this.searchMall(text)}}/>
                </Item>
            </Header>
        <FlatList
          style={{flex: 1}}
          data={mallList}
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
