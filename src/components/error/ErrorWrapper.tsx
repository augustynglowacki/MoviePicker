import React from 'react';
import {View, StyleSheet} from 'react-native';
import Loading from '../common/Loading';
import ErrorBox from './ErrorBox';

interface Props {
  error: string;
  loading: boolean;
}

const ErrorWrapper: React.FC<Props> = ({error, loading, children}) => {
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <View style={style.errorMsg}>
        <ErrorBox errorMsg={error} />
      </View>
    );
  }
  return <>{children}</>;
};

const style = StyleSheet.create({
  errorMsg: {
    justifyContent: 'center',
    flex: 1,
  },
});
export default ErrorWrapper;
