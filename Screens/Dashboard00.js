import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, ImageBackground, TouchableOpacity, View, Alert, BackHandler, Image } from 'react-native';
import { Button, FAB } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth, db } from '../Firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import LoadingScreen from './LoadingScreen';

const Dashboard00 = ({navigation}) => {
  const [dataList, setDataList] = useState([]);
  const [num, setNum] = useState([]);

  function getData() {
    const docs = collection(db, 'Data');
    const ref = query(docs, orderBy('createdAt', 'desc'));
    onSnapshot(ref, (ducs) => {
      const oten = [];
      ducs.forEach((element) => {
        oten.push({ ID: element.id, ...element.data() });
      });
      setDataList(oten);
      console.log(oten.length);
      setNum(oten.length);
    })
  }

  useEffect(() => {
    getData();
  }, []);

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
    <View>
    <View style={styles.headerContainer}>
    <View>
    <Image style={{
            resizeMode: 'contain',
            width: 70,
            height: 70,
            }} source={require('../assets/user.png')} />
    </View>
        <View style={{flexDirection: 'column', marginHorizontal: 30, paddingVertical: 15}}>

        <Text style={styles.title}>Welcome</Text>
        <Text style={{marginHorizontal: -20, color: 'white', fontWeight: 'bold'}}>{Auth.currentUser?.email}</Text>
        </View>
   
      {/* <FAB
        title="Logout"
        color="#ffffff"
        
      /> */}
       <Icon
       style={{marginLeft: 30}}
          name={'sign-out-alt'}
          size={20}
          color={"white"}
          onPress={handleLogout}/>
    </View>
    {/* /* <TouchableOpacity style={{backgroundColor: 'red'}} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.addButtonText}>VIEW LIST</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor: 'blue'}} onPress={() => navigation.navigate('About')}>
          <Text style={styles.addButtonText}>About</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor: 'violet'}} onPress={() => navigation.navigate('Help')}>
          <Text style={styles.addButtonText}>HElp</Text>
    </TouchableOpacity> */ }
    <View style={{backgroundColor: '#00aabb', height: 150, borderRadius: 20, margin: 20, flexDirection: 'row'}}>
          <View style={{flexDirection:'column'}}>
          <Text>
                Total
          </Text>
          <Text>
                {num}
          </Text>
          </View>
          
    </View>
</View>
  )
}

export default Dashboard00

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
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
    marginLeft: -20,
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
    imgbackground: {
    flex: 1,
    width: '100%',
    },

});