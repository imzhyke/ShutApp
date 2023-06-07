import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, BackHandler, Image } from 'react-native';
import { Button, FAB } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth, db } from '../Firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import LoadingScreen from './LoadingScreen';

const Dashboard = ({navigation}) => {

  const Block = ({data, nav}) =>{
    let id = data.ID;
    return (
      <TouchableOpacity
        onPress={() => {nav.navigate('Item', id); setIsOnFirst(false);}}
        activeOpacity={0.6}
        style={styles.block}
      >
        <Image style={{
            resizeMode: 'contain',
            width: 100,
            height: 100,
            }} source={require('../assets/main.png')} />
      <View style={{flex:  1, flexDirection: 'column'}}>
        <Text style={styles.blockTitle}>{data.Title}</Text>
        <Text style={styles.blockDescription}>{data.Description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
      const handleLogout = () => {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            {
              text: 'Logout',
              onPress: () => {
                signOut(Auth).then(() => {
                  navigation.replace('Login');
                }).catch((error) => {
                  let errorMessage = error.message;
                  alert(errorMessage); // Show the error message on an alert box
                })
              },
              style: 'destructive',
            },
          ],
          {cancelable: true},
        );
      }
    
  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#ffffff'}}>
      
    <View style={styles.headerContainer}>
    <View>


    </View>

      <Text style={styles.title}>Item List</Text>
      <FAB
        title="Logout"
        color="#ffffff"
        onPress={handleLogout}
        buttonStyle={styles.fab}
      />
    </View>
    <TouchableOpacity style={{backgroundColor: 'red'}} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.addButtonText}>VIEW LIST</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor: 'blue'}} onPress={() => navigation.navigate('About')}>
          <Text style={styles.addButtonText}>About</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor: 'violet'}} onPress={() => navigation.navigate('Help')}>
          <Text style={styles.addButtonText}>HElp</Text>
    </TouchableOpacity>

  </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    paddingHorizontal: 20,
    backgroundColor: '#00aabb',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    flex: 1,
  },
  fab: {
    backgroundColor: '#ff7f50',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
  },
  contentContainer: {
    flexGrow: 1,
  },
  block: {
    backgroundColor: '#00aabb',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    flexDirection: 'row',
  },
  blockTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  blockDescription: {
    color: '#ffffff',
    fontSize: 16,
  },

});