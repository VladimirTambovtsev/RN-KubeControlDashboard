import React, {FC} from 'react';
import {Text} from 'react-native';
import s from './Header.module.scss';

interface Props {
  text: string;
}

export const Header: FC<Props> = ({text}) => {
  return <Text style={s.header}>{text}</Text>;
};
