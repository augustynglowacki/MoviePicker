import React from 'react';
import Avatar from '../atoms/Avatar';
import {useSelector} from 'react-redux';
import {userThunkSelector} from '../../redux/user/UserSlice';
import Container from '../atoms/Container';
import SettingBox from '../molecules/SettingBox';
import CustomButton from '../atoms/CustomButton';
import {StyleSheet, View} from 'react-native';

const SettingsSection = () => {
  const {user} = useSelector(userThunkSelector);
  return (
    <Container flexStart>
      <Avatar
        uri="https://media-exp1.licdn.com/dms/image/C560BAQEM0HmBESd-ng/company-logo_200_200/0/1551168627756?e=2159024400&v=beta&t=g2YbHUitdxt0u-VFoZnVgo7QR926BqR8aFwPFfG6gus"
        editable
      />
      {/* Fix this error with "string | null" */}
      <SettingBox label="Username" startingValue={user.userName} />
      <SettingBox label="E-mail" startingValue={user.email} />
      <SettingBox label="Password" startingValue="" hidePassword />
      <View style={styles.buttonsBox}>
        <CustomButton
          variant="secondary"
          label="Cancel"
          onPress={() => {}}
          width="small"
        />
        <CustomButton
          variant="primary"
          label="Save"
          onPress={() => {}}
          width="small"
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonsBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default SettingsSection;
