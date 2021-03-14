import React ,{useState}from 'react';
import { StyleSheet, Text, View ,FlatList,Image} from 'react-native';

import RatingsComponent from "./ratingsComponent";


export default function RestarantItemList(props) {
    
    
        return(
            <View style={layoutStyles.itemContainer}>
                <Image source={{uri:'https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2luZ2Fwb3JlfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80'}} style={layoutStyles.image}/>
                <View style = {layoutStyles.textContainer}>
                    <View style={layoutStyles.headerRow} >
                        <Text style= {textStyles.header}>{props.restaurantitem.name}</Text> 
                        <Text>{props.restaurantitem.crowdDensity}</Text>
                    </View>
                    <View style={layoutStyles.descriptionRow} >
                        <Text style= {textStyles.descriptionHeader}>Hours: </Text> 
                        <Text>{props.restaurantitem.crowdDensity}</Text>
                    </View>
                    <View style={layoutStyles.descriptionRow} >
                        <Text style= {textStyles.descriptionHeader}>Estimated Waiting Time: </Text> 
                        <Text>{props.restaurantitem.crowdDensity}</Text>
                    </View>
                    <View style={layoutStyles.descriptionRow} >
                        <Text style= {textStyles.descriptionHeader}>Ratings: </Text> 
                        <RatingsComponent ratings = {props.restaurantitem.crowdDensity}/>
                    </View>
                
                </View>
            </View>
            
        );
}

const layoutStyles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        height: 100,
        flexDirection:'row',
        marginVertical:10,
        backgroundColor:"red"
    },

    image:{
        width:90,
        height:90,
        borderRadius:45,
    },

    textContainer:{
        flex:1,
        marginLeft:10,
        marginRight:10,
        justifyContent:'space-between'
    },
    headerRow:{
        flexDirection :"row",
        justifyContent : 'space-between',
        width:"100%",
        height:"100%",
        backgroundColor:"blue",
        flex:1
    },
    descriptionRow:{
        flexDirection :"row",
        justifyContent : 'flex-start',
        width:"100%",
        backgroundColor:"yellow",
        
        flex:1
    }

})

const textStyles = StyleSheet.create({
    header:{
        fontFamily:"Inter" ,
        fontWeight: 'bold',
        fontSize: 20
    },

    descriptionHeader:{
        fontFamily:"Inter" ,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight:10
    }
})