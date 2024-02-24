import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SingleButton } from '../components/Inputs/ButtonSet';
import { COLOR } from '../constants';

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/welcome.jpg')} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome Screen</Text>
        <SingleButton title='Log In' onPress={handleLogin}>Login</SingleButton>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerText}>If you don't have an account, register here.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  registerText: {
    color: 'darkblue',
  },
});

export default WelcomeScreen;