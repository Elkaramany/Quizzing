import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Router from '../Router';
import UserSignup from '../Auth/Signup';
import UserSignupFinal from '../Auth/SignupFinal';
import TeacherNavigator from './TeacherNavigator'
import StudentNavigator from './StudentNavigator'

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName={'Router'}
    >
      <Stack.Screen name="Router" component={Router} />
      <Stack.Screen name="UserSignup" component={UserSignup} />
      <Stack.Screen name="UserSignupFinal" component={UserSignupFinal} />
      <Stack.Screen name="TeacherNavigator" component={TeacherNavigator} />
      <Stack.Screen name="StudentNavigator" component={StudentNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
