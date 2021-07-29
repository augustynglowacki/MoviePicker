import React, {useEffect, useState} from 'react';
import Avatar from '../atoms/Avatar';
import Container from '../atoms/Container';
import SettingBox from '../molecules/SettingBox';
import CustomButton from '../atoms/CustomButton';
import {StyleSheet, View} from 'react-native';
import {PROFILE} from '../../models/constants/routeNames';
import {useNavigation} from '@react-navigation/native';
import {IFormValues} from '../../screens/Settings';
import {FormikErrors} from 'formik';
import Message from '../atoms/Message';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

interface SettingsSectionProps {
  onChange: {
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1,
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onSubmit: () => void;
  errors: FormikErrors<IFormValues>;
  values: any;
  fieldValue: any;
  serverError: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  onChange,
  values,
  onSubmit,
  errors,
  fieldValue,
  serverError,
}) => {
  const [editData, setEditData] = useState(0);
  const [profileURI, setProfileURI] = useState<string>('');
  const {navigate} = useNavigation();

  const fetchAvatar = async () => {
    try {
      const userId = auth().currentUser?.uid;
      const results = await storage()
        .ref(`/users/${userId}/profile.jpg`)
        .getDownloadURL();
      setProfileURI(results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAvatar();
  }, []);

  const validateError = Object.keys(errors);
  console.log('URL: ', profileURI);

  return (
    <Container flexStart>
      {profileURI !== '' ? <Avatar uri={profileURI} editable /> : null}
      {serverError ? <Message label={serverError} /> : null}
      <SettingBox
        label="Username"
        startingValue={values.displayName}
        onChange={onChange('displayName')}
        error={errors.displayName}
      />
      {editData === 1 ? (
        <>
          <SettingBox
            label="E-mail"
            startingValue={values.email}
            onChange={onChange('email')}
            error={errors.email}
          />
          <SettingBox
            label="New e-mail"
            startingValue={values.newEmail}
            onChange={onChange('newEmail')}
            error={errors.newEmail}
          />
          <SettingBox
            label="Password"
            startingValue={''}
            hidePassword
            onChange={onChange('password')}
            error={errors.password}
          />
        </>
      ) : null}
      {editData === 0 ? (
        <>
          <SettingBox
            label="Password"
            startingValue={''}
            hidePassword
            onChange={onChange('password')}
            error={errors.password}
          />
          <SettingBox
            label="New Password"
            startingValue={''}
            hidePassword
            onChange={onChange('newPassword')}
            error={errors.newPassword}
          />
        </>
      ) : null}
      <View style={styles.buttonsBox}>
        <CustomButton
          variant="secondary"
          label="Change email"
          onPress={() => {
            setEditData(1);
            fieldValue('password', '');
            fieldValue('newPassword', '');
          }}
          width="small"
        />
        <CustomButton
          variant="secondary"
          label="Change password"
          onPress={() => {
            setEditData(0);
            fieldValue('password', '');
            fieldValue('newEmail', '');
          }}
          width="small"
        />
      </View>
      <View style={styles.buttonsBox}>
        <CustomButton
          variant="secondary"
          label="Cancel"
          onPress={() => {
            navigate(PROFILE);
          }}
          width="small"
        />
        <CustomButton
          variant="primary"
          label="Save"
          onPress={() => {
            validateError.length > 0 || serverError ? null : onSubmit();
          }}
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
