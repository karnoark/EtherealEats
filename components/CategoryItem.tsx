import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORS, SHADOWS } from '@/constants/theme';
import { Category } from '@/constants/uidata';

const CategoryItem = ({
  selected,
  category,
}: {
  selected: string | null;
  category: Category;
}) => {
  return (
    <View
      style={{
        marginLeft: 12,
        padding: 5,
        alignItems: 'center',
        width: 60,
        height: 75,
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor:
          category.value === selected ? COLORS.secondary : 'transparent',
        shadowColor: SHADOWS.small.shadowColor,
      }}
    >
      <Image
        source={{ uri: category.imageUrl }}
        style={{ width: 30, height: 30 }}
      />
      <Text style={{ fontSize: 13, fontFamily: 'regular' }}>
        {category.title}
      </Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({});
