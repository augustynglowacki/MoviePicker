import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setErrorNull} from 'src/redux/user/UserSlice';
import palette from 'src/styles/palette';

interface Props {
  label: string;
}

const Message: React.FC<Props> = ({label}) => {
  const dispatch = useDispatch();
  const onDismissSnackBar = () => dispatch(setErrorNull());

  return (
    <View style={styles.container}>
      <Snackbar
        theme={{
          colors: {
            onSurface: palette.danger,
          },
        }}
        duration={4000}
        visible={true}
        onDismiss={onDismissSnackBar}
        style={styles.wrapper}
        action={{
          label: 'x',
          onPress: onDismissSnackBar,
          color: palette.white,
        }}>
        {label}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wrapper: {
    borderRadius: 4,
  },
});

export default Message;
