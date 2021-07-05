/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,TextInput,
  Text,Button,
  StatusBar,
} from 'react-native';


import ListProduct from './components/ListProduct'

import ProjectStack from './components/ProjectStack'
import {NavigationContainer} from '@react-navigation/native'
import rootReducer from './components/rootReducer/rootReducer'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const store=createStore(rootReducer)

const App: () => React$Node = () => {

 

  return (
    <Provider store={store}>
  <NavigationContainer>
    <ProjectStack/>
    </NavigationContainer>
    </Provider>
  );
};


export default App;
