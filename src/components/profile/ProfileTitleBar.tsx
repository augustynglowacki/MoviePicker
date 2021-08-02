import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import palette from 'src/styles/palette';
import {SETTINGS} from 'src/models/constants/routeNames';
import {logOutUser} from 'src/redux/user/UserAction';

const ProfileTitleBar: React.FC = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation('common');

  const navigateTo = () => {
    navigate(SETTINGS);
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
        <MaterialIcon color={palette.white} name="logout" size={26} />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateTo}>
        <MaterialIcon color={palette.white} name="more-vert" size={26} />
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
