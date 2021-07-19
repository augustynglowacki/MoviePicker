import React, {PropsWithChildren} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/theme/colors';

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  withKeyboard: boolean;
}

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  style,
  withKeyboard,
  children,
}) => {
  const getViews = () => {
    return (
      <SafeAreaView style={[styles.safeArea, style]}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.wrapper}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  return withKeyboard ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.kbView}>
      {getViews()}
    </KeyboardAvoidingView>
  ) : (
    getViews()
  );
};

export default Container;

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  kbView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
});

Container.defaultProps = {
  withKeyboard: false,
};
