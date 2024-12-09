import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ResizeMode = 'cover' | 'contain' | 'stretch' | 'center' | 'repeat';

interface AssetImageProps {
  data: ImageSourcePropType;
  width: number;
  height: number;
  radius: number;
  mode: ResizeMode;
}

const Page = ({ data, width, height, radius, mode }: AssetImageProps) => {
  return (
    <View>
      <Image
        source={data}
        style={getImageStyles(width, height, radius, mode)}
      />
    </View>
  );
};

export default Page;

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
