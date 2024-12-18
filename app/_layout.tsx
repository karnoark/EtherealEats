/* eslint-disable react/no-unstable-nested-components */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import { Link, router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';

import 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';

import Fonts from '@/constants/fonts';
import { COLORS } from '@/constants/theme';
import { Restaurant } from '@/constants/uidata';
import { LoginProvider } from '@/context/LoginContext';
import { RestaurantProvider } from '@/context/RestaurantContext';
import {
  UserLocationContext,
  LocationProvider,
} from '@/context/UserLocationContext';
import {
  AddressProvider,
  UserReversedGeoCode,
} from '@/context/UserReversedGeoCode';
import {
  LocationPermissionError,
  LocationService,
} from '@/services/locationService';
import { promiseWithTimeout, TimeoutError } from '@/utils/promiseWithTimeout';

import { Ionicons } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const defaultAddresss: Location.LocationGeocodedAddress[] = [
  {
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
    formattedAddress: 'formattedAddress',
  },
];

export default function RootLayout() {
  const [location, setLocation] = useState<Location.LocationObject | null>();
  const [address, setAddress] = useState<
    Location.LocationGeocodedAddress[] | null
  >(null);
  const [restaurantObj, setRestaurantObj] = useState<Restaurant | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [login, setLogin] = useState(false);
  const MAX_RETRIES = 3;

  const [fontsLoaded] = useFonts(Fonts);

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Initialize location with retry mechanism
  const initializeLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      // First try to get a quick, low-accuracy location
      const quickLocation = await LocationService.getLowAccuracyLocation();
      setLocation(quickLocation);

      // Then get more precise location
      const preciseLocation = await LocationService.getCurrentLocation();
      setLocation(preciseLocation);

      // Get address for the precise location
      const locationAddress = await LocationService.getAddress(preciseLocation);
      setAddress(locationAddress);
    } catch (error) {
      console.error('Location initialization error:', error);

      if (error instanceof LocationPermissionError) {
        setLocationError(
          'Please enable location access in settings for delivery updates',
        );
      } else if (error instanceof TimeoutError) {
        // Implement exponential backoff for retries
        if (retryAttempt < MAX_RETRIES) {
          const retryDelay = Math.pow(2, retryAttempt) * 1000; // Exponential backoff
          setTimeout(() => {
            setRetryAttempt(prev => prev + 1);
            initializeLocation();
          }, retryDelay);
        } else {
          setLocationError(
            'Unable to get your location. Please try again later.',
          );
        }
      } else {
        setLocationError('Unable to determine your location');
      }
    } finally {
      setIsLoadingLocation(false);
    }
  }, [retryAttempt]);

  useEffect(() => {
    if (fontsLoaded) {
      onLayoutRootView();
      initializeLocation();
      loginStatus();
    }
  }, [fontsLoaded, onLayoutRootView, initializeLocation]);

  if (!fontsLoaded) {
    return null;
  }

  const loginStatus = async () => {
    const userToken = await AsyncStorage.getItem('token');
    if (userToken !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <LocationProvider
      value={{
        location: location ?? null,
        setLocation,
        isLoading: isLoadingLocation,
        error: locationError,
        retry: initializeLocation,
      }}
    >
      <AddressProvider value={{ address, setAddress }}>
        <RestaurantProvider value={{ restaurantObj, setRestaurantObj }}>
          <LoginProvider value={{ login, setLogin }}>
            <StatusBar
              style="dark"
              hidden={false}
              backgroundColor={COLORS.lightWhite}
            />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="Food/food" options={{ headerShown: false }} />
              <Stack.Screen
                name="Food/order"
                options={{
                  headerShown: false,
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="RestaurantPage"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="restaurant"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AddRating"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="+not-found" />
              <Stack.Screen
                name="(authentication)/login"
                options={{
                  title: '',
                  headerBackTitle: '',
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: COLORS.lightWhite,
                  },
                  headerLeft: () => (
                    <TouchableOpacity onPress={router.back}>
                      <Ionicons
                        name="arrow-back"
                        size={34}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                  ),
                  headerRight: () => (
                    <Link href={'/help'} asChild>
                      <TouchableOpacity>
                        <Ionicons
                          name="help-circle-outline"
                          size={34}
                          color={COLORS.primary}
                        />
                      </TouchableOpacity>
                    </Link>
                  ),
                }}
              />

              <Stack.Screen
                name="(authentication)/signup"
                options={{
                  title: '',
                  headerBackTitle: '',
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: COLORS.lightWhite,
                  },
                  headerLeft: () => (
                    <TouchableOpacity onPress={router.back}>
                      <Ionicons
                        name="arrow-back"
                        size={34}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                  ),
                }}
              />
            </Stack>
          </LoginProvider>
        </RestaurantProvider>
      </AddressProvider>
    </LocationProvider>
  );
}
