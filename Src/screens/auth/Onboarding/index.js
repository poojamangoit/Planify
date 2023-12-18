import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import Button from '../../../components/Button';

const Onboarding = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image
          style={styles.image}
          source={require('../../../assets/onboarding.png')}
        />
        <View style={styles.footer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Best Task Management app.</Text>
        <Text style={styles.subTitle}>
          Get organized by sorting out all your tasks and boost your
          productivity.
        </Text>

        <Button onPress={() => navigation.navigate('SignIn')}>Log in</Button>
        <Button type={'blue'} onPress={() => navigation.navigate('Signup')}>
          Get Started
        </Button>
      </View>
    </View>
  );
};

export default React.memo(Onboarding);
