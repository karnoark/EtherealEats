import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AssetImage from '@/components/AssetImage';
import { COLORS, SIZES } from '@/constants/theme';
import { Food } from '@/constants/uidata';

interface FoodComponentProps {
  item: Food;
  onPress: () => void;
}

const FoodComponent = ({ item, onPress }: FoodComponentProps) => {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <AssetImage
        data={{ uri: item.imageUrl[0] }}
        width={SIZES.width - 60}
        height={SIZES.height / 5.8}
        radius={16}
        mode={'cover'}
      />
      <Text style={styles.heading}>{item.title}</Text>
      <Text style={styles.small}>{item.time} - delivery time</Text>
    </TouchableOpacity>
  );
};

export default FoodComponent;

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 15,
    borderColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 16,
  },
  heading: {
    fontSize: 14,
    fontFamily: 'regular',
    color: COLORS.gray,
  },
  small: {
    fontSize: 12,
    fontFamily: 'regular',
    color: COLORS.gray,
  },
});
