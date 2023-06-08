import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { FAB } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../Firebase';
import { getDoc, doc, updateDoc, deleteDoc, query, collection, where, getDocs, onSnapshot } from 'firebase/firestore';
import LoadingScreen from './LoadingScreen';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from "expo-linear-gradient";

export default function Item({ navigation, route}) {
  const [data, setData] = useState(Object);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(false); 
  const [existing, setExisting] = useState(false);
  const [defaultText, setDefaultText] = useState("");
  


  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  
  async function handleUpdate() {
    if (newTitle.trim() === '' || newDescription.trim() === '') {
      alert('Please enter a Title and Description.');
      return;
    }
    setLoading(true);
    if (await isAlreadyInDatabase(newTitle) && defaultText != newTitle){
      Toast.show({
        type: 'error',
        text1: 'Title already taken.',
      });
      setLoading(false);
      return;
    }
    else{

      const docRef = doc(db, 'Data', route.params);
      updateDoc(docRef, {
        Title: newTitle,
        Description: newDescription,
        TitleLowerCase: newTitle.toLowerCase(),
      }).then(() => {
        Toast.show({
          type: 'success',
          text1: 'ITEM UPDATED SUCCESSFULLY',
        });
        navigation.goBack();
      }).catch((error) => {
        let errorMessage = error.message;
        alert(errorMessage); 
        console.log('Error updating item: ' + errorMessage);
      }).finally(() => {
        setLoading(false); 
      });
          
    }
 
    
  }

  async function isAlreadyInDatabase(text){
    const docs = collection(db, 'Data');
    const q = query(docs, where("TitleLowerCase", "==", newTitle.trim().toLowerCase()));
    const dataList = [];
    
    return new Promise((resolve, reject) => {
      onSnapshot(q, (documents) => {
        documents.forEach( (docu) => {
          dataList.push(docu);
        })
        resolve(dataList);
      }, (error) => {
        reject(error);
        console.log('Error checking database: ' + error.message); 
      });
    }).then((dataList) => {
      console.log(dataList.length != 0)
      return dataList.length != 0;
    }).catch((error) => {
     console.log('Error checking database: ' + error.message); 
      return false;
    });
  }

  

  function getData() {
    const docRef = doc(db, 'Data', route.params);
    getDoc(docRef).then((data) => {
      setData(data.data());
      setNewTitle(data.data().Title);
      setDefaultText(data.data().Title);
      setNewDescription(data.data().Description);
      setLoading(false);
    }).catch((error) => {
      
      console.log('Error fetching item data: ' + error);
      navigation.goBack();
    });
  }


  
  function handleDelete() {
  
    setLoading(true);
    const docRef = doc(db, 'Data', route.params);
    deleteDoc(docRef).then(() => {
      Toast.show({
        type: 'success',
        text1: 'ITEM DELETED SUCCESSFULLY',
      });
      navigation.goBack(); 
    }).catch((error) => {
      let errorMessage = error.message;
      alert(errorMessage); // Show the error message on an alert box
      console.log('Error deleting item: ' + errorMessage);
    }).finally(() => {
      setLoading(false); 
    });
  }

  const specialCharsPattern = /[^\w\s]/gi;
  
  function handleChangeTitle(text) {
    setNewTitle(text.replace(specialCharsPattern, '')); // remove special characters
  }
  function handleChangeDescription(text) {
    setNewDescription(text.replace(specialCharsPattern, '')); // remove special characters
  }

  return (

    <SafeAreaView style={styles.container}>
      {loading && <LoadingScreen />}
      
      <TouchableOpacity style={styles.goBackButton} onPress={() => {navigation.goBack()}}>
      <Icon
          
          name={'chevron-circle-left'}
          size={30}
          color={"white"}
          />
      </TouchableOpacity>


      <View style={styles.contentContainer}>

      
      <Image style={{
            resizeMode: 'contain',
            zIndex: -20,
            height: 250,
            marginBottom: 20,
            }} source={require('../assets/where.png')} />
        <TextInput
          style={styles.titleInput}
          value={newTitle}
          onChangeText={handleChangeTitle}
        />

        <TextInput
          style={styles.descriptionInput}
          value={newDescription}
          onChangeText={handleChangeDescription}
          multiline
          numberOfLines={5}
        />
        <View style={styles.buttonsContainer}>

          <TouchableOpacity style={styles.editButton} onPress={handleUpdate}>
          <Icon
          style={{ marginHorizontal: 10}}
          name={'edit'}
          size={20}
          color={"white"}
          />
           <Text style={{color: 'white', fontWeight: 'bold'}}>Edit</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Icon
          style={{ marginHorizontal: 8}}
          name={'trash'}
          size={20}
          color={"white"}
          />
          <Text style={{color: 'white', fontWeight: 'bold'}}>Remove</Text>
           
          </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    zIndex: -1,
  },
  goBackButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#5B00FF',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    zIndex: -1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    paddingBottom: 20,
    zIndex: -1, 
  },
  titleInput: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    overflow: 'visible',
    borderWidth: 2,
    paddingHorizontal: 20,
    borderColor: '#5B00FF',
    paddingVertical: 10,
    borderRadius: 5,
    zIndex: -1,
  },
  descriptionInput: {
    borderWidth: 2,
    borderColor: '#5B00FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    textAlignVertical: 'top',
    marginBottom: 30,
    zIndex: -1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    width: '40%',
    backgroundColor: '#5B00FF',
    padding: 10,
    borderRadius: 5,
    marginRight: 20,
    elevation: 5,
    flexDirection: 'row',
    zIndex: -1,
  },
  deleteButton: {
    width: '40%',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    zIndex: -1,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    zIndex: -1,
  },
});
