import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
// import { Linking } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPass from './screens/ForgotPass';
import HomeScreen from './screens/HomeScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['https://your-server.com','exp://192.168.1.3:8081', 'StudentNote://'],
  config: {
    screens: {
      Login: 'login',
      Signup: 'signup',
      ForgotPass: 'forgot-pass',
      ResetPasswordScreen: 'reset-password',
    },
  },
};


export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='ResetasswordScreen' component={ResetPasswordScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
        <Stack.Screen name='ForgotPass' component={ForgotPass} />
        <Stack.Screen name='Home' component={HomeScreen} />

        {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  )
}
