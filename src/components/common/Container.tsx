import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  FlexStyle,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
interface Props {
  //pass normal stylesheet object to change backgroundColor
  style?: StyleProp<ViewStyle>;
  //specify withKeyboard prop when using Container if you want KeyboardAvoidingView
  withKeyboard?: boolean;
  //padding 'small' - 6, 'large'-16, undefined - 0
  padding?: 'small' | 'large';
  //sticks component to top of the screen
  flexStart?: boolean;
  disableScroll?: boolean;
  disableSafeArea?: boolean;
}

const Container: React.FC<Props> = ({
  style,
  children,
  withKeyboard,
  padding,
  flexStart,
  disableScroll,
  disableSafeArea,
}) => {
  const getJustifyContent = (): StyleProp<FlexStyle> => {
    return {justifyContent: flexStart ? 'flex-start' : 'center'};
  };

  const getPadding = (): StyleProp<FlexStyle> => {
    switch (padding) {
      case 'small': {
        return {padding: 6};
      }
      case 'large': {
        return {padding: 16};
      }
      default:
        return {padding: 0};
    }
  };

  const safeArea = disableSafeArea ? (
    <View
      testID="styled"
      style={[styles.wrapper, style, getPadding(), getJustifyContent()]}>
      {children}
    </View>
  ) : (
    <SafeAreaView style={[styles.safeArea, style]} testID="styledSafeArea">
      <View
        testID="padded"
        style={[styles.wrapper, getPadding(), getJustifyContent()]}>
        {children}
      </View>
    </SafeAreaView>
  );

  const scrollWrapper = disableScroll ? (
    safeArea
  ) : (
    <ScrollView
      testID="scroll"
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}>
      {safeArea}
    </ScrollView>
  );

  return withKeyboard ? (
    <KeyboardAvoidingView
      testID="keyboard"
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
