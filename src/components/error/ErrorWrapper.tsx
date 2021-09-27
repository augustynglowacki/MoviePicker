import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getPopular} from 'src/redux/popular/PopularActions';
import {popularSelector} from 'src/redux/popular/PopularSlice';
import {CustomButton} from '../common';
import Loading from '../common/Loading';
import ErrorBox from './ErrorBox';

interface Props {
  error: string;
  loading?: boolean;
}

const ErrorWrapper: React.FC<Props> = ({
  error,
  loading: propsLoading,
  children,
}) => {
  const dispatch = useDispatch();
  const {page} = useSelector(popularSelector);
  if (propsLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={style.errorMsg}>
        <ErrorBox errorMsg={error} />
        <CustomButton
          label={'Click to refresh'}
          onPress={() => dispatch(getPopular(page))}
        />
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
