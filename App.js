import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Routes from './Src/Routes';
import {Provider} from 'react-redux';
import store from './Src/store';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={appTheme}>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
