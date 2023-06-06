import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Auth } from '../Firebase';
import { ToastAndroid } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import LoadingScreen from './LoadingScreen';

const backgroundImg = { uri: 'https://source.unsplash.com/pWkk7iiCoDM/1080x1920' };

export default function RegisterPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // add isLoading state

  const handleRegister = async () => {  
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(Auth, username, password);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      let errorMessage = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'That email address is already in use!';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format!';
          break;
          case 'auth/weak-password':
            errorMessage = 'Password should be at least 6 characters!';
            break;
            case 'auth/missing-password':
              errorMessage = 'Password should not be empty!';
              break;
        default:
          errorMessage = error.message;
          break;
      }
      alert(errorMessage);
    }
  };

  if (isLoading) { // if isLoading is true, render the loading screen
    return <LoadingScreen />;
  }

  return (

    <ImageBackground resizeMode="cover" source={require('../assets/bgimage.jpg')} style={styles.imgbackground}>
    <View style={styles.container}>
    
          <View style={styles.formContainer}>

          <Image style={{
            resizeMode: 'contain',
            zIndex: -20,
            height: 250,
            }} source={require('../assets/main.png')} />

            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>Sign up with your email and password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
            <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleRegister}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Already have an account? Log in</Text>
            </TouchableOpacity>
          </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#5B00FF',
    color: '#1C0A80',
    backgroundColor: '#E3E3E3',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: '90%',
    marginBottom: 20,
    zIndex: -1,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
    width: '90%',
    zIndex: -1,
  },
  loginButton: {
    backgroundColor: '#5B00FF',
  },
  registerButton: {
    backgroundColor: 'white',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  buttonText1: {
    color: 'white',
  },
  imgbackground: {
    flex: 1,
    width: '100%',
    },
});
