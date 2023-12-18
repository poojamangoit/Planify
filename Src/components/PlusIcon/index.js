import React from 'react';
import {Pressable, Text} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const PlusIcon = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.navigate('AddTask');
  };
  return (
    <Pressable style={styles.container} onPress={openDrawer} hitSlop={8}>
      <Text style={styles.plus}>+</Text>
    </Pressable>
  );
};

export default React.memo(PlusIcon);
