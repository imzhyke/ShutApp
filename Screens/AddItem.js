import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { db } from '../Firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import LoadingScreen from './LoadingScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';

export default function AddData({ navigation }) {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      });
    }).then((dataList) => {
      console.log(dataList.length != 0)
      return dataList.length != 0;
    }).catch((error) => {
      console.log('Error checking database: ' + error.message);
      return false;
    });
  }


  async function handleAddData() {
    if (!newTitle || !newDescription) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a title and description.',
      });
    
      return;
    }
    setIsLoading(true);

    if (await isAlreadyInDatabase(newTitle)){
      Toast.show({
        type: 'error',
        text1: 'Title already taken.',
      });
      setIsLoading(false);
      return;
    }
    else{
      
    console.log('Adding data to Firestore...');
  
    try {
      // Get the current date and time
      const now = new Date();
  
      // Add data to Firestore with createdAt field
      const docRef = await addDoc(collection(db, 'Data'), {
        Title: newTitle,
        Description: newDescription,
        TitleLowerCase: newTitle.toLowerCase(),
        createdAt: now
      });
  
      Toast.show({
        type: 'success',
        text1: 'Add Successful!',
      });
  
      setNewTitle('');
      setNewDescription('');
  
      navigation.goBack();
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding the document. Please ensure you have an active internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
    }
  }

  
  const specialCharsPattern = /[^\w\s]/gi;
  
  function handleChangeTitle(text) {
    setNewTitle(text.replace(specialCharsPattern, '')); // remove special characters
  }
  function handleChangeDescription(text) {
    setNewDescription(text.replace(specialCharsPattern, '')); // remove special characters
  }

  return (
    <View style={styles.container}>
     <Toast ref1= {(ref)=> {Toast.setRef(ref)} }/>
      <TouchableOpacity style={styles.goBackButton} onPress={() => {navigation.goBack()}}>
      <Icon
          
          name={'chevron-circle-left'}
          size={30}
          color={"white"}
          />
      </TouchableOpacity>


      <Image style={{
            resizeMode: 'contain',
            zIndex: -20,
            height: 250,
            }} source={require('../assets/add.png')} />


      <TextInput
        style={styles.titleInput}
        value={newTitle}
        onChangeText={text => {
          handleChangeTitle(text);
        }}
        placeholder="Secret Name"
      />

      <TextInput
        style={styles.descriptionInput}
        value={newDescription}
        onChangeText={text => {
          handleChangeDescription(text);
        }}
        placeholder="Description.."
        multiline
        numberOfLines={5}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleAddData}>
      <Icon
          style={{ marginHorizontal: 10}}
          name={'paper-plane'}
          size={30}
          color={"white"}
          />
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {isLoading && <LoadingScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    overflow: 'visible',
    borderWidth: 2,
    paddingHorizontal: 20,
    borderColor: '#5B00FF',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 30,
    width: 300,
    zIndex: -22,
  },
  descriptionInput: {
    borderWidth: 2,
    borderColor: '#5B00FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
    marginBottom: 30,
    width: 300,
  },
  submitButton: {
    backgroundColor: '#5B00FF',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    width: '100%'
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 3,
    marginRight: 15,
    fontSize: 18,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    
  },
});
