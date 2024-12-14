import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import FoodTile from '@/components/FoodTile';
import uidata from '@/constants/uidata';
import { useRestaurantContext } from '@/context/RestaurantContext';

const Menu = () => {
  const { restaurantObj, setRestaurantObj } = useRestaurantContext();
  console.log('restaurantObj: ', restaurantObj);
  return (
    <View style={{ marginTop: 5 }}>
      <FlatList
        data={uidata.foods}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 5 }}
        keyExtractor={item => item._id}
        scrollEnabled
        renderItem={({ item }) => (
          <View>
            <FoodTile
              item={item}
              showDetails={() => {
                router.push({
                  pathname: '/Food/food',
                  params: {
                    foodData: JSON.stringify(item),
                  },
                });
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
