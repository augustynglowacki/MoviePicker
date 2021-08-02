import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Popular from 'src/screens/Popular';
import Discover from 'src/screens/Discover';
import {StyleSheet} from 'react-native';
import Profile from 'src/screens/Profile';
import {useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import NotLoggedIn from 'src/screens/NotLoggedIn';
import {BOTTOM_TABS_HEIGHT} from 'src/components/popular/MovieItem';
import {TabIcon} from 'src/components/common';
import Favorite from 'src/screens/Favorite';
import {Route} from 'src/models/constants/routeNames';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  const {
    user: {email},
  } = useSelector(userThunkSelector);
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: styles.tab,
      }}>
      <Tab.Screen
        name={Route.LOGIN}
        component={Popular}
        options={{
          tabBarIcon: ({focused}) => TabIcon(focused, 'home'), // TODO fix ts
        }}
      />
      <Tab.Screen
        name={Route.DISCOVER}
        component={Discover}
        options={{
          tabBarIcon: ({focused}) => TabIcon(focused, 'search'),
        }}
      />

      {email !== '' ? ( // u can do it cleaner
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
            children={() => <NotLoggedIn isLiked={true} />}
            options={{
              tabBarIcon: ({focused}) => TabIcon(focused, 'favorite-outline'),
            }}
          />
          <Tab.Screen
            name={Route.PROFILE}
            component={NotLoggedIn}
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

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#000',
    borderTopWidth: 0,
    height: BOTTOM_TABS_HEIGHT,
  },
});
