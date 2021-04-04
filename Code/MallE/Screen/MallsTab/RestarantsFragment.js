import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text, View ,FlatList, ActivityIndicator} from 'react-native';

import RestaurantItemList from "./RestaurantItemLayout"

export default function RestarantsFragment(props) {
    
     const [restaurantsList,setRestaurantsList] = useState([]);
     const [Loading, setLoading] = useState(true);

     useEffect(()=>{
        //  console.log("props"+JSON.stringify(props));

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
          };
          
          fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${props.mallDetail.name.replace(/\s/g, '+')}+Restaurants&key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI`, requestOptions)
            .then(response => response.json())
            .then(result => setRestaurantsList(result.results))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false));

       
     },[]);

        return(
            <View style={styles.ContainerOne}>

{
      Loading ? (
        <ActivityIndicator />
      ) :( restaurantsList == null ? (
        <Text>No Restaurants Found!</Text>
      ) : (
        <FlatList
                style={{ flex: 1 }}
                data = {restaurantsList}
                ItemSeparatorComponent = {renderSeparator}
                initialNumToRender={5}
                keyExtractor={(item)=>item.place_id}
                renderItem ={({item})=>(
                    <RestaurantItemList restaurantitem = {item} />
                )}
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
})

let renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'grey',
        height: 0.5,
      }}
    />
  );