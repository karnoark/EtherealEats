import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { UserLocationContext } from '@/context/UserLocationContext';
import { UserReversedGeoCode } from '@/context/UserReversedGeoCode';

const Page = () => {
  const { address, setAddress } = useContext(UserReversedGeoCode) ?? {};
  console.log('Home Page ---- user location here', address);
  const { location, setLocation } = useContext(UserLocationContext);
  console.log('Home Page ---- user location here', location);

  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <Text>Home Page</Text>
    </View>
  );
};

export default Page;
