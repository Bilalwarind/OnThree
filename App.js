/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  usecolorcheme,
  View,
} from 'react-native';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persister, store} from './src/redux/store';

//  console.disableYellowBox = true;

const App = () => {
  return (
    <>
      {/* <StatusBar animated={true} backgroundColor={Colors.primary} /> */}
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <Navigation />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
