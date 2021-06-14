import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StudentMenu from '../Student/StudentMenu'

const Stack = createStackNavigator();

const StudentNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName={'StudentMenu'}
    >
      <Stack.Screen name="StudentMenu" component={StudentMenu} />
    </Stack.Navigator>
  );
};

export default StudentNavigator;
