import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  useColorScheme,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import {AboutScreenProp} from '../../router/Navigation.interface';

export const About = () => {
  const navigation = useNavigation<AboutScreenProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View>
        <Text>About</Text>
        <Button
          title="Go back to Home Page"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </SafeAreaView>
  );
};
