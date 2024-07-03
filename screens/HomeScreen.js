import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { useFocusEffect } from '@react-navigation/native';
import 'react-native-get-random-values';

const products = [
  { id: '1', name: 'Office Wear', price: 120, image: require('../assets/dress1.png'), description: 'Office wear for you office' },
  { id: '2', name: 'Black', price: 120, image: require('../assets/dress2.png'), description: 'Stylish black dress' },
  { id: '3', name: 'Church Wear', price: 120, image: require('../assets/dress3.png'), description: 'Perfect for church' },
  { id: '4', name: 'Lamerei', price: 120, image: require('../assets/dress4.png'), description: 'Recycle Boucle Knit Cardigan Pink' },
  { id: '5', name: '21WLN', price: 120, image: require('../assets/dress5.png'), description: 'Classic white dress' },
  { id: '6', name: 'Lopo', price: 120, image: require('../assets/dress6.png'), description: 'Elegant lopo dress' },
  { id: '7', name: '21WLN', price: 120, image: require('../assets/dress1.png'), description: 'Classic white dress' },
  { id: '8', name: 'Lame', price: 120, image: require('../assets/dress7.png'), description: 'Elegant lame dress' },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadCart = async () => {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      };
      loadCart();
    }, [])
  );

  const addToCart = async (product) => {
    const productWithUniqueKey = { ...product, uniqueKey: uuidv4() };
    const updatedCart = [...cart, productWithUniqueKey];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Pressable style={styles.addButton} onPress={() => addToCart(item)}>
          <Image source={require('../assets/add_circle.png')} style={styles.icon} resizeMode="contain" />
        </Pressable>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor= '#fff' />
      <View style={styles.header}>
        <Pressable>
          <Image source={require('../assets/Menu.png')} style={styles.icon} resizeMode="contain" />
        </Pressable>
        <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.headerRight}>
          <Pressable>
            <Image source={require('../assets/Search.png')} style={styles.icon} resizeMode="contain" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Checkout', { cart })}>
            <Image source={require('../assets/shoppingBag.png')} style={styles.icon} resizeMode="contain" />
          </Pressable>
        </View>
      </View>
      <View style={styles.subHeader}>
        <Image source={require('../assets/our-story.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.subHeaderIcons}>
          <View style={styles.subHeaderIcon}>
            <Image source={require('../assets/Listview.png')} style={styles.subIcon} resizeMode="contain" />
          </View>
          <View style={styles.subHeaderIcon}>
            <Image source={require('../assets/Filter.png')} style={styles.subIcon} resizeMode="contain" />
          </View>
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logo: {
    width: 180,
    height: 40,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  headerRight: {
    flexDirection: 'row',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subHeaderIcons:{
    flexDirection: 'row',
  },
  subHeaderIcon: {
    marginRight: 10,
    borderRadius: 18,
    padding: 6,
    backgroundColor: '#eee'
  },
  subIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productList: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    margin: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 235,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  productName: {
    fontSize: 16,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default HomeScreen;
