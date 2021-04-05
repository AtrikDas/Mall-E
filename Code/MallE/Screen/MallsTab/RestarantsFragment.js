import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text, View ,FlatList, ActivityIndicator} from 'react-native';
import { Header, Item, Icon, Input, Container } from 'native-base';

import RestaurantItemList from "./RestaurantItemLayout"

export default function RestarantsFragment(props) {
    
     const [restaurantsList,setRestaurantsList] = useState([]);
     const [Loading, setLoading] = useState(true);
     const [restaurantsListFiltered, setRestaurantsListFiltered] = useState([]);

     useEffect(()=>{
        //  console.log("props"+JSON.stringify(props));

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
          };
          // https://maps.googleapis.com/maps/api/place/textsearch/json?query=Jurong+Point+Restaurants&key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI
          fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${props.mallDetail.name.replace(/\s/g, '+')}+Restaurants&key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI`, requestOptions)
            .then(response => response.json())
            .then(result => setRestaurantsList(result.results))
            .then(setRestaurantsListFiltered(restaurantsList))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false));

       
     },[Loading]);

     searchRestaurant = (textToSearch) => {
      setRestaurantsListFiltered(restaurantsList.filter(i => i.name.toLowerCase().includes(textToSearch.toLowerCase())))
    };

        return(
            <View style={styles.ContainerOne}>

{
      Loading ? (
        <ActivityIndicator />
      ) :( restaurantsListFiltered == null ? (
        <Text>No Restaurants Found!</Text>
      ) : (
        <Container>
        <Header searchBar rounded>
                <Item>
                    <Icon name="search"/>

                    <Input placeholder="Search Restaurant" onChangeText={text=>{this.searchRestaurant(text)}}/>
                </Item>
            </Header>
        <FlatList
                style={{ flex: 1 }}
                data = {restaurantsListFiltered}
                ItemSeparatorComponent = {renderSeparator}
                initialNumToRender={5}
                keyExtractor={(item)=>item.place_id}
                renderItem ={({item})=>(
                    <RestaurantItemList restaurantitem = {item} />
                )}
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
})

let renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'grey',
        height: 0.5,
      }}
    />
  );