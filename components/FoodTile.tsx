import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RatingInput } from 'react-native-stock-star-rating';

import AssetImage from '@/components/AssetImage';
import { COLORS, SHADOWS } from '@/constants/theme';
import { Food } from '@/constants/uidata';

interface FoodTileProps {
  item: Food;
  onPress?: void;
  showDetails?: () => void;
}

const FoodTile: React.FC<FoodTileProps> = ({ item, showDetails }) => {
  if (!item) {
    return (
      <View style={styles.wrapper}>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.wrapper} onPress={showDetails}>
      <View style={{ backgroundColor: COLORS.lightWhite, borderRadius: 12 }}>
        <View style={{ flexDirection: 'row' }}>
          <AssetImage
            data={{ uri: item.imageUrl[0] }}
            height={75}
            width={75}
            radius={15}
            mode={'cover'}
          />

          <View
            style={{
              position: 'absolute',
              right: 5,
              backgroundColor: COLORS.primary,
              borderRadius: 12,
              top: 5,
            }}
          >
            <Text
              style={[
                styles.title,
                { color: COLORS.lightWhite, marginHorizontal: 5 },
              ]}
            >
              ₹ {item.price}
            </Text>
          </View>

          <View style={{ marginLeft: 10, marginTop: 5 }}>
            <Text style={styles.title}>{item.title}</Text>
            <RatingInput
              rating={item.rating}
              size={20}
              color={COLORS.primary}
            />
            <FlatList
              data={item.foodTags.slice(0, 4)}
              showsVerticalScrollIndicator={false}
              keyExtractor={item1 => item1}
              style={{ marginTop: 5, marginBottom: 5 }}
              horizontal
              scrollEnabled
              renderItem={({ item }) => (
                <View style={styles.tags}>
                  <Text
                    style={{ paddingHorizontal: 4, color: COLORS.lightWhite }}
                  >
                    {item}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodTile;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.offwhite,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    marginRight: 10,
    paddingRight: 7,
  },
  title: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.gray,
  },
  tags: {
    right: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
});
