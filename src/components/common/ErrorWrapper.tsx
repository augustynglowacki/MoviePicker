import React from 'react';
import {View, StyleSheet} from 'react-native';
import ErrorBox from './ErrorBox';
import Loading from '../../screens/Loading';

interface Props {
  error: string;
  loading: boolean;
  children: React.ReactNode;
}

const ErrorWrapper: React.FC<Props> = ({error, loading, children}) => {
  return (
    <>
      {loading ? (
        <Loading />
      ) : // eslint-disable-next-line no-extra-boolean-cast
      !!error ? (
        <View style={style.errorMsg}>
          <ErrorBox errorMsg={error} />
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
export default ErrorWrapper;
