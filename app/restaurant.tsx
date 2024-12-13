import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RatingInput } from 'react-native-stock-star-rating';

import RestaurantPage from '@/app/RestaurantPage';
import AssetImage from '@/components/AssetImage';
import { COLORS, SIZES } from '@/constants/theme';
import { Restaurant } from '@/constants/uidata';

const Page = () => {
  const params = useLocalSearchParams();
  const item: Restaurant = params.item
    ? JSON.parse(params.item as string)
    : null;
  console.log('item: ', item);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4 }}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backbtn}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.tertiary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.sharebtn}>
          <MaterialCommunityIcons
            name="share-circle"
            size={30}
            color={COLORS.tertiary}
          />
        </TouchableOpacity>
        <AssetImage
          data={{ uri: item.imageUrl }}
          height={SIZES.height / 3.4}
          width={SIZES.width}
          radius={15}
          mode="cover"
        />
        <View style={styles.rating}>
          <View style={styles.innerRating}>
            <RatingInput rating={item.rating} size={20} />
            <TouchableOpacity
              style={styles.ratingBtn}
              onPress={() => {
                router.push('AddRating');
              }}
            >
              <Text style={styles.btnText}> Rate this store</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 3 }} />
      <View style={{ flex: 6 }}>
        <RestaurantPage />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  backbtn: {
    marginLeft: 12,
    alignItems: 'center',
    zIndex: 999,
    position: 'absolute',
    top: SIZES.xxLarge,
  },
  title: {
    fontSize: 22,
    fontFamily: 'medium',
    color: COLORS.black,
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.lightWhite,
  },
  sharebtn: {
    marginRight: 12,
    alignItems: 'center',
    zIndex: 999,
    right: 0,
    position: 'absolute',
    top: SIZES.xxLarge + 3,
  },
  rating: {
    height: 50,
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    backgroundColor: '#00fff53c',
    zIndex: 999,
    bottom: 0,
    borderRadius: 15,
  },
  innerRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  ratingBtn: {
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
    borderRadius: 12,
    padding: 6,
  },
});
