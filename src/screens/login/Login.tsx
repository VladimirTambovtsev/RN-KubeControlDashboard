import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import s from './Login.module.scss';
import {Header} from '../../components/Header/Header';
import {Input} from '../../components/Input/Input';
import {HomeScreenProp} from '../../router/Navigation.interface';

export const Login = () => {
  const navigation = useNavigation<HomeScreenProp>();

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        source={require('../../../assets/images/background_dot.png')}
        resizeMode="repeat"
        style={s.background}>
        <KeyboardAvoidingView style={s.loginContainer} behavior="padding">
          <Image
            source={require('../../../assets/images/logo.png')}
            style={s.logo}
          />
          <Header text="Welcome back." />
          <Input
            // label="Email"
            returnKeyType="next"
            value={''}
            onChangeText={() => console.log('1')}
            // error={!!email.error}
            // errorText={email.error}
            placeholder="Login"
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <Input
            // label="Password"
            returnKeyType="done"
            placeholder="Password"
            // value={password.value}
            // onChangeText={text => setPassword({value: text, error: ''})}
            // error={!!password.error}
            // errorText={password.error}
            secureTextEntry
          />
          <View style={s.forgotPassword}>
            <TouchableOpacity
            // onPress={() => navigation.navigate('ResetPasswordScreen')}
            >
              <Text style={s.forgot}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          {/* <Button mode="contained" onPress={onLoginPressed}>
            Login
          </Button> */}
          <View style={s.row}>
            <Text style={s.dontHaveAccount}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('Home')}>
              <Text style={s.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};
