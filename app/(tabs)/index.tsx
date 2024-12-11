import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CategoryList from '@/components/CategoryList';
import ChoicesList from '@/components/ChoicesList';
import Divider from '@/components/Divider';
import FastestNearYou from '@/components/FastestNearYou';
import Heading from '@/components/Heading';
import HomeHeader from '@/components/HomeHeader';
import NearbyRestaurants from '@/components/NearbyRestaurants';
import NewFoodList from '@/components/NewFoodList';
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

  const { bottom } = useSafeAreaInsets();
  const BASE_TAB_HEIGHT = Platform.select({
    ios: 49,
    android: 56,
  });
  // Calculate the bottom spacing dynamically
  const bottomSpacing = Math.max(
    bottom + (BASE_TAB_HEIGHT ?? 0),
    BASE_TAB_HEIGHT ?? 0,
  );

  useEffect(() => {
    console.log('selectedChoice', selectedChoice);
    console.log('selectedSection', selectedSection);
  }, [selectedChoice, selectedSection]);

  return (
    <View style={[{ paddingTop: top }, pages.viewOne]}>
      <View style={pages.viewTwo}>
        <HomeHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{}}
          contentContainerStyle={{ paddingBottom: bottomSpacing }}
        >
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

          <Divider />

          <Heading heading={'Nearby Restaurants'} onPress={() => {}} />

          <NewFoodList />

          <Divider />

          <Heading heading={'Fastest Near to You'} onPress={() => {}} />

          <FastestNearYou />
        </ScrollView>
      </View>
    </View>
  );
};

export default Page;
