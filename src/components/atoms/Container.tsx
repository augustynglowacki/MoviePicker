import React from 'react';
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
  //pass normal stylesheet object to change backgroundColor
  style?: StyleProp<ViewStyle>;
  //specify withKeyboard prop when using Container if you want KeyboardAvoidingView
  withKeyboard?: boolean;
  withPadding?: boolean;
}

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  style,
  withKeyboard,
  children,
  withPadding,
}) => {
  const getViews = () => {
    return (
      <SafeAreaView style={[styles().safeArea, style]}>
        <ScrollView contentContainerStyle={styles().scrollView}>
          <View style={styles(withPadding).wrapper}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  return withKeyboard ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles().kbView}>
      {getViews()}
    </KeyboardAvoidingView>
  ) : (
    getViews()
  );
};

export default Container;

const styles = (withPadding?: boolean) =>
  StyleSheet.create({
    wrapper: {
      padding: withPadding ? 16 : 0,
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
