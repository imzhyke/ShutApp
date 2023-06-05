import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, BackHandler, Image } from 'react-native';
import { Button, FAB } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth, db } from '../Firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import LoadingScreen from './LoadingScreen';


export default function ToDo({ navigation }) {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnFirst, setIsOnFirst] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  function getData() {
    const docs = collection(db, 'Data');
    const ref = query(docs, orderBy('createdAt', 'desc'));
    onSnapshot(ref, (ducs) => {
      const oten = [];
      ducs.forEach((element) => {
        oten.push({ ID: element.id, ...element.data() });
      });
      setDataList(oten);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

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

  const handleSearch = () => {
    if (searchQuery !== '') {
      const docs = collection(db, 'Data');
      const ref = query(
        docs, where('TitleLowerCase', '>=', searchQuery.trim().toLowerCase()), where('TitleLowerCase', '<=', searchQuery.trim().toLowerCase() + '\uf8ff')
      );
      onSnapshot(ref, (ducs) => { 
        const oten = [];
        ducs.forEach((element) => {
          oten.push({ ID: element.id, ...element.data() });
        });
        setDataList(oten);
      })
    } else {
      getData();
    }
  }
  

  if (isLoading) {
    return <LoadingScreen /> // Show the loading screen while fetching data
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#ffffff'}}>
      
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Item List</Text>
        <FAB
          title="Logout"
          color="#ffffff"
          onPress={handleLogout}
          buttonStyle={styles.fab}
        />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Filter by title..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          clearButtonMode="while-editing"
        />
      </View>

      <ScrollView style={styles.contentContainer}>
        {dataList.map((data, index) => {
          return (<Block key={index} data={data} nav={navigation}/>);
        })}
      </ScrollView>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    paddingHorizontal: 20,
    backgroundColor: '#00aabb',
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
    padding: 20,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    flexDirection: 'row',
  },
  blockTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blockDescription: {
    color: '#ffffff',
    fontSize: 16,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: '#ff7f50',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  searchInput: {
    backgroundColor: '#e1e1e1',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#ff7f50',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchButtonText: {
    color: '#ffffff',
  },
});
