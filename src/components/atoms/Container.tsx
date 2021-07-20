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
  //specify withPadding prop when using Container if you want additional padding
  withPadding?: boolean;
  //sticks component to top of the screen
  flexStart?: boolean;
}

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  style,
  children,
  withKeyboard,
  withPadding,
  flexStart,
}) => {
  const getViews = () => {
    return (
      <SafeAreaView style={[styles().safeArea, style]}>
        <ScrollView contentContainerStyle={styles().scrollView}>
          <View style={styles(withPadding, flexStart).wrapper}>{children}</View>
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

const styles = (withPadding?: boolean, flexStart?: boolean) =>
  StyleSheet.create({
    wrapper: {
      padding: withPadding ? 16 : 0,
      flex: 1,
      justifyContent: flexStart ? 'flex-start' : 'center',
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
  withPadding: false,
  flexStart: false,
};
