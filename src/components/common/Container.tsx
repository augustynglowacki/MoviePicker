import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  FlexStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
interface Props {
  //pass normal stylesheet object to change backgroundColor
  style?: StyleProp<FlexStyle>;
  //specify withKeyboard prop when using Container if you want KeyboardAvoidingView
  withKeyboard?: boolean;
  //specify withPadding prop when using Container if you want additional padding
  withPadding?: boolean;
  //sticks component to top of the screen
  flexStart?: boolean;
  disableScroll?: boolean;
  disableSafeArea?: boolean;
}

const Container: React.FC<Props> = ({
  style,
  children,
  withKeyboard,
  withPadding,
  flexStart,
  disableScroll,
  disableSafeArea,
}) => {
  const getJustifyContent = (): StyleProp<FlexStyle> => {
    return {justifyContent: flexStart ? 'flex-start' : 'center'};
  };

  const getPadding = (): StyleProp<FlexStyle> => {
    return {padding: withPadding ? 16 : 0};
  };

  const safeArea = disableSafeArea ? (
    <View style={[styles.wrapper, style, getPadding(), getJustifyContent()]}>
      {children}
    </View>
  ) : (
    <SafeAreaView style={[styles.safeArea, style]}>
      <View style={[styles.wrapper, getPadding(), getJustifyContent()]}>
        {children}
      </View>
    </SafeAreaView>
  );

  const scrollWrapper = disableScroll ? (
    safeArea
  ) : (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}>
      {safeArea}
    </ScrollView>
  );

  return withKeyboard ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.kbView}>
      {scrollWrapper}
    </KeyboardAvoidingView>
  ) : (
    scrollWrapper
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
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
