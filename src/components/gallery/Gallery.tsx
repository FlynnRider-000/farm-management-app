import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Image} from 'native-base';
import {
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
const RNFS = require('react-native-fs');
import {copyFile} from 'react-native-fs';
import {spacingBase} from '../../styles';

interface IProps {
  images: Array<String>;
  onRemoveImage: (id: number) => void;
  onAddImage: (names: Array<String>) => void;
  farmId: string;
  lineId: string;
}

export const Gallery: React.FC<IProps> = React.memo(
  ({images, onAddImage, onRemoveImage, farmId, lineId}) => {
    const externPath = RNFS.ExternalDirectoryPath + '/';

    const onPhotoSelected = (e: ImagePickerResponse) => {
      let fileNames = [];
      let assets: Array<Asset> = e.assets!;
      if (assets) {
        for (let i = 0; i < assets.length; i++) {
          const index = assets[i].uri?.lastIndexOf('.');
          const ext = assets[i].uri?.slice(index ? index + 1 : 0);
          const newFileName = `${farmId}-${lineId}-${Date.now()}.${ext}`;
          const extPath = externPath + newFileName;
          copyFile(assets[i].uri!, extPath);

          fileNames.push(newFileName);
        }
        onAddImage(fileNames);
      }
    };

    const onOpenGallery = () => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: 0,
          quality: 0.8,
        },
        onPhotoSelected,
      );
    };

    return (
      <View style={styles.galleryWrap}>
        {images.map((image, index) => (
          <View style={styles.imageWrap} key={`${image}`}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri: 'file://' + externPath + image,
              }}
              alt="Alternate Text"
              size={'xl'}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onRemoveImage(index)}>
              <Text>-</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={[styles.imageWrap, styles.addNew]}>
          <TouchableOpacity style={styles.stretch} onPress={onOpenGallery}>
            <Text>Add New</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  galleryWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrap: {
    padding: spacingBase * 0.3,
    margin: spacingBase * 0.3,
    flexBasis: '32%',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: spacingBase,
    height: 150,
    minHeight: 150,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: spacingBase,
  },
  addNew: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stretch: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    position: 'absolute',
    backgroundColor: '#fff9',
    borderRadius: 100,
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    top: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
});
