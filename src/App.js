import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './pages/HomePage';
import DetailView from './pages/DetailView';
const Stack = createStackNavigator();
const MyStack = () => {
   return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Rick & Morty' }} />
        <Stack.Screen name="DetailView" component={DetailView} />
      </Stack.Navigator>
      </NavigationContainer>
   );
};
export default MyStack;
