import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Discover from '../screens/Discover';
import Liked from '../screens/Liked';
import TabIcon from '../components/atoms/TabIcon';
import {DISCOVER, HOME, LIKED, PROFILE} from '../models/constants/routeNames';
import {StyleSheet} from 'react-native';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: styles.tab,
      }}>
      <Tab.Screen
        name={HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => TabIcon(focused, 'home'),
        }}
      />
      <Tab.Screen
        name={DISCOVER}
        component={Discover}
        options={{
          tabBarIcon: ({focused}) => TabIcon(focused, 'search'),
        }}
      />
      <Tab.Screen
        name={LIKED}
        component={Liked}
        options={{
          tabBarIcon: ({focused}) => TabIcon(focused, 'favorite-outline'),
        }}
      />
      <Tab.Screen
        name={PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => TabIcon(focused, 'person-outline'),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;

const styles = StyleSheet.create({
  tab: {backgroundColor: '#000', borderTopWidth: 0},
});
