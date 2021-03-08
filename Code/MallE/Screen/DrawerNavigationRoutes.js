// Import React and Component
import React from 'react';
import {
  View,Text,StyleSheet
} from 'react-native';

const DrawerNavigationRoutes = () => {

  return (
    <View style={styles.container}>
        <Text>DrawerNavigationRoutes</Text>
    </View>
  );
};

export default DrawerNavigationRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
});