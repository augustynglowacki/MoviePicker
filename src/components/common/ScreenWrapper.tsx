import React from 'react';
import {View, StyleSheet} from 'react-native';
import ErrorBox from './ErrorBox';
import Loading from '../../screens/Loading';

interface ErrorWrapperProps {
  error: string;
  loading: boolean;
  children: React.ReactNode;
}

const ScreenWrapper = ({error, loading, children}: ErrorWrapperProps) => {
  // this is the same component like SearchErrorBox
  return (
    <>
      {loading ? (
        <Loading />
      ) : // eslint-disable-next-line no-extra-boolean-cast
      !!error ? (
        <View style={style.errorMsg}>
          <ErrorBox />
        </View>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

const style = StyleSheet.create({
  errorMsg: {
    justifyContent: 'center',
    flex: 1,
  },
});
export default ScreenWrapper;
