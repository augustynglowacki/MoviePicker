import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {IconTypes, Route} from 'src/constants';
import {UserFormDataTemplate} from 'src/models';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import {
  Container,
  CustomButton,
  HeaderBar,
  Message,
} from 'src/components/common';
import SettingsInput from 'src/components/settings/SettingsInput';
import {StyleSheet, View} from 'react-native';

interface Props {
  onSubmit: () => void;
  headerText: string;
  data: UserFormDataTemplate[];
}

const UserFormTemplate: React.FC<Props> = ({headerText, data, onSubmit}) => {
  const {navigate} = useNavigation();
  const {error, loading} = useSelector(userThunkSelector);
  const {t} = useTranslation('common');
  const redirectToSettings = () => navigate(Route.SETTINGS);

  const leftIcon = {
    type: IconTypes.IONICON,
    name: 'ios-arrow-back',
    onPressFunction: () => redirectToSettings(),
  };

  return (
    <Container flexStart>
      <HeaderBar leftIcon={leftIcon} title={headerText} />
      <View style={styles.box}>
        {data.map(item => (
          <SettingsInput
            label={item.label}
            initialValue={item.initialValue}
            onChange={item.onChange}
            error={item.error}
            secureTextEntry={item.secure}
            key={item.label}
            autoFocus={item.autoFocus}
            editable={item.editable}
          />
        ))}
        <CustomButton
          variant="secondary"
          label={t('save')}
          onPress={onSubmit}
          width="medium"
          loading={loading}
        />
        {!!error && <Message label={error} />}
      </View>
    </Container>
  );
};

export default UserFormTemplate;

const styles = StyleSheet.create({
  box: {
    marginVertical: 50,
    flex: 1,
  },
});
