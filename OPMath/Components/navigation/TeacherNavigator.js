import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TeacherMenu from '../Teacher/TeacherMenu'
import studentProfile from '../Teacher/NewStudent/studentProfile'
import parentProfile from '../Teacher/NewStudent/parentProfile';
import studentLookup from '../Teacher/StudentLookup/studentLookup';
import editInfoStudent from '../Teacher/StudentLookup/OverView/editInfoStudent';
import allQuestions from '../Teacher/Questions/allQuestions';

const Stack = createStackNavigator();

const TeacherNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName={'TeacherMenu'}
    >
      <Stack.Screen name="TeacherMenu" component={TeacherMenu} />
      <Stack.Screen name="studentProfile" component={studentProfile} />
      <Stack.Screen name="parentProfile" component={parentProfile} />
      <Stack.Screen name="studentLookup" component={studentLookup} />
      <Stack.Screen name="editInfoStudent" component={editInfoStudent} />
      <Stack.Screen name="allQuestions" component={allQuestions} />
    </Stack.Navigator>
  );
};

export default TeacherNavigator;
