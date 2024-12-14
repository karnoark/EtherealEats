import React from 'react';
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import GoogleMapView from '@/components/GoogleMapView';
import { COLORS, SIZES } from '@/constants/theme';
import { useRestaurantContext } from '@/context/RestaurantContext';

const Directions = () => {
  const { restaurantObj, setRestaurantObj } = useRestaurantContext();
  console.log(restaurantObj);
  const coords = restaurantObj?.coords;

  const onDirectionClick = () => {
    const coordinate = `${coords?.latitude},${coords?.longitude}`;
    const url = Platform.select({
      ios: 'maps:' + coords?.latitude + ',' + coords?.longitude,
      android: `google.navigation:q=${coordinate}&zoom=15`,
    });
    // First check if Google Maps is installed
    Linking.canOpenURL(url || '')
      .then(supported => {
        if (supported) {
          // If Google Maps is installed, open it
          Linking.openURL(url || '');
        } else {
          // If Google Maps isn't installed, open in web browser
          // This serves as a fallback and ensures users can still see the location
          Alert.alert(
            'Notice',
            'Opening location in web browser since Google Maps is not installed',
          );
          const browserUrl = `https://www.google.com/maps/search/?api=1&query=${coordinate}`;
          Linking.openURL(browserUrl);
        }
      })
      .catch(err => {
        console.error('An error occurred', err);
        Alert.alert('Error', 'Could not open maps. Please try again.');
      });
  };

  return (
    <View>
      {coords && <GoogleMapView placeList={coords} />}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,
        }}
      >
        <Text style={[styles.small, { width: SIZES.width / 1.6 }]}>
          {coords?.address}
        </Text>

        <TouchableOpacity
          style={styles.ratingBtn}
          onPress={() => {
            onDirectionClick();
          }}
        >
          <Text>Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Directions;

const styles = StyleSheet.create({
  small: {
    fontSize: 13,
    fontFamily: 'medium',
    color: COLORS.gray,
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.lightWhite,
  },
  ratingBtn: {
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
    borderRadius: 12,
    padding: 6,
  },
});
