import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';

const ProductDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    loadCart();
  }, []);

  const addToCart = async (product) => {
    const productWithUniqueKey = { ...product, uniqueKey: uuidv4() };
    const updatedCart = [...cart, productWithUniqueKey];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor='#fff' />
      <Header navigation={navigation} cart={cart} />
      <View style={styles.product}>
        <View style={styles.productImage}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.productDetails}>
          <View style={styles.productTitle}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={require("../assets/Export.png")} style={styles.icon} resizeMode="contain" />
          </View>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.productDescription}>{item.category}</Text>
          <Text style={styles.materialTitle}>MATERIALS</Text>
          <Text style={styles.productDescription}>{item.description}</Text>
          <View style={styles.materialIcons}>
            <View style={styles.instruction}>
              <Image
                source={require("../assets/Do Not Bleach.png")}
                style={styles.materialIcon}
              />
              <Text>Do not use bleach</Text>
            </View>
            <View style={styles.instruction}>
              <Image
                source={require("../assets/Do Not Tumble Dry.png")}
                style={styles.materialIcon}
              />
              <Text>Do not tumble dry</Text>
            </View>
            <View style={styles.instruction}>
              <Image
                source={require("../assets/Do Not Wash.png")}
                style={styles.materialIcon}
              />
              <Text>Dry clean with tetrachloroethylene</Text>
            </View>
            <View style={styles.instruction}>
              <Image
                source={require("../assets/Iron Low Temperature.png")}
                style={styles.materialIcon}
              />
              <Text>Iron at a maximum of 110°C/230°F</Text>
            </View>
            <View style={styles.shippingInfo}>
              <Image
                source={require("../assets/Shipping.png")}
                style={styles.materialIcon}
              />
              <Text style={styles.shippingInfoText}>
                Free Flat Rate Shipping Estimated to be delivered on 09/11/2021 - 12/11/2021.
              </Text>
              <Image source={require("../assets/Up.png")} style={styles.icon} resizeMode="contain" />
            </View>
          </View>
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => addToCart(item)}>
      <Image source={require("../assets/Plus.png")} style={styles.ButtonIcon} resizeMode="contain" />
        <Text style={styles.buttonText}>ADD TO BASKET</Text>
        <Image source={require("../assets/Heart.png")} style={styles.ButtonIcon} resizeMode="contain" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Helvetica Neue',
    backgroundColor: 'white',
    paddingTop: 10,
  },
  product: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productImage: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 380,
    marginBottom: 20,
  },
  productDetails: {
    paddingHorizontal: 10,
  },
  productTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  icon: {
    marginLeft: 25,
  },
  title: {
    fontFamily: 'Helvetica Neue',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  materialTitle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 17,
    textTransform: 'uppercase',
    marginTop: 10,
  },
  productPrice: {
    fontFamily: 'Helvetica Neue',
    fontSize: 25,
    color: '#dd8661',
    marginBottom: 15,
    marginTop: 5,
  },
  instruction: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  productDescription: {
    lineHeight: 21,
    color: '#666',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
  },
  materialIcon: {
    height: 25,
    width: 25,
    marginRight: 12,
  },
  shippingInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#aaa',
    paddingTop: 30,
    marginBottom: 100,
  },
  shippingInfoText: {
    flex: 1,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  ButtonIcon: {
    width: 20,
    height: 20,
  },
});

export default ProductDetailScreen;
