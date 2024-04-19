import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SistemaSolar from './Screens/SistemaSolar';
import Tierra from './Screens/Tierra';
import Sol from './Screens/Sol';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Sistema Solar') {
              iconName = focused ? 'planet' : 'planet-outline';
            } else if (route.name === 'Tierra') {
              iconName = focused ? 'globe' : 'globe-outline';
            } else if (route.name === 'Sol') {
              iconName = focused ? 'ios-sunny' : 'ios-sunny-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#633204',
          inactiveTintColor: '#f48b28',
        }}
      >
        <Tab.Screen name="Sistema Solar" component={SistemaSolar} />
        <Tab.Screen name="Tierra" component={Tierra} />
        <Tab.Screen name="Sol" component={Sol} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

