import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Popular from 'src/screens/Popular';
import Discover from 'src/screens/Discover';
import {StyleSheet} from 'react-native';
import Profile from 'src/screens/Profile';
import {useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import Explore from 'src/screens/Explore';
import {TabIcon} from 'src/components/common';
import Favorite from 'src/screens/Favorite';
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
        component={Popular}
        options={{
          tabBarIcon: ({focused}) => TabIcon(focused, 'home'),
        }}
      />
      <Tab.Screen
        name={Route.DISCOVER}
        component={Discover}
        options={{
          tabBarIcon: ({focused}) => TabIcon(focused, 'search'),
        }}
      />
      {email ? (
        <>
          <Tab.Screen
            name={Route.FAVORITE}
            component={Favorite}
            options={{
              tabBarIcon: ({focused}) => TabIcon(focused, 'favorite-outline'),
            }}
          />
          <Tab.Screen
            name={Route.PROFILE}
            component={Profile}
            options={{
              tabBarIcon: ({focused}) => TabIcon(focused, 'person-outline'),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name={Route.FAVORITE}
            children={() => <Explore isLiked={true} />}
            options={{
              tabBarIcon: ({focused}) => TabIcon(focused, 'favorite-outline'),
            }}
          />
          <Tab.Screen
            name={Route.PROFILE}
            component={Explore}
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
