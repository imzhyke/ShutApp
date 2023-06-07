import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ImageBackground, Image, TouchableOpacity, View } from 'react-native';
import { Auth, signIn } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import RegisterPage from './Register';
import LoadingScreen from './LoadingScreen';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(Auth, username, password)
      .then((userCredential) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        let errorMessage = '';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address format!';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Invalid email or password, please try again.';
            break;
            case 'auth/wrong-password':
              errorMessage = 'Invalid email or password, please try again.';
              break;
              case 'auth/missing-password':
                errorMessage = 'Password should not be empty!';
                break;
          default:
            errorMessage = error.message;
            break;
        }
        alert(errorMessage);
      });
  };

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('TheNav');
      }
    });

    return unsubscribe; // Unsubscribe from the listener when component unmounts
  }, []);

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (

    <ImageBackground resizeMode="cover" source={require('../assets/bgimage.jpg')} style={styles.imgbackground}>
    <Toast ref= {(ref)=> {Toast.setRef(ref)} }/>
    <View style={styles.container}>
    {loading && <LoadingScreen />}
    <Image style={{
            resizeMode: 'contain',
            zIndex: -20,
            height: 250,
            }} source={require('../assets/main.png')} />
      <Text style={styles.title}>Shut App!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
        <Text style={[styles.buttonText,styles.buttonText1]}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create an Account</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold',
    marginTop: -20,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#5B00FF',
    color: '#1C0A80',
    backgroundColor: '#E3E3E3',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: '80%',
    marginBottom: 20,
    zIndex: -1,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
    width: '80%',
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
    color: '#5B00FF',
  },
  buttonText1: {
    color: 'white',
  },
  imgbackground: {
    flex: 1,
    width: '100%',
    },
});
