import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import palette from 'src/styles/palette';
import {logOutUser} from 'src/redux/user/UserAction';
import {Route} from 'src/constants';
import {Icon} from '../common';
import {IconTypes} from '../common/Icons';

const ProfileTitleBar: React.FC = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation('common');

  const navigateTo = () => {
    navigate(Route.SETTINGS);
  };

  const handleLogOut = () => {
    Alert.alert(t('logout'), t('logoutWarning'), [
      {
        text: t('cancel'),
        onPress: () => {},
      },
      {
        text: t('ok'),
        onPress: () => dispatch(logOutUser()),
      },
    ]);
  };

  return (
    <View style={styles.titleBar}>
      <TouchableOpacity onPress={handleLogOut}>
        <Icon
          type={IconTypes.MATERIAL}
          color={palette.white}
          name="logout"
          size={26}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateTo}>
        <Icon
          type={IconTypes.MATERIAL}
          color={palette.white}
          name="more-vert"
          size={26}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 16,
    color: 'white',
  },
});
export default ProfileTitleBar;
