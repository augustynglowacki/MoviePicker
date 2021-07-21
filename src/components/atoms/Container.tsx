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
  withKeyboard = false,
  withPadding = false,
  flexStart = false,
}) => {
  const getJustifyContent = (): StyleProp<ViewStyle> => {
    return {justifyContent: flexStart ? 'flex-start' : 'center'};
  };

  const getPadding = (): StyleProp<ViewStyle> => {
    return {padding: withPadding ? 16 : 0};
  };

  const content = (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <SafeAreaView style={[styles.safeArea, style]}>
        <View style={[styles.wrapper, getPadding(), getJustifyContent()]}>
          {children}
        </View>
      </SafeAreaView>
    </ScrollView>
  );

  return withKeyboard ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.kbView}>
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );
};

export default Container;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
