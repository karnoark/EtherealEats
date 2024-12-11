import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import StoreComponent from '@/components/StoreComponent';
import uidata from '@/constants/uidata';

const NearbyRestaurants = () => {
  return (
    <View>
      <FlatList
        horizontal
        data={uidata.restaurants}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5, rowGap: 10 }}
        scrollEnabled
        renderItem={({ item }) => (
          <StoreComponent item={item} onPress={() => {}} />
        )}
      />
    </View>
  );
};

export default NearbyRestaurants;

const styles = StyleSheet.create({});
