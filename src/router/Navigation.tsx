import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/home/Home';
import {About} from '../screens/about/About';
import {TabNavigation} from './TabNavigation/TabNavigation';
import {Login} from '../screens/login/Login';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{title: 'About'}}
        />
      </Stack.Navigator>

      {/* <TabNavigation /> */}
    </NavigationContainer>
  );
};
