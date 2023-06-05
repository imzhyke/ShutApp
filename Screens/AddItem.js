import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../Firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import LoadingScreen from './LoadingScreen';
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
      alert('Please enter a title and description.');
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
      <TouchableOpacity style={styles.goBackButton} onPress={() => {navigation.goBack()}}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.titleInput}
        value={newTitle}
        onChangeText={text => {
          handleChangeTitle(text);
        }}
        placeholder="Title"
      />

      <TextInput
        style={styles.descriptionInput}
        value={newDescription}
        onChangeText={text => {
          handleChangeDescription(text);
        }}
        placeholder="Description"
        multiline
        numberOfLines={5}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleAddData}>
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
    backgroundColor: '#00aabb',
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
    borderColor: '#00aabb',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 30,
    width: 300,
  },
  descriptionInput: {
    borderWidth: 2,
    borderColor: '#00aabb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
    marginBottom: 30,
    width: 300,
  },
  submitButton: {
    backgroundColor: '#00aabb',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});
