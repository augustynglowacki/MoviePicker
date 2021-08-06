import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FormikErrors} from 'formik';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {Container, CustomButton, Message} from 'src/components/common';
import SettingInput from './SettingInput';
import Avatar from './Avatar';
import ChangeBackground from './ChangeBackground';
import {UpdateUserFormValues} from 'src/screens/SettingsScreen';
import {Route} from 'src/constants';

interface Props {
  onChange: {
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1,
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onSubmit: () => void;
  errors: FormikErrors<UpdateUserFormValues>;
  values: UpdateUserFormValues;
  fieldValue: (
    field: string,
    value: string | boolean,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<UpdateUserFormValues>>;
  serverError: string;
  loading: boolean;
}

const SettingsComponent: React.FC<Props> = ({
  onChange,
  values,
  onSubmit,
  errors,
  fieldValue,
  serverError,
  loading,
}) => {
  const [profileURI, setProfileURI] = useState<string>(
    'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultProfile.jpeg?alt=media&token=bc972054-6f70-4339-a72d-4a6c89be93a2',
  );
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

  return (
    <Container flexStart>
      <Avatar uri={profileURI} editable />
      <ChangeBackground />
      {!!serverError && <Message label={serverError} />}
      <SettingInput
        label="Username"
        initialValue={values.displayName}
        onChange={onChange('displayName')}
        error={errors.displayName}
      />
      {values.displayEmail ? (
        <>
          <SettingInput
            label="E-mail"
            initialValue={values.email}
            onChange={onChange('email')}
            error={errors.email}
          />
          <SettingInput
            label="New e-mail"
            initialValue={values.newEmail}
            onChange={onChange('newEmail')}
            error={errors.newEmail}
          />
          <SettingInput
            label="Password"
            initialValue={values.password}
            secureTextEntry
            onChange={onChange('password')}
            error={errors.password}
          />
        </>
      ) : (
        <>
          <SettingInput
            label="E-mail"
            initialValue={values.email}
            onChange={onChange('email')}
            error={errors.email}
          />
          <SettingInput
            label="Password"
            initialValue={values.password}
            secureTextEntry
            onChange={onChange('password')}
            error={errors.password}
          />
          <SettingInput
            label="New Password"
            initialValue={values.newPassword}
            secureTextEntry
            onChange={onChange('newPassword')}
            error={errors.newPassword}
          />
        </>
      )}
      <View style={styles.buttonsBox}>
        <CustomButton
          variant="secondary"
          label="Change email"
          onPress={() => {
            fieldValue('password', '');
            fieldValue('newPassword', '');
            fieldValue('displayEmail', true);
          }}
          width="small"
        />
        <CustomButton
          variant="secondary"
          label="Change password"
          onPress={() => {
            fieldValue('password', '');
            fieldValue('newEmail', '');
            fieldValue('displayEmail', false);
          }}
          width="small"
        />
      </View>
      <View style={styles.buttonsBox}>
        <CustomButton
          variant="secondary"
          label="Cancel"
          onPress={() => {
            navigate(Route.PROFILE);
          }}
          width="small"
        />
        <CustomButton
          variant="primary"
          label="Save"
          onPress={onSubmit}
          width="small"
          loading={loading}
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

export default SettingsComponent;
