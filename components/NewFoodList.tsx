import { router } from 'expo-router';
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
          <FoodComponent
            item={item}
            onPress={() => {
              console.log('onPress clicked');
              router.push({
                pathname: '/Food/food',
                params: {
                  foodData: JSON.stringify(item),
                },
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default NewFoodList;

const styles = StyleSheet.create({});
