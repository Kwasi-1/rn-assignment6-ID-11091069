import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const DrawerMenu = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.categories}>
        <Text style={styles.userText}>Afful Nana Kwasi</Text>
        <View style={styles.underline}></View>
        <Text style={styles.category}>Store</Text>
        <Text style={styles.category}>Locations</Text>
        <Text style={styles.category}>Blog</Text>
        <Text style={styles.category}>Jewelry</Text>
        <Text style={styles.category}>Electronic</Text>
        <Text style={styles.category}>Clothing</Text>
      </View>
      <Pressable onPress={() => props.navigation.closeDrawer()} style= {styles.close}>
        <Image source={require('../assets/Close.png')}  />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginTop: 20,
  },
  categories: {
    paddingVertical: 10,
    marginTop: 20,
    position: 'relative',
  },
  
  userText: {
    fontSize: 19,
    fontWeight: '400',
    letterSpacing: 2, 
    textTransform: 'uppercase', 
    fontFamily: 'Helvetica Neue',
  },
  underline: {
    width: 180,
    height: 3,
    backgroundColor: '#f4a261', 
    marginTop: 8, 
    marginLeft: 10,
    marginBottom: 20,
  },
  category: {
    paddingVertical: 10,
    fontSize: 17,
  },
  close:{
    position: 'absolute',
    top: 0,
    left: 15,
  }
});

export default DrawerMenu;
