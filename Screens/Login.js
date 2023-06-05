import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Auth, signIn } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import RegisterPage from './Register';
import LoadingScreen from './LoadingScreen';

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
        navigation.replace('Home');
      }
    });

    return unsubscribe; // Unsubscribe from the listener when component unmounts
  }, []);

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
    {loading && <LoadingScreen />}
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Log in with your email and password</Text>
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
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create an Account</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
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
    backgroundColor: '#F9A620',
  },
  registerButton: {
    backgroundColor: '#B0B0B0',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
