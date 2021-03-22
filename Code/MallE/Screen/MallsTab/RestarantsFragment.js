import React ,{useState}from 'react';
import { StyleSheet, Text, View ,FlatList} from 'react-native';

import RestaurantItemList from "./RestaurantItemLayout"

export default function RestarantsFragment() {
    
     const [restaurantsList] = useState([
                {name:"McDonald's",key:"1",openTiming:"9:00 am",closingTimeing:"11:00 pm",crowdDensity:3, contact: "+65 12345678", website: "https://www.mcdonalds.com.sg", location: "#B2/63/64"},
                {name:"KFC",key:"2",openTiming:"9:00 am",closingTimeing:"10:30 pm",crowdDensity:2, contact: "+65 12345678", website: "https://www.kfc.com.sg", location: "#B2/63/64"},
                {name:"Burger King",key:"3",openTiming:"9:00 am",closingTimeing:"11:00 pm",crowdDensity:1, contact: "+65 12345678", website: "www.burgerking.com.sg", location: "#B2/63/64"},
                {name:"Wing-Stop",key:"4",openTiming:"9:00 am",closingTimeing:"10:30 pm",crowdDensity:2, contact: "+65 12345678", website: "https://www.wingstop.com.sg", location: "#B2/63/64"},
                {name:"Sushi Tei",key:"5",openTiming:"9:00 am",closingTimeing:"11:00 pm",crowdDensity:1, contact: "+65 12345678", website: "https://www.sushitei.com.sg", location: "#B2/63/64"},
                {name:"Itacho",key:"6",openTiming:"9:00 am",closingTimeing:"10:30 pm",crowdDensity:2, contact: "+65 12345678", website: "https://www.itacho.com.sg", location: "#B2/63/64"},
                {name:"Genki Sushi",key:"7",openTiming:"9:00 am",closingTimeing:"11:00 pm",crowdDensity:2, contact: "+65 12345678", website: "https://www.genkisushi.com.sg",location: "#B2/63/64"},
            ])
        return(
            <View style={styles.ContainerOne}>
                <FlatList
                style={{ flex: 1 }}
                data = {restaurantsList}
                ItemSeparatorComponent = {renderSeparator}
                initialNumToRender={restaurantsList.length}
                renderItem ={({item})=>(
                    <RestaurantItemList restaurantitem = {item} />
                )}
                />
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