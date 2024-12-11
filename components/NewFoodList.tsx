import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import FoodComponent from '@/components/FoodComponent';
import uidata from '@/constants/uidata';

const NewFoodList = () => {
  return (
    <View style={{ marginLeft: 12, marginBottom: 10 }}>
      <FlatList
        horizontal
        data={uidata.foods}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5, rowGap: 10 }}
        scrollEnabled
        renderItem={({ item }) => (
          <FoodComponent item={item} onPress={() => {}} />
        )}
      />
    </View>
  );
};

export default NewFoodList;

const styles = StyleSheet.create({});
