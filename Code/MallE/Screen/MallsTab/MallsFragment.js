import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import MallItemList from './MallItemLayout';
import { Item } from 'native-base';

export default function MallsFragment() {
  const [mallList, setMallList] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {

    AsyncStorage.getItem('mallList')
      .then((result) => {; 
        setMallList(JSON.parse(result)); 
      })
      .then(console.log("mall list length :"+ mallList.length))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

  },[]);

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
        <FlatList
          style={{flex: 1}}
          data={mallList}
          ItemSeparatorComponent={renderSeparator}
          initialNumToRender={5}
          renderItem={({item, index}) => ( <MallItemList mallItem={item} /> )}
          keyExtractor={(item) => item.place_id}
        />
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
