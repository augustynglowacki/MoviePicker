import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import colors from '../../assets/theme/colors';
import {SETTINGS} from '../../models/constants/routeNames';
import {logOutUser} from '../../redux/user/UserAction';

const ProfileTitleBar = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation(); // key

  const navigateTo = () => {
    navigate(SETTINGS);
  };

  const handleLogOut = () => {
    Alert.alert(t('common:logout'), t('common:logoutWarning'), [
      {
        text: t('common:cancel'),
        onPress: () => {},
      },
      {
        text: t('common:ok'),
        onPress: () => dispatch(logOutUser()),
      },
    ]);
  };

  return (
    <View style={styles.titleBar}>
      <TouchableOpacity onPress={handleLogOut}>
        <MaterialIcon color={colors.white} name="logout" size={26} />
      </TouchableOpacity>
      {/* new component ?  */}
      <TouchableOpacity onPress={navigateTo}>
        <MaterialIcon color={colors.white} name="more-vert" size={26} />
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
