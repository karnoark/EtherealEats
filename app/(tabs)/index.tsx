import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeHeader from '@/components/HomeHeader';
import { useLocationContext } from '@/context/UserLocationContext';
import { UserReversedGeoCode } from '@/context/UserReversedGeoCode';
import pages from '@/styles/page.style';

//? Should I use SafeAreaView?

const Page = () => {
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
