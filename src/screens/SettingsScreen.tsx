import React from 'react';
import {useDispatch} from 'react-redux';
import Settings from 'src/components/settings/Settings';
import {pickImage} from 'src/helpers/pickImage';
import {updateUserPhoto} from 'src/redux/user/UserAction';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();

  const handleImageChange = async () => {
    const newRes = await pickImage();
    if (newRes) {
      dispatch(updateUserPhoto(newRes));
    }
  };
  return <Settings handleImageChange={handleImageChange} />;
};

export default SettingsScreen;
