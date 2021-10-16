import React, {FC} from 'react';
import {View} from 'react-native';
import s from './Card.module.scss';

interface Props {
  children: React.ReactNode;
}

export const Card: FC<Props> = ({children}) => {
  return <View className={s.card}>{children}</View>;
};
