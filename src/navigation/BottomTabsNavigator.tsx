import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PopularScreen from 'src/screens/PopularScreen';
import DiscoverScreen from 'src/screens/DiscoverScreen';
import {StyleSheet} from 'react-native';
import ProfileScreen from 'src/screens/ProfileScreen';
import {useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import ExploreScreen from 'src/screens/ExploreScreen';
import {TabIcon} from 'src/components/common';
import FavoriteScreen from 'src/screens/FavoriteScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BOTTOM_TABS_HEIGHT, Route} from 'src/constants';

const Tab = createBottomTabNavigator();
const BottomTabsNavigator = () => {
  const {
    user: {email},
  } = useSelector(userThunkSelector);
  const {bottom} = useSafeAreaInsets();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: styles(bottom).tab,
      }}>
      <Tab.Screen
        name={Route.LOGIN}
        component={PopularScreen}
        options={{
          tabBarIcon: ({focused}) => TabIcon(focused, 'home'),
        }}
      />
      <Tab.Screen
        name={Route.DISCOVER}
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({focused}) => TabIcon(focused, 'search'),
        }}
      />
      {email ? (
        <>
          <Tab.Screen
            name={Route.FAVORITE}
            component={FavoriteScreen}
            options={{
              tabBarIcon: ({focused}) => TabIcon(focused, 'favorite-outline'),
            }}
          />
          <Tab.Screen
            name={Route.PROFILE}
            component={ProfileScreen}
            options={{
              tabBarIcon: ({focused}) => TabIcon(focused, 'person-outline'),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name={Route.FAVORITE}
            children={() => <ExploreScreen isLiked={true} />}
            options={{
              tabBarIcon: ({focused}) => TabIcon(focused, 'favorite-outline'),
            }}
          />
          <Tab.Screen
            name={Route.PROFILE}
            component={ExploreScreen}
            options={{
              tabBarIcon: ({focused}) => TabIcon(focused, 'person-outline'),
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
