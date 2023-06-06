
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import RegisterPage from './Screens/Register';
import ToDo from './Screens/ItemList';
import Item from './Screens/Item';
import AddData from './Screens/AddItem';
import Toast from 'react-native-toast-message';
import dashboard from './Screens/dashboard';
import Helpus from './Screens/Helpus';
import About from './Screens/About';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false}}/>
        <Stack.Screen name="Home" component={ToDo} options={{ headerShown: false}}/>
        <Stack.Screen name="Item" component={Item} options={{ headerShown: false}}/>
        <Stack.Screen name="Add" component={AddData} options={{ headerShown: false}}/>
        <Stack.Screen name="Dashboard" component={dashboard} options={{ headerShown: false}}/>
        <Stack.Screen name="Help" component={Helpus} options={{ headerShown: false}}/>
        <Stack.Screen name="About" component={About} options={{ headerShown: false}}/>
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default App;