import * as Location from 'expo-location';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS, SIZES } from '@/constants/theme';
import { AddressContext } from '@/context/UserReversedGeoCode';
import useLocationContext from '@/hooks/useLocationContext';
import useReversedGeoCodeContext from '@/hooks/useReversedGeoCodeContext';

import AssetImage from './AssetImage';

const reversedGeoCode = async (latitude: number, longitude: number) => {
  const reversedGeoCodeAddress = Location.reverseGeocodeAsync({
    longitude,
    latitude,
  });
  return reversedGeoCodeAddress;
};

const Page = () => {
  const { location, setLocation } = useLocationContext();
  const { address, setAddress }: AddressContext = useReversedGeoCodeContext();

  useEffect(() => {
    if (location !== null) {
      let isMounted = true;
      (async () => {
        try {
          console.log('HomeHeader location:', location);
          // This might take 2 seconds
          const reversedAddress = await reversedGeoCode(
            location.coords.latitude,
            location.coords.longitude,
          );
          // Even though setAddress is synchronous, we're still in an async context
          // By the time we reach here, the component might be unmounted
          if (isMounted) {
            setAddress(reversedAddress);
          }
        } catch (error) {
          if (isMounted) {
            //TODO Handle Error appropriately
            console.log('Error Getting Address', error);
          }
        }
      })();

      return () => {
        isMounted = false;
      };
    }
    // Disabling following rule because I Removed setAddress from dependencies since setState functions are stable and don't need to be included
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={styles.outerStyle}>
        <AssetImage
          data={require('@/assets/images/george.jpg')}
          mode={'cover'}
          width={30}
          height={30}
          radius={99}
        />

        <View style={styles.headerText}>
          <Text style={styles.heading}>Delivering to</Text>
          <Text style={styles.location}>{`${address?.[0]?.city}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    marginLeft: 15,
    justifyContent: 'center',
  },

  heading: {
    fontFamily: 'medium',
    fontSize: SIZES.medium,
    color: COLORS.black,
  },

  location: {
    fontFamily: 'regular',
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
});
