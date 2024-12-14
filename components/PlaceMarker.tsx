import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';

import { RestaurantCoordinates } from '@/constants/uidata';

const PlaceMarker = ({
  coordinates,
}: {
  coordinates: RestaurantCoordinates;
}) => {
  return (
    <Marker
      title={coordinates.title}
      coordinate={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }}
    />
  );
};

export default PlaceMarker;

const styles = StyleSheet.create({});
