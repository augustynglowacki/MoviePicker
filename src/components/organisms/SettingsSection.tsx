import React, {useState} from 'react';
import Avatar from '../atoms/Avatar';
import Container from '../atoms/Container';
import SettingBox from '../molecules/SettingBox';
import CustomButton from '../atoms/CustomButton';
import {StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {PROFILE} from '../../models/constants/routeNames';
import {useNavigation} from '@react-navigation/native';
import {IFormValues} from '../../screens/Settings';
import {FormikErrors} from 'formik';
import Message from '../atoms/Message';

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
  const {navigate} = useNavigation();

  return (
    <Container flexStart>
      <Avatar
        uri={
          auth().currentUser?.photoURL ||
          'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
        }
        editable
        setPhoto={() => {}}
      />
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
            label="E-mail"
            startingValue={values.email}
            onChange={onChange('email')}
            error={errors.email}
          />
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
          onPress={onSubmit}
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
