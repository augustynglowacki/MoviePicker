import React, {useEffect} from 'react';
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
import {LogBox} from 'react-native';

interface ContainerProps {
  //pass normal stylesheet object to change backgroundColor
  style?: StyleProp<ViewStyle>;
  //specify withKeyboard prop when using Container if you want KeyboardAvoidingView
  withKeyboard?: boolean;
  //specify withPadding prop when using Container if you want additional padding
  withPadding?: boolean;
  //sticks component to top of the screen
  flexStart?: boolean;
  disableScroll?: boolean;
  disableSafeArea?: boolean;
}

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  style,
  children,
  withKeyboard = false,
  withPadding = false,
  flexStart = false,
  disableScroll = false,
  disableSafeArea = false,
}) => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const getJustifyContent = (): StyleProp<ViewStyle> => {
    return {justifyContent: flexStart ? 'flex-start' : 'center'};
  };

  const getPadding = (): StyleProp<ViewStyle> => {
    return {padding: withPadding ? 16 : 0};
  };

  const safeArea = disableSafeArea ? (
    <View style={[styles.wrapper, getPadding(), getJustifyContent()]}>
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
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
});
