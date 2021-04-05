import React ,{useState}from 'react';
import { StyleSheet, Text, View ,FlatList,Image, ScrollView} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';

import StarGenerator from "./ratingsComponent"
import { Row } from 'native-base';

export default function RestarantItemList(props) {

    const navigation = useNavigation();

   
    const onPressFunction = ()=>{
    
        navigation.navigate('RestaurantsDetail',props.restaurantitem)
        console.log(`${props.restaurantitem.place_id} button is pressed`)
    }

    const DateComponent = ()=>{
        let openTiming = moment(props.restaurantitem.openTiming, 'h:mma')
        let closingTimeing = moment(props.restaurantitem.closingTimeing, 'h:mma')
        
        
        // if(openTiming.isBefore() && closingTimeing.isAfter()){
        //     //shop is open
        //     return (<View flexDirection = "row">
        //             <Text style = {textStyles.openText}>{"Open " }</Text>
        //             <Text style = {textStyles.closeText}>Closes {closingTimeing.format(" h:mma")}</Text>
        //         </View>)
        // }else{
        //     //shop is closed
        //     return (<Text style = {textStyles.closeText}>Closed</Text>)
        // }

        if(props.restaurantitem.opening_hours != null) {
            if(props.restaurantitem.opening_hours.open_now == true){
                 //shop is open
                return (<View flexDirection = "row">
                    <Text style = {textStyles.openText}>Open</Text>
                    {/* <Text style = {textStyles.closeText}>Closes {closingTimeing.format(" h:mma")}</Text> */}
                    </View>)
            }else{
                return (<Text style = {textStyles.closeText}>Closed</Text>)
            }
           
        }else{
            //shop is closed
            return (<Text style = {textStyles.closeText}>Closed</Text>)
        }
        
    }

    const CrowedComponent = ()=>{

        switch(props.restaurantitem.crowdDensity){
            case 0:{
                return(
                    <View flexDirection = "row" alignItems = "center">
                         <Icon name= "controller-record" size = {15} color= "#DADADA" />
                         <Text> N/A</Text>
                    </View>
                )
            }
            case 1:{
                return(
                    <View flexDirection = "row" alignItems = "center">
                         <Icon name= "controller-record" size = {15} color= "green" />
                         <Text> Not Crowded</Text>
                    </View>
                )
            }
            case 2:{
                return(
                    <View flexDirection = "row" alignItems = "center">
                         <Icon name= "controller-record" size = {15} color= "#FDF420" />
                         <Text> Some Crowd</Text>
                    </View>
                )
            }
            case 3:{
                return(
                    <View flexDirection = "row" alignItems = "center">
                         <Icon name= "controller-record" size = {15} color= "#DC0000" />
                         <Text>Max Crowd</Text>
                    </View>
                )
            }
        }
    }

    const WaitingTimeComponent = ()=>{

        switch(props.restaurantitem.crowdDensity){
            case 0:{
                return(
                    <View flexDirection = "row" alignItems = "center">
                         <Text> N/A</Text>
                    </View>
                )
            }
            case 1:{
                return(
                    <View flexDirection = "row" alignItems = "center">
                         <Text>10-20 min</Text>
                    </View>
                )
            }
            case 2:{
                return(
                    <View flexDirection = "row" alignItems = "center">
                         <Text>20-30 min</Text>
                    </View>
                )
            }
            case 3:{
                return(
                    <View flexDirection = "row" alignItems = "center">
                         <Text>30-40 min</Text>
                    </View>
                )
            }
        }
    }
        return(
            <ScrollView>
            <TouchableWithoutFeedback style={layoutStyles.itemContainer} onPress= {onPressFunction}>
                {
                    props.restaurantitem.photos != null ? <Image source={{uri:`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI&photoreference=${props.restaurantitem.photos[0].photo_reference}&maxwidth=90`}} style={layoutStyles.image}/> 
                    : 
                    <Image source={{uri:`https://www.google.com/url?sa=i&url=https%3A%2F%2Fmiraclesrealty.com%2Fproperty%2Fapplication%2Fmodules%2Fthemes%2Fviews%2Fdefault%2Fassets%2Fimages%2F&psig=AOvVaw0aZ-uSklNufMwLiM4g2ZDZ&ust=1617708720932000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLizluKA5-8CFQAAAAAdAAAAABAD`}} style={layoutStyles.image}/>
                }
                
                <View style = {layoutStyles.textContainer}>
                    <View style={layoutStyles.headerRow} >
                        <Text style= {textStyles.header}>{props.restaurantitem.name}</Text> 
                        {/* <CrowedComponent /> */}
                    </View>
                        <View style={layoutStyles.descriptionRow } >
                        <Text style= {textStyles.descriptionHeader}>Hours: </Text> 
                        <DateComponent />
                    </View>
                    <View style={layoutStyles.descriptionRow} >
                        <Text style= {textStyles.descriptionHeader}>Ratings: </Text> 
                        <StarGenerator rating = {props.restaurantitem.rating}/>
                    </View>
                
                </View>
            </TouchableWithoutFeedback>
            </ScrollView>
        );
}




const layoutStyles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        height: 100,
        flexDirection:'row',
        marginVertical:10,
       
    },

    image:{
        width:90,
        height:90,
        borderRadius:45,
    },

    textContainer:{
        height: "90%",
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
        
        flex:1
    },
    descriptionRow:{
        flexDirection :"row",
        justifyContent : 'flex-start',
        width:"100%",
        
        
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
    },

    openText:{
        fontFamily:"Inter" ,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight:10,
        color: "green"
    },

    closeText:{
        fontFamily:"Inter" ,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight:10,
        color: "red"
    },
})