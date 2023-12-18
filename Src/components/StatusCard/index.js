import React from 'react';
import {Pressable, Text} from 'react-native';
import getStyles from './styles';
import {useNavigation} from '@react-navigation/native';

const StatusCard = ({label, count, type}) => {
  const navigation = useNavigation();
  const styles = getStyles(type);
  const openDrawer = () => {
    navigation.navigate('Tasks');
  };
  return (
    <Pressable style={styles.container} onPress={openDrawer} hitSlop={8}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.count}>{count}</Text>
    </Pressable>
  );
};

export default React.memo(StatusCard);
