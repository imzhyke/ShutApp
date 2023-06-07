
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Login from './Screens/Login';
import RegisterPage from './Screens/Register';
import ToDo from './Screens/ItemList';
import Item from './Screens/Item';
import AddData from './Screens/AddItem';
// import Toast from 'react-native-toast-message';
import Dashboard from './Screens/dashboard';
import Helpus from './Screens/Helpus';
import About from './Screens/About';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TheNav(){
  return(

    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false,tabBarStyle: { paddingBottom: 20 }}
    }
     
      
    >
      <Tab.Screen
        name= "Home"
        component={Dashboard}
        options={{ title: 'Home',
        tabBarIcon:({size,color})=>(
            <MaterialCommunityIcons
            size={size} color={color}/>
        )
      }}
      />

      <Tab.Screen
        name= "List"
        component={ToDo}
        options={{ title: 'List',
        tabBarIcon:({size,color})=>(
            <MaterialCommunityIcons
            size={size} color={color}/>
        )
      }}
      />

    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown: false}}>

        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={RegisterPage}/>
        <Stack.Screen name="TheNav" component={TheNav}/>
        {/* <Stack.Screen name="Home" component={ToDo}/>
        <Stack.Screen name="Item" component={Item}/>
        <Stack.Screen name="Add" component={AddData}/>
        <Stack.Screen name="Dashboard" component={dashboard}/>
        <Stack.Screen name="Help" component={Helpus}/>
        <Stack.Screen name="About" component={About}/> */}
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default App;