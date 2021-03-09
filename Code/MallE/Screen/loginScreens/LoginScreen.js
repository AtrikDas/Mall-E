// Import React and Component
import React from 'react';
import {
  View,Text,StyleSheet,Button,
} from 'react-native';

const LoginScreen = ({navigation}) => {

  const LoginButtonPressed = () =>{
    navigation.navigate("HomeScreen")
  }

  return (
    <View style={styles.container}>
        <Text>Login Screen</Text>
        <Button title="Login" onPress={LoginButtonPressed} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});