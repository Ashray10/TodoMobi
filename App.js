import React from "react";
import { View } from "react-native";
import AddTodo from "./android/components/AddTodo";
import SignupPage from "./android/components/SignupPage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoPage from "./android/components/TodoPage";
import LoginPage from "./android/components/LoginPage";

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName= "LoginPage">
      <Stack.Screen 
      name="LoginPage" component={LoginPage} 
      />
      <Stack.Screen
        name="AddTodo" component={AddTodo}
      />
      <Stack.Screen 
      name="TodoPage" component={TodoPage} 
      />
      <Stack.Screen 
      name="SignUp" component={SignupPage} 
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
};



