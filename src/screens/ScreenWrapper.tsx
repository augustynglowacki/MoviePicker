import React from 'react';
import {View, StyleSheet} from 'react-native';
import ErrorBox from '../components/atoms/ErrorBox';
import Loading from './Loading';

interface ErrorWrapperProps {
  error: string;
  loading: boolean;
  children: React.ReactNode;
}

const ScreenWrapper = ({error, loading, children}: ErrorWrapperProps) => {
  return (
    <>
      {loading ? (
        <Loading />
      ) : !!error ? (
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
