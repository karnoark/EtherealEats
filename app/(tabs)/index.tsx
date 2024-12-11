import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CategoryList from '@/components/CategoryList';
import ChoicesList from '@/components/ChoicesList';
import Heading from '@/components/Heading';
import HomeHeader from '@/components/HomeHeader';
import NearbyRestaurants from '@/components/NearbyRestaurants';
import { useLocationContext } from '@/context/UserLocationContext';
import { UserReversedGeoCode } from '@/context/UserReversedGeoCode';
import pages from '@/styles/page.style';

//? Should I use SafeAreaView?

const Page = () => {
  const { top } = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  useEffect(() => {
    console.log('selectedChoice', selectedChoice);
    console.log('selectedSection', selectedSection);
  }, [selectedChoice, selectedSection]);
  return (
    <View style={[{ paddingTop: top }, pages.viewOne]}>
      <View style={pages.viewTwo}>
        <HomeHeader />

        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <CategoryList
            setSelectedCategory={setSelectedCategory}
            setSelectedSection={setSelectedSection}
            setSelectedValue={setSelectedValue}
          />
          <ChoicesList
            setSelectedChoice={setSelectedChoice}
            setSelectedSection={setSelectedSection}
          />

          <Heading heading={'Nearby Restaurants'} onPress={() => {}} />

          <NearbyRestaurants />
        </ScrollView>
      </View>
    </View>
  );
};

export default Page;
