import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';


export default function RatingsComponent(props){


    return(
        <View style={layoutStyles.mainLayout}>
            <StarGenerator rating = {props}/>
        </View>
    )
}

const layoutStyles = StyleSheet.create({

    mainLayout:{
        flexDirection:"row",
        flex:1
    }
})

function StarGenerator(rating){

    var stars = [];

    for (let i = 0; i < 5; i++){
        if( i < rating){
            stars.push(
            <Icon key = {i} name= "star" size = {20} color= "#FFB84E" />
        )
        }else{
            stars.push(
                <Icon key = {i} name= "star" size = {20} color= "#BDBDBD" />
            )
        }
        
    }
    return (
        <View flexDirection = "row">
            {stars}
        </View>
    )
}

