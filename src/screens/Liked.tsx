import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Text} from 'react-native';

const Liked = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const db = firestore();
    const data = await db.collection('liked').get();
    setState(data.docs.map(doc => doc.data()));
  };

  return (
    <View style={styles.wrapper}>
      {state.map(stat => (
        <Text>{stat.id}</Text>
      ))}
    </View>
  );
};

export default Liked;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
  },
});
