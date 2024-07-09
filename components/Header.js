import { View, Pressable, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (  
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
  );
};

const styles = StyleSheet.create({
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
});
 
export default Header;