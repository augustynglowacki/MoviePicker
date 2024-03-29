import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PopularScreen from 'src/screens/PopularScreen';
import SearchScreen from 'src/screens/SearchScreen';
import {StyleSheet} from 'react-native';
import ProfileScreen from 'src/screens/ProfileScreen';
import {useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import ExploreScreen from 'src/screens/ExploreScreen';
import WatchlistScreen from 'src/screens/WatchlistScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BOTTOM_TABS_HEIGHT, IconTypes, Route} from 'src/constants';
import TabIcon from './TabIcon';

const Tab = createBottomTabNavigator();
const BottomTabsNavigator = () => {
  const {
    user: {email},
  } = useSelector(userThunkSelector);
  const {bottom} = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles(bottom).tab,
        headerShown: false,
      }}>
      <Tab.Screen
        name={Route.HOME}
        component={PopularScreen}
        options={{
          tabBarIcon: ({focused}) =>
            TabIcon(focused, 'ios-home', IconTypes.IONICON),
        }}
      />
      <Tab.Screen
        name={Route.SEARCH}
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) =>
            TabIcon(focused, 'ios-search', IconTypes.IONICON),
        }}
      />
      {email ? (
        <>
          <Tab.Screen
            name={Route.WATCHLIST}
            component={WatchlistScreen}
            options={{
              tabBarIcon: ({focused}) =>
                TabIcon(focused, 'tv', IconTypes.IONICON, 30),
            }}
          />
          <Tab.Screen
            name={Route.PROFILE}
            component={ProfileScreen}
            options={{
              tabBarIcon: ({focused}) =>
                TabIcon(focused, 'ios-person', IconTypes.IONICON),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name={Route.WATCHLIST}
            children={() => <ExploreScreen isLiked={true} />}
            options={{
              tabBarIcon: ({focused}) =>
                TabIcon(focused, 'tv', IconTypes.IONICON, 30),
            }}
          />
          <Tab.Screen
            name={Route.PROFILE}
            component={ExploreScreen}
            options={{
              tabBarIcon: ({focused}) =>
                TabIcon(focused, 'ios-person', IconTypes.IONICON),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;

const styles = (safeAreaBottom: number) =>
  StyleSheet.create({
    tab: {
      backgroundColor: '#000',
      borderTopWidth: 0,
      height: BOTTOM_TABS_HEIGHT + safeAreaBottom,
    },
  });
