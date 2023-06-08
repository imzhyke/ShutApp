import { View, Text, Image, Linking, TouchableOpacity } from 'react-native'
import React, {useCallback} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome5'


const url = 'https://www.facebook.com/callmezyk00';


export default function About() {
  return (
    // <View style={{backgroundColor: '#5B00FF',padding: 20, margin: 20, height: '95%', borderRadius: 10,justifyContent: 'center',alignItems: 'center'}}>
    
    
    <LinearGradient
        colors={['#5B00FF', '#bb94ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{padding: 20, margin: 20, height: '95%', borderRadius: 10,justifyContent: 'center',alignItems: 'center', zIndex: -999}}
      >
       <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', marginBottom: 20}}>This mobile application is created by</Text>
     <Image style={{
           
            resizeMode: 'contain',
            zIndex: 9999,
           
width: 200, height: 200, borderRadius: 200/ 2, borderWidth: 4, borderColor: "white",
            }} source={require('../assets/eze.jpg')} />

<Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>Ezekiel P. Villadolid</Text>
<Text style={{ color: 'white', fontSize: 20, textAlign: 'center', marginTop: 10}}>BSIT 3-1 EVE</Text>
<Text style={{ color: 'white', fontSize: 20, textAlign: 'center', marginTop: 10}}>2023</Text>
<TouchableOpacity  onPress={ async () =>  await Linking.openURL(url)}>

<View style={{backgroundColor: 'white', padding: 10, margin: 10, flexDirection: 'row', width: '90%', borderRadius: 20, justifyContent: 'space-between', alignItems: 'center'}}>
<Icon
          name={'facebook'}
          size={34}
          color={"#5B00FF"}
          />
<Text style={{color: '#5B00FF', fontWeight: 'bold'}}>facebook.com/callmezyk00</Text>
  
</View>
</TouchableOpacity>

 
    </LinearGradient>
  )
}