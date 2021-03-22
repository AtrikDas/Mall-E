import React ,{useState}from 'react';
import { StyleSheet, Text, View ,FlatList} from 'react-native';

import RestaurantItemList from "./RestaurantItemLayout"

export default function RestarantsFragment() {
    
     const [restaurantsList] = useState([
                {name:"McDonald's",key:"1",openTiming:"9:00 am",closingTimeing:"11:00 pm",crowdDensity:3, contact: "+65 12345678", website: "https://www.mcdonalds.com.sg", location: "#B2/63/64",rating: 4, imageURL: "https://dollarsandsense.sg/wp-content/uploads/2016/06/McDonaldsgnfjksdg.jpg"},
                {name:"KFC",key:"2",openTiming:"9:00 am",closingTimeing:"10:30 pm",crowdDensity:2, contact: "+65 12345678", website: "https://www.kfc.com.sg", location: "#B2/63/64",rating: 3, imageURL: "https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/v1488265976/k2htrr9z4vsxkjbthskk.png"},
                {name:"Burger King",key:"3",openTiming:"9:00 am",closingTimeing:"11:00 pm",crowdDensity:1, contact: "+65 12345678", website: "www.burgerking.com.sg", location: "#B2/63/64",rating: 5, imageURL: "https://www.nex.com.sg/Image/Thumbnail?filename=vKDCGAZSlPTLULtROdRWH9cyun5Fu13nWu1UqYGW4qZJzDMzp27jSAdCI2MqkNaO&width=500&height=500"},
                {name:"Wing-Stop",key:"4",openTiming:"9:00 am",closingTimeing:"10:30 pm",crowdDensity:2, contact: "+65 12345678", website: "https://www.wingstop.com.sg", location: "#B2/63/64",rating: 2, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSITT9LxwBv19Gm3RVwlTQtcL3yTaGwpXfgeA&usqp=CAU"},
                {name:"Sushi Tei",key:"5",openTiming:"9:00 am",closingTimeing:"11:00 pm",crowdDensity:1, contact: "+65 12345678", website: "https://www.sushitei.com.sg", location: "#B2/63/64",rating: 1, imageURL: "https://i.hungrygowhere.com/business/13/cb/11/00/sushi-tei-pte-ltd.jpg"},
                {name:"Itacho",key:"6",openTiming:"9:00 am",closingTimeing:"10:30 pm",crowdDensity:2, contact: "+65 12345678", website: "https://www.itacho.com.sg", location: "#B2/63/64",rating: 3, imageURL: "http://islifearecipe.net/wp-content/uploads/2018/09/fullsizeoutput_30752-1.jpeg"},
                {name:"Genki Sushi",key:"7",openTiming:"9:00 am",closingTimeing:"11:00 pm",crowdDensity:2, contact: "+65 12345678", website: "https://www.genkisushi.com.sg",location: "#B2/63/64",rating: 5, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ikOIAp-AeDsWPaDMuwI_0-1GH-P7S7L_UA&usqp=CAU"},
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