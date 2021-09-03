import firestore from '@react-native-firebase/firestore';

export const fetchCover = async (userId: string) => {
  const db = firestore();
  const res = await db.collection('users').doc(userId).get();
  if (res.data()) {
    const cover: string = res.data()?.coverURL || '';
    return cover;
  }
};
