import React ,{useState}from 'react';
import { StyleSheet, Text, View ,FlatList} from 'react-native';

import MallItemList from "./MallItemLayout"

export default function MallsFragment() {
    
     const [mallsList] = useState([
                {name:"Jurong Point",key:"1",openTiming:"9:00 am",closingTimeing:"11:00 pm",crowdDensity:3, contact: "+65 12345678", website: "https://www.mcdonalds.com.sg", location: "#B2/63/64",rating: 4, imageURL: "https://dollarsandsense.sg/wp-content/uploads/2016/06/McDonaldsgnfjksdg.jpg"},
                {name:"KFC",key:"2",openTiming:"9:00 am",closingTimeing:"10:30 pm",crowdDensity:2, contact: "+65 12345678", website: "https://www.kfc.com.sg", location: "#B2/63/64",rating: 3, imageURL: "https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/v1488265976/k2htrr9z4vsxkjbthskk.png"},
                {name:"Burger King",key:"3",openTiming:"9:00 am",closingTimeing:"11:00 pm",crowdDensity:1, contact: "+65 12345678", website: "www.burgerking.com.sg", location: "#B2/63/64",rating: 5, imageURL: "https://www.nex.com.sg/Image/Thumbnail?filename=vKDCGAZSlPTLULtROdRWH9cyun5Fu13nWu1UqYGW4qZJzDMzp27jSAdCI2MqkNaO&width=500&height=500"},
            ])
        return(
            <View style={styles.ContainerOne}>
                <FlatList
                style={{ flex: 1 }}
                data = {mallsList}
                ItemSeparatorComponent = {renderSeparator}
                initialNumToRender={mallsList.length}
                renderItem ={({item})=>(
                    <MallItemList mallItem = {item} />
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