import React from 'react';
import {View, StyleSheet} from 'react-native';
import Loading from 'src/screens/Loading';
import ErrorBox from './ErrorBox';

interface Props {
  error: string;
  loading: boolean;
}
const ScreenWrapper: React.FC<Props> = ({error, loading, children}) => {
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <View style={style.errorMsg}>
        <ErrorBox />
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
export default ScreenWrapper;
