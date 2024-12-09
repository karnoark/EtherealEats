import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeHeader from '@/components/HomeHeader';
import { UserLocationContext } from '@/context/UserLocationContext';
import { UserReversedGeoCode } from '@/context/UserReversedGeoCode';
import useLocationContext from '@/hooks/useLocationContext';
import useReversedGeoCodeContext from '@/hooks/useReversedGeoCodeContext';
import pages from '@/styles/page.style';
//? Should I use SafeAreaView?

const Page = () => {
  // const { address, setAddress } = useContext(UserReversedGeoCode) ?? {};
  const { address, setAddress } = useReversedGeoCodeContext();
  console.log('Home Page ---- address', address);
  const { location, setLocation } = useLocationContext();
  // const { location, setLocation } = useContext(UserLocationContext);
  console.log('Home Page ---- user location here', location);

  const { top } = useSafeAreaInsets();
  return (
    <View style={[{ paddingTop: top }, pages.viewOne]}>
      <View style={pages.viewTwo}>
        <HomeHeader />
      </View>
    </View>
  );
};

export default Page;
