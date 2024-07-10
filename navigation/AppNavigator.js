import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CheckoutScreen from '../screens/CheckOutScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import DrawerMenu from '../components/DrawerMenu.js';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
