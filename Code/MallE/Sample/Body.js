import React from 'react';
import {Animated, StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions} from 'react-native';

import MallOverview from './MallOverview';

const { width } = Dimensions.get("window");

export default class Body extends React.Component {
    state = {
        active: 0,
        tabOne: 0,
        tabTwo: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -1000
    };

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

    render() {
        let {tabOne, tabTwo, translateX, active, translateXTabOne, translateXTabTwo, translateY} = this.state;
        return(
            <View style = {styles.container}>
                <View style = {styles.box}>
                    <View style = {styles.segmentedControl}>
                        <View style = {{width:'90%', marginLeft:'auto', marginRight:'auto'}}>
                            <View style = {{flexDirection:'row', marginTop:10, marginBottom:20, height: 45, position: 'relative'}}>
                                <Animated.View style = {{position:'absolute', width: '50%', height: '100%', top: 0, left: 0, backgroundColor:'#047580', borderRadius: 100,
                                transform: [{translateX}]}}/>
                                <TouchableOpacity
                                style = {{flex: 1, justifyContent:'center', alignItems:'center', borderWidth: 2, borderColor:'#D3D3D3', borderRightWidth: 0, borderTopLeftRadius: 100, borderBottomLeftRadius: 100}}
                                onLayout = {event => this.setState({tabOne: event.nativeEvent.layout.x})}
                                onPress={() => this.setState({active: 0}, () => this.handleSlide(tabOne))}>
                                    <Text style = {{color:'#D3D3D3'}}> Mall Overview </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style = {{flex: 1, justifyContent:'center', alignItems:'center', borderWidth: 2, borderColor:'#D3D3D3', borderLeftWidth: 0, borderTopRightRadius: 100, borderBottomRightRadius: 100}}
                                onLayout = {event => this.setState({tabTwo: event.nativeEvent.layout.x})}
                                onPress={() => this.setState({active: 1}, () => this.handleSlide(tabTwo))}>
                                    <Text style = {{color:'#D3D3D3'}}> Restaurants </Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                                <Animated.View style = {{flex: 1, justifyContent:'center', alignItems:'center', transform: [{translateX: translateXTabOne}]}}
                                onLayout = {event => this.setState({
                                    translateY: event.nativeEvent.layout.height
                                })}> 
                                    <MallOverview />
                                </Animated.View>
                                <Animated.View style = {{flex: 1, justifyContent:'center', alignItems:'center', transform: [{translateX: translateXTabTwo}, {translateY: -translateY}]}}>
                                    <Text>Tab Two</Text>
                                </Animated.View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%',
        // flexWrap: 'wrap',
    },

    box: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },

    segmentedControl: {
        flex: 1,
    }
})