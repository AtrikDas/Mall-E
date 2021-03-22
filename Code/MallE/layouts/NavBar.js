import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabsExample from '../Screen/TabScreen'

import DrawerNavigationRoutes from '../Screen/DrawerNavigationRoutes';
import HomeScreen from '../Screen/DrawerScreens/HomeScreen';
import RestaurantsDetail from "../Screen/MallsTab/RestaurantsDetail";
import Body from "../Screen/MallsTab/Body";
import MallOverview from "../Screen/MallsTab/MallOverview"
import MapScreen from '../Screen/MapScreens/MapScreen'
import Icon from 'react-native-vector-icons/Entypo';
const Stack = createStackNavigator();

function Home() {
    return (
        <MapScreen/>
    );
}

function Malls() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Body" screenOptions={{
                        headerShown: false
                    }}>
                <Stack.Screen name="Body" component={Body} />
                <Stack.Screen name="RestaurantsDetail" component={RestaurantsDetail} />
            </Stack.Navigator>
        </NavigationContainer>
        
    );
}

function Profile() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
        </View>
    );
}


const Tab = createBottomTabNavigator();

export default function MyNavBar() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#20BBC9',

            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Malls"
                component={Malls}
                options={{
                    tabBarLabel: 'Malls',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="shopping-cart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="News"
                component={TabsExample}
                options={{
                    tabBarLabel: 'News',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="news" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}



