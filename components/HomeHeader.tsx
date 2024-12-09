import * as Location from 'expo-location';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS, SIZES } from '@/constants/theme';
import { useLocationContext } from '@/context/UserLocationContext';
import {
  AddressContextType,
  useAddressContext,
} from '@/context/UserReversedGeoCode';
import { LocationService } from '@/services/locationService';
import { promiseWithTimeout, TimeoutError } from '@/utils/promiseWithTimeout';

import AssetImage from './AssetImage';

const Page = () => {
  const { location, setLocation } = useLocationContext();
  const { address, setAddress }: AddressContextType = useAddressContext();
  const [addressError, setAddressError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location !== null) {
      let isMounted = true;
      setIsLoading(true);
      setAddressError(null);

      (async () => {
        try {
          console.log('HomeHeader location:', location);

          const reversedAddress = await LocationService.getAddress(location);

          // Even though setAddress is synchronous, we're still in an async context
          // By the time we reach here, the component might be unmounted
          if (isMounted) {
            setAddress(reversedAddress ?? null);
          }
        } catch (error) {
          if (isMounted) {
            //TODO Handle Error appropriately
            const errorMessage =
              error instanceof Error
                ? error.message
                : 'Failed to get your address please try again';
            setAddressError(errorMessage);
            console.error('Error Getting Address', error);
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
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
          {isLoading ? (
            <Text style={[styles.location, styles.loadingText]}>
              Getting your location...{' '}
            </Text>
          ) : addressError ? (
            <Text style={[styles.location, styles.error]}>{addressError} </Text>
          ) : address?.[0]?.city ? (
            <Text style={styles.location}>{`${address?.[0]?.city}`}</Text>
          ) : (
            <Text style={styles.location}>set your delivery location</Text>
          )}
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

  error: {
    color: COLORS.red, // Add this to your theme
  },
  loadingText: {
    color: COLORS.gray,
    fontStyle: 'italic',
  },
});
