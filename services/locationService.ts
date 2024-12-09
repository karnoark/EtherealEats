import * as Location from 'expo-location';

import { promiseWithTimeout } from '@/utils/promiseWithTimeout';

export interface LocationError {
  code: string;
  message: string;
}

export class LocationPermissionError extends Error {
  constructor(message = 'Location Permission Not Granted') {
    super(message);
    this.name = 'LocationPermissionError';
  }
}

export const LocationService = {
  async requestAndCheckPermission() {
    const status = await Location.requestForegroundPermissionsAsync();
    if (!status.granted) {
      throw new LocationPermissionError(
        'Permission to access location is denied',
      );
    }

    // check if location services are enabled
    const enabled = Location.hasServicesEnabledAsync();
    if (!enabled) {
      throw new Error(
        'Please enable location service in your device settings to continue',
      );
    }
  },

  async getCurrentLocation() {
    await this.requestAndCheckPermission();
    // Get location with 10 seconds timeout
    // const result = await getLocationWithTimeout(10000);
    const currentLocation = await promiseWithTimeout(
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      }),
      10000,
      'Unable to get your location. Please try again',
    );

    // Additional VAlidation of the response
    if (!currentLocation || !currentLocation.coords) {
      throw new Error('Unable to determine your location. Please try again.');
    }

    return currentLocation;
  },

  async reversedGeoCode(latitude: number, longitude: number) {
    const response = await Location.reverseGeocodeAsync({
      longitude,
      latitude,
    });

    if (!response || response.length === 0) {
      throw new Error('No address found for these coordinates');
    }

    return response;
  },

  async getAddress(location: Location.LocationObject) {
    // This might take 2 seconds
    //  Made the promise race safe
    const reversedAddress = await promiseWithTimeout(
      this.reversedGeoCode(location.coords.latitude, location.coords.longitude),
      10000,
      'Address lookup took too long. Please try again.',
    );

    return reversedAddress;
  },

  // Add a method to get cached location
  getCachedLocation(): Location.LocationObject | null {
    // TODO Implementation for cached location
    // TODO This could be integrated with AsyncStorage
    return null;
  },

  // Add a method for low accuracy location first
  async getLowAccuracyLocation() {
    return Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    });
  },
};
