import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  LatLng,
} from 'react-native-maps';

import PlaceMarker from '@/components/PlaceMarker';
import { COLORS, SIZES } from '@/constants/theme';
import { RestaurantCoordinates } from '@/constants/uidata';
import { useLocationContext } from '@/context/UserLocationContext';
import GoogleApiServices, { Coordinates } from '@/services/GoogleApiServices';

const GoogleMapView = ({ placeList }: { placeList: RestaurantCoordinates }) => {
  const [directions, setDirections] = useState([]);
  const [coordinates, setCoordinates] = useState<LatLng[] | null>(null);
  const { location, setLocation } = useLocationContext();
  const [mapRegion, setMapRegion] = useState({
    latitude: 16.8524,
    longitude: 74.5815,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      });
      nameThisFuncLater();
    }
  }, [location, coordinates]);

  const nameThisFuncLater = async () => {
    if (
      location?.coords.latitude &&
      location?.coords.longitude &&
      placeList.latitude &&
      placeList.longitude
    ) {
      const fetchDirectionsData = await GoogleApiServices.fetchDirections(
        location?.coords.latitude,
        location?.coords.longitude,
        placeList.latitude,
        placeList.longitude,
      );

      setDirections(fetchDirectionsData.directions);
      setCoordinates(fetchDirectionsData.coordinates);
      console.log('coordinates: ', coordinates);
      console.log('directions: ', directions);
    }
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}
      >
        <Marker title="My Location" coordinate={mapRegion} />
        <PlaceMarker coordinates={placeList} />
        <Polyline
          coordinates={coordinates ?? []}
          strokeColor={COLORS.primary}
          strokeWidth={5}
        />
      </MapView>
    </View>
  );
};

export default GoogleMapView;

const styles = StyleSheet.create({
  mapContainer: {
    marginVertical: 8,
    width: SIZES.width,
    height: SIZES.height / 2.6,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});
