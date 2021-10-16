import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const Settings = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View>
        <Text>Settings</Text>
      </View>
    </SafeAreaView>
  );
};
