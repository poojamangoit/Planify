import React from 'react';
import styles from './styles';
import {Pressable, View} from 'react-native';

const CheckBox = ({checked, onPress}) => {
  return (
    <Pressable
      style={[styles.container, checked ? styles.checkedBox : {}]}
      onPress={onPress}>
      {checked ? <View style={styles.innerSquare} /> : null}
    </Pressable>
  );
};

export default React.memo(CheckBox);
