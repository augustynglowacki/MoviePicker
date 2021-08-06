import React from 'react';
import {IconTypes} from 'src/constants';
import {UserFormDataTemplate} from 'src/models';
import palette from 'src/styles/palette';
import {
  Container,
  CustomButton,
  HeaderBar,
  Message,
  SectionHeader,
} from '../common';
import SettingInput from './SettingInput';

interface Props {
  goBack: () => void;
  onSubmit: () => void;
  headerText: string;
  formData: UserFormDataTemplate[];
  serverError: string;
  loading: boolean;
}

const UserFormTemplate: React.FC<Props> = ({
  goBack,
  headerText,
  formData,
  onSubmit,
  loading,
  serverError,
}) => {
  const leftIcon = {
    name: 'arrow-back-ios',
    type: IconTypes.MATERIAL,
    onPressFunction: goBack,
  };
  return (
    <Container flexStart>
      <HeaderBar leftIcon={leftIcon} />
      <SectionHeader text={headerText} color={palette.white} center />
      {formData.map(formElement => (
        <SettingInput
          label={formElement.label}
          initialValue={formElement.initialValue}
          onChange={formElement.onChange}
          error={formElement.error}
          secureTextEntry={formElement.secure}
          key={formElement.label}
        />
      ))}
      <CustomButton
        variant="primary"
        label="Save"
        onPress={onSubmit}
        width="medium"
        loading={loading}
      />
      {!!serverError && <Message label={serverError} />}
    </Container>
  );
};

export default UserFormTemplate;
