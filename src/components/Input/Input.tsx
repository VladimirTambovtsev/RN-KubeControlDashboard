import React, {FC} from 'react';
import {View, Text, TextInput, TextInputProps} from 'react-native';
import s from './Input.module.scss';

interface Props extends TextInputProps {
  errorText?: string;
  description?: string;
}
export const Input: FC<Props> = props => {
  return (
    <>
      <View style={s.container}>
        <TextInput
          style={s.input}
          // placeholder=""
          placeholderTextColor="black"
          borderBottomWidth={2}
          borderBottomColor="gray"
          // selectionColor={theme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          {...props}
        />
        {/* {description && !errorText ? (
          <Text style={s.description}>{description}</Text>
        ) : null}
        {errorText ? <Text style={s.error}>{errorText}</Text> : null} */}
      </View>
    </>
  );
};
