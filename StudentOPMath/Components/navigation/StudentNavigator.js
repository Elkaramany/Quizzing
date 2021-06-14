import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StudentMenu from '../Student/StudentMenu'
import PreQuestions from '../Student/PreQuestions';
import FinishedTest from '../Student/FinishedTest';

const Stack = createStackNavigator();

const StudentNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName={'StudentMenu'}
    >
      <Stack.Screen name="StudentMenu" component={StudentMenu} />
      <Stack.Screen name="PreQuestions" component={PreQuestions} />
      <Stack.Screen name="FinishedTest" component={FinishedTest} />
    </Stack.Navigator>
  );
};

export default StudentNavigator;
