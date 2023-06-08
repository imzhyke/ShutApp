import { View, Text, Image, Linking, TouchableOpacity } from 'react-native'
import React, {useCallback} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Auth, db } from '../Firebase';


const url = 'https://www.facebook.com/callmezyk00';


export default function Helpus() {
  return (
    // <View style={{backgroundColor: '#5B00FF',padding: 20, margin: 20, height: '95%', borderRadius: 10,justifyContent: 'center',alignItems: 'center'}}>
    
    
    <LinearGradient
        colors={['#bb94ff', '#5B00FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{padding: 20, margin: 20, height: '95%', borderRadius: 10,justifyContent: 'center',alignItems: 'center', zIndex: -999}}
      >
      <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', marginTop: 10}}>Logged In User</Text>
           <Image style={{
           
            resizeMode: 'contain',
            zIndex: 9999,
           
width: 200, height: 200, 
            }} source={require('../assets/user.png')} />

<Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{Auth.currentUser?.email}</Text>

<View style={{flexDirection: 'row'}}>
<TouchableOpacity  onPress={ async () =>  await Linking.openURL("https://www.facebook.com")}>

<View style={{backgroundColor: 'white', padding: 10, margin: 10, flexDirection: 'row', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
<Icon
          name={'facebook'}
          size={34}
          color={"#5B00FF"}
          />

</View>
</TouchableOpacity>

<TouchableOpacity  onPress={ async () =>  await Linking.openURL("https://www.twitter.com")}>

<View style={{backgroundColor: 'white', padding: 10, margin: 10, flexDirection: 'row', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
<Icon
          name={'twitter'}
          size={34}
          color={"#5B00FF"}
          />

</View>
</TouchableOpacity>

<TouchableOpacity  onPress={ async () =>  await Linking.openURL("https://www.github.com")}>

<View style={{backgroundColor: 'white', padding: 10, margin: 10, flexDirection: 'row', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
<Icon
          name={'github'}
          size={34}
          color={"#5B00FF"}
          />

</View>
</TouchableOpacity>


</View>


 
    </LinearGradient>
  )
}