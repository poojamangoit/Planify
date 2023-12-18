/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Onboarding from './screens/auth/Onboarding';
import SignIn from './screens/auth/SignIn';
import Signup from './screens/auth/Signup';
import auth from '@react-native-firebase/auth';
import {Image, StyleSheet, Text, View} from 'react-native';
import Home from './screens/app/Home';
import Tasks from './screens/app/Tasks';
import AddTask from './screens/app/AddTask';
import DrawerContent from './components/DrawerContent';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from './store/user';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(setUser(user));
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  const Tabs = () => (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false, headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require('./assets/home_active.png')
                  : require('./assets/home_inactive.png')
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require('./assets/calendar_active.png')
                  : require('./assets/calendar_inactive.png')
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );

  if (user) {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Tabs" component={Tabs} />
        <Drawer.Screen name="AddTask" component={AddTask} />
      </Drawer.Navigator>
    );
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
export default React.memo(Routes);
