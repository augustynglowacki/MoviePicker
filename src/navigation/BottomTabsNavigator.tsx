import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Discover from '../screens/Discover';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Liked from '../screens/Liked';
import Account from '../screens/Account';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();
const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {backgroundColor: '#000', elevation: 0},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <MaterialIcon style={styles.icon} name="home" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: () => (
            <MaterialIcon style={styles.icon} name="search" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Liked"
        component={Liked}
        options={{
          tabBarIcon: () => (
            <MaterialIcon
              style={styles.icon}
              name="favorite-outline"
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Account}
        options={{
          tabBarIcon: () => (
            <MaterialIcon style={styles.icon} name="person-outline" size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;

//temporary styles
const styles = StyleSheet.create({
  icon: {
    color: '#fff',
  },
});
