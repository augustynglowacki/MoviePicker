import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Liked = () => {
  const [moviesId, setMoviesId] = useState<any>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = auth().currentUser?.uid ?? 'none';
      const db = firestore();
      const data = db
        .collection('users')
        .doc(userId)
        .collection('likedMovies')
        .onSnapshot(snap => {
          const newww = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMoviesId(newww);
        });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    const db = firestore();
    const userId = auth().currentUser?.uid ?? 'none';
    db.collection('users')
      .doc(userId)
      .collection('likedMovies')
      .add({id: 22, title: 'test2'});
  };

  return (
    <View style={styles.wrapper}>
      {console.log(moviesId)}
      {moviesId.map((movieId: any) => (
        <Text key={movieId.id}>{movieId.title}</Text>
      ))}
      <Button title="dodaj" onPress={setData} />
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
