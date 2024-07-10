import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { useFocusEffect } from '@react-navigation/native';
import 'react-native-get-random-values';
import Header from '../components/Header';
import Icons from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadCart = async () => {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      };

      const fetchProducts = async () => {
        try {
          const response = await fetch("https://fakestoreapi.com/products");
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error(error);
        }
      };

      loadCart();
      fetchProducts();
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
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { item })}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <View style={styles.iconContainer}>
            <Icons name="plus" size={12} color="#fff" />
          </View>        
        </TouchableOpacity>
      </TouchableOpacity>
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor='#fff' />
      <Header navigation={navigation} cart={cart} />
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
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  subHeaderIcons: {
    flexDirection: 'row',
  },
  subHeaderIcon: {
    marginRight: 10,
    borderRadius: 18,
    padding: 6,
    backgroundColor: '#eee'
  },
  logo: {
    width: 180,
    height: 40,
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
    marginBottom: 15,
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
  iconContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 14, 
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    color: '#dd8661',
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
