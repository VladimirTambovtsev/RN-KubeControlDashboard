import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../../screens/home/Home';
import {Settings} from '../../screens/settings/Settings';

const Tabs = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <>
      <Tabs.Navigator
      // screenOptions={({route}) => ({
      //   tabBarIcon: ({focused, color, size}) => {
      //     let iconName;

      //     if (route.name === 'Home') {
      //       iconName = focused
      //         ? 'ios-information-circle'
      //         : 'ios-information-circle-outline';
      //     } else if (route.name === 'Settings') {
      //       iconName = focused ? 'ios-list-box' : 'ios-list';
      //     }

      //     // You can return any component that you like here!
      //     return <Ionicons name={iconName} size={size} color={color} />;
      //   },
      //   tabBarActiveTintColor: 'tomato',
      //   tabBarInactiveTintColor: 'gray',
      // })}
      >
        <Tabs.Screen name="Home" component={Home} />
        <Tabs.Screen name="Settings" component={Settings} />
      </Tabs.Navigator>
    </>
  );
};
