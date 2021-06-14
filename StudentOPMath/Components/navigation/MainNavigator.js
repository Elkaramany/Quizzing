import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Router from '../Router';
import StudentNavigator from './StudentNavigator'
import ClosedStudent from '../Teacher/ClosedStudent';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName={'Router'}
    >
      <Stack.Screen name="Router" component={Router} />
      <Stack.Screen name="StudentNavigator" component={StudentNavigator} />
      <Stack.Screen name="ClosedStudent" component={ClosedStudent} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
