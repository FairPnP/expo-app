import React, {useState, useCallback} from 'react';
import {StyleSheet, Image, TouchableOpacity, View, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type ImageUploadProps = {
  onImageSelected: (uri: string) => void;
};

export const ImageUpload = ({onImageSelected}: ImageUploadProps) => {
  const [imgUri, setImgUri] = useState(null);

  const onButtonPress = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      selectionLimit: 1,
      quality: 0.8,
      allowsMultipleSelection: false,
      base64: false,
    });

    if (!result.canceled) {
      setImgUri(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
    
  }, [onImageSelected]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={onButtonPress}>
        {imgUri ? (
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{uri: imgUri}}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Upload Image</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'grey',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  overlayText: {
    color: 'white',
    textAlign: 'center',
  },
});
