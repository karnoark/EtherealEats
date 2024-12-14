import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import uidata from '@/constants/uidata';
import { useRestaurantContext } from '@/context/RestaurantContext';

const Menu = () => {
  const { restaurantObj, setRestaurantObj } = useRestaurantContext();
  return (
    <View style={{ marginTop: 5 }}>
      <FlatList
        data={uidata.foods}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 5 }}
        keyExtractor={item => item._id}
        // numColumns={2}
        scrollEnabled
        renderItem={item => (
          <View>
            <Text>as;dfkl</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
