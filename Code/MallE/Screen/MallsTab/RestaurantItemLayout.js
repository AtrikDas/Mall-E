import React ,{useState}from 'react';
import { StyleSheet, Text, View ,FlatList,Image} from 'react-native';
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
        console.log(`${props.restaurantitem.key} button is pressed`)
    }

    const DateComponent = ()=>{
        let openTiming = moment(props.restaurantitem.openTiming, 'h:mma')
        let closingTimeing = moment(props.restaurantitem.closingTimeing, 'h:mma')
        
        
        if(openTiming.isBefore() && closingTimeing.isAfter()){
            //shop is open
            return (<View flexDirection = "row">
                <Text style = {textStyles.openText}>{"Open " }</Text><Text style = {textStyles.closeText}>Closes {closingTimeing.format(" h:mma")}</Text>
                </View>)
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
                         <Text> 20-30 min</Text>
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
            <TouchableWithoutFeedback style={layoutStyles.itemContainer} onPress= {onPressFunction}>
                <Image source={{uri:'https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2luZ2Fwb3JlfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80'}} style={layoutStyles.image}/>
                <View style = {layoutStyles.textContainer}>
                    <View style={layoutStyles.headerRow} >
                        <Text style= {textStyles.header}>{props.restaurantitem.name}</Text> 
                        <CrowedComponent />
                    </View>
                    <View style={layoutStyles.descriptionRow} >
                        <Text style= {textStyles.descriptionHeader}>Hours: </Text> 
                        <DateComponent />
                    </View>
                    <View style={layoutStyles.descriptionRow} >
                        <Text style= {textStyles.descriptionHeader}>Estimated Waiting Time: </Text> 
                        <WaitingTimeComponent/>
                    </View>
                    <View style={layoutStyles.descriptionRow} >
                        <Text style= {textStyles.descriptionHeader}>Ratings: </Text> 
                        <StarGenerator rating = {props.restaurantitem.crowdDensity}/>
                    </View>
                
                </View>
            </TouchableWithoutFeedback>
            
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