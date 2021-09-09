import ImagePicker from 'react-native-image-crop-picker';

export const pickImage = async (camera: boolean) => {
  try {
    if (camera) {
      const res = await ImagePicker.openCamera({
        useFrontCamera: true,
        cropperCircleOverlay: true,
        multiple: false,
        width: 300,
        height: 300,
        cropping: true,
      });
      return res.path;
    }
    if (!camera) {
      const res = await ImagePicker.openPicker({
        cropperCircleOverlay: true,
        multiple: false,
        width: 300,
        height: 300,
        cropping: true,
      });
      return res.path;
    }
  } catch (error) {
    console.log(error);
  }
};
