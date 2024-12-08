import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

import 'react-native-reanimated';
import Fonts from '@/constants/fonts';
import { UserLocationContext } from '@/context/UserLocationContext';
import { UserReversedGeoCode } from '@/context/UserReversedGeoCode';
import { Address } from '@/types/common';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const defaultAddresss: Address = {
  city: 'Shanghai',
  country: 'China',
  district: 'Pudong',
  isoCountryCode: 'CN',
  name: '33 East Nanjing Rd',
  postalCode: '94108',
  region: 'SH',
  street: 'Stockton St',
  streetNumber: '1',
  subregion: 'San Francisco County',
  timezone: 'America/Los_Angeles',
};

const getLocationWithTimeout = async (timeoutMs: number = 15000) => {
  try {
    //Create a promise that rejects after timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error());
      }, timeoutMs);
    });

    //Race between location request and timeout
    const location = await Promise.race([
      Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest }),
      timeoutPromise,
    ]);

    return {
      success: true,
      location: location as Location.LocationObject,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      location: null,
      error: error instanceof Error ? error.message : 'failed to get location',
    };
  }
};

export default function RootLayout() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [address, setAddress] = useState<Address | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [fontsLoaded] = useFonts(Fonts);

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      onLayoutRootView();
    }
    (async () => {
      setAddress(defaultAddresss);
      const status = await Location.requestForegroundPermissionsAsync();
      if (!status.granted) {
        setErrorMsg('Permission to access location is denied');
      }

      // Get location with 10 seconds timeout
      const result = await getLocationWithTimeout(10000);

      if (result.success && result.location) {
        console.log('user Location here', result.location);
        setLocation(result.location);
      } else {
        setErrorMsg(
          'Unable to get your location. Please check your GPS settings.',
        );
        // Optionally fall back to last known location or default location
        // TODO  if the error is due to user haven't given the location access, then display the grant location access again
        // ? claude suggested "Adding error boundary handling for unexpected location service failures" I'm not sure what that is
        //TODO Consider Showing a loading indicator while waiting for the location
        // TODO Consider Implementing a retry mechanism with exponential backoff
        //TODO Consider Caching the last known location as a fallback
        //TODO Consider Using a less accurate location first, then upgrading to high accuracy
        //TODO Consider Having a default location for your service area if location services fail
      }
    })();
  }, [fontsLoaded, onLayoutRootView]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserLocationContext.Provider
      value={{ location: location ?? undefined, setLocation }}
    >
      <UserReversedGeoCode.Provider value={{ address, setAddress }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </UserReversedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}
