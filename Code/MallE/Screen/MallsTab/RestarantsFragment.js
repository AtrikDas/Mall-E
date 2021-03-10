import React ,{useState}from 'react';
import { StyleSheet, Text, View ,FlatList} from 'react-native';

import RestaurantItemList from "./RestaurantItemLayout"

export default function RestarantsFragment() {
    
     const [restaurantsList] = useState([
                {name:"kelvin",key:"1",openTiming:123,closingTimeing:2,crowdDensity:3},
                {name:"a",key:"2",openTiming:23,closingTimeing:34,crowdDensity:2},
                {name:"asd",key:"3",openTiming:1,closingTimeing:51,crowdDensity:1},
                {name:"weqg",key:"4",openTiming:32,closingTimeing:5,crowdDensity:2},
                {name:"qwesvz",key:"5",openTiming:24,closingTimeing:13,crowdDensity:1},
                {name:"esdgs",key:"6",openTiming:23,closingTimeing:32,crowdDensity:2},
                {name:"qwasd",key:"7",openTiming:124,closingTimeing:123,crowdDensity:2},
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