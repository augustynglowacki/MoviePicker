import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import colors from '../../assets/theme/colors';
import {setErrorNull} from '../../redux/user/UserSlice';

interface MessageProps {
  label: string;
}

const Message = ({label}: MessageProps) => {
  const dispatch = useDispatch();
  const onDismissSnackBar = () => dispatch(setErrorNull());

  return (
    <View style={styles.container}>
      <Snackbar
        theme={{
          colors: {
            onSurface: colors.danger,
          },
        }}
        duration={4000}
        visible={true}
        onDismiss={onDismissSnackBar}
        style={styles.wrapper}
        action={{
          label: 'x',
          onPress: onDismissSnackBar,
          color: colors.white,
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
