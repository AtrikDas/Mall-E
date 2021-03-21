import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/loginScreens/LoginScreen.js';
import RegisterScreen from './Screen/loginScreens/RegisterScreen';

// import HomeScreen from './Screen/DrawerScreens/HomeScreen';
// import RestaurantsDetail from "./Screen/MallsTab/RestaurantsDetail";
import Header from "./Screen/MallsTab/Header";
import {View} from 'react-native';

import NavBar from './layouts/NavBar';



const Stack = createStackNavigator();

// const Auth = () => {
//   // Stack Navigator for Login and Sign up Screen
//   return (
//     <Stack.Navigator initialRouteName="LoginScreen">
//       <Stack.Screen
//         name="LoginScreen"
//         component={LoginScreen}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="RegisterScreen"
//         component={RegisterScreen}
//         options={{
//           title: 'Register', //Set Header Title
//           headerStyle: {
//             backgroundColor: '#307ecc', //Set Header color
//           },
//           headerTintColor: '#fff', //Set Header text color
//           headerTitleStyle: {
//             fontWeight: 'bold', //Set Header text style
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

const App = () => {
  return (
      <NavigationContainer independent={true}>
        <Header></Header>
        <NavBar />
      </NavigationContainer>
  );
};

export default App;
