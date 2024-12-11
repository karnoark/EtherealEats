import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ResizeMode = 'cover' | 'contain' | 'stretch' | 'center' | 'repeat';

interface NetworkImageProps {
  data: ImageSourcePropType;
  width: number;
  height: number;
  radius: number;
  mode: ResizeMode;
}

const NetworkImage = ({
  data,
  width,
  height,
  radius,
  mode,
}: NetworkImageProps) => {
  return (
    <View>
      <Image
        source={{ uri: data }}
        style={getImageStyles(width, height, radius, mode)}
        resizeMode={mode}
      />
    </View>
  );
};

export default NetworkImage;

const getImageStyles = (
  width: number,
  height: number,
  radius: number,
  mode: ResizeMode,
) => ({
  width,
  height,
  borderRadius: radius,
  resizeMode: mode,
});
