import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

interface RegisterInfoProps {
  onPress: () => void;
}

const RegisterInfo = ({onPress}: RegisterInfoProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.registerBox}>
      <Text style={styles.text}>{t('common:registerSuggestion')}</Text>
      <TouchableOpacity>
        <Text onPress={onPress} style={[styles.text, styles.register]}>
          {t('common:register')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterInfo;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: colors.white,
    justifyContent: 'center',
    margin: 3,
  },
  register: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  registerBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
