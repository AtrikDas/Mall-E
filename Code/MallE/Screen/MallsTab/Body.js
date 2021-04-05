import AsyncStorage from '@react-native-community/async-storage';
import React, {navigation} from 'react';
import {Animated, StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import {globalStyles} from '../../ThemesAndFonts';

import MallOverview from './MallOverview';
import MallsFragment from './MallsFragment';
import RestarantsFragment from "./RestarantsFragment"

const { width } = Dimensions.get("window");

export default class Body extends React.Component {

    constructor(props) {
        super(props);
        
       
        this.state = {
            mallDetail: {},
            loading: true,
          active: 0,
          tabOne: 0,
          tabTwo: 0,
          translateX: new Animated.Value(0),
          translateXTabOne: new Animated.Value(0),
          translateXTabTwo: new Animated.Value(width),
          translateY: 0,
          offsetX: 0,
          offsetY: 0,
        };
      }

    handleSlide = type => {
        let {active, tabOne, tabTwo, translateX, translateXTabOne, translateXTabTwo} = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100,
            useNativeDriver: true,
        }).start();
        if (active == 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100,
                    useNativeDriver: true,
                }).start(),
            ])
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100,
                    useNativeDriver: true,
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }).start()
            ]);
        }
    }

    componentDidMount(){
        // AsyncStorage.getItem("mallItem").then((result)=> this.setState({mallDetail: result})).catch((e)=>console.log(e));
        // console.log(JSON.stringify(this.props))
        
            var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.props.route.params.place_id}&key=AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI`, requestOptions)
            .then(response => response.json())
            .then(results => this.setState( {mallDetail: results.result}))
            .catch((e)=> console.log(e))
            .finally(()=> this.setState({loading: false}));

            console.log(JSON.stringify(this.state))
        }
        
    render() {

        let {active, tabOne, tabTwo, translateX, translateY, translateXTabOne, translateXTabTwo, offsetX, offsetY} = this.state;
        return(
            // Main Container
            <View style = {styles.container}>

                {/* Segmented Control */}
                <View style = {styles.segmentedControl}>

                    <Animated.View style={[styles.tabAnimation, 
                        {transform: [{ translateX }]}]}/>

                    {/* Tab 1 */}
                    <TouchableOpacity
                    style = {styles.tabX}
                    onLayout = {event => this.setState({tabOne: event.nativeEvent.layout.x})}
                    onPress={() => this.setState({active: 0}, () => this.handleSlide(tabOne))}>

                        <Text style = {{color:'#D3D3D3', fontFamily: "poppins", fontSize: 17.5}}> Mall Overview </Text>

                    </TouchableOpacity>

                    {/* Tab 2 */}
                    <TouchableOpacity
                    style = {styles.tabY}
                    onLayout = {event => this.setState({tabTwo: event.nativeEvent.layout.x})}
                    onPress={() => this.setState({active: 1}, () => this.handleSlide(tabTwo))}>

                        <Text style = {{color:'#D3D3D3', fontFamily: "poppins", fontSize: 17.5}}> Restaurants </Text>

                    </TouchableOpacity>

                </View>

                {/* Scrollable / Content and Details */}
                {/* <Animated.View styles = {[styles.scrollView]}> */}
                    
                    {/* Contents of TabOne */}
                    <Animated.View style = {[styles.tabXContent,
                    {transform: [{translateX: translateXTabOne}]},]}
                    onLayout = {event => this.setState({offsetX: event.nativeEvent.layout.height})}> 

                        {this.state.loading ? (
                            <View style={[styles.containerActivityIndicator, styles.horizontal]}><ActivityIndicator /></View>
                        ):(
                            <MallOverview mallDetail = {this.state.mallDetail}/>
                        )
                    }
                        
                    </Animated.View>
                    
                    {/* Contents of TabTwo */}
                    <Animated.View style = {[styles.tabYContent, 
                    {transform: [{translateX: translateXTabTwo}, {translateY: -offsetX}]}, {marginBottom: -offsetY}]}
                    onLayout = {event => this.setState({offsetY: event.nativeEvent.layout.height})}>
                        
                        
                        {this.state.loading ? (
                            <View style={[styles.containerActivityIndicator, styles.horizontal]}><ActivityIndicator /></View>
                        ):(
                            <RestarantsFragment mallDetail = {this.state.mallDetail}/>
                        )
                    }
 
                    </Animated.View>

                {/* </Animated.View> */}

            </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#ffffff',
        // padding: 20,
    },

    segmentedControl: {
        flexDirection:'row', 
        marginTop: 10, 
        marginBottom: 10, 
        height: 45, 
        position: 'relative',
        paddingHorizontal:20
    },

    tabAnimation: {
        position:'absolute', 
        width: '50%', 
        height: '100%', 
        top: 0, 
        left: 0, 
        backgroundColor:'#047580', 
        borderRadius: 100,
    },

    tabX: {
        flex: 1, 
        justifyContent:'center', 
        alignItems:'center', 
        borderWidth: 2, 
        borderColor:'#D3D3D3', 
        borderRightWidth: 0, 
        borderTopLeftRadius: 100, 
        borderBottomLeftRadius: 100
    },

    tabY: {
        flex: 1, 
        justifyContent:'center',
        alignItems:'center', 
        borderWidth: 2, 
        borderColor:'#D3D3D3', 
        borderLeftWidth: 0, 
        borderTopRightRadius: 100, 
        borderBottomRightRadius: 100
    },

    scrollView: {
        flex: 1, 
        justifyContent:'center', 
        alignItems:'center',
       
    },   

    tabXContent: {
        flex: 1, 
        justifyContent:'center', 
        alignItems:'center',
        // padding: 5,
    },

    tabYContent: {
        flex: 1, 
        justifyContent:'center', 
        alignItems:'center',
        // padding: 5,
    },

    containerActivityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems:'center',
        // padding: 10,
      },

})