import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Login: undefined;
};

export type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type AboutScreenProp = StackNavigationProp<RootStackParamList, 'About'>;
